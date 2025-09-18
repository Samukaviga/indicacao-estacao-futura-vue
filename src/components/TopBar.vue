<template>
  <div class="w-full bg-yellow-400 text-yellow-900 font-semibold flex items-center justify-center py-3 text-sm shadow z-30">
    <div class="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-x-6 gap-y-2 w-full max-w-3xl px-4 text-center md:text-left">
      <div class="flex items-center gap-2 min-w-[150px] justify-center md:justify-start w-full md:w-auto">
        <span ref="percentFilledEl" class="text-xs font-medium text-blue-900 whitespace-nowrap">0% das bolsas já preenchidas</span>
        <div class="w-28 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div ref="progressBarEl" class="bg-blue-700 h-3 rounded-full transition-all duration-700" style="width: 0%"></div>
        </div>
        <span ref="percentLeftEl" class="text-xs text-gray-700 whitespace-nowrap">0% restantes</span>
      </div>
      <div class="flex items-center gap-1 text-xs text-red-700 font-semibold whitespace-nowrap justify-center md:justify-start w-full md:w-auto">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
        Faltam<span ref="countdownEl" class="font-bold">--:--:--</span> para encerrar inscrições!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const percentFilledEl = ref<HTMLSpanElement | null>(null);
const percentLeftEl = ref<HTMLSpanElement | null>(null);
const progressBarEl = ref<HTMLDivElement | null>(null);
const countdownEl = ref<HTMLSpanElement | null>(null);

const inscricoes = {
  inicio: new Date("2025-07-14T00:00:00"),
  fim: new Date("2025-08-18T23:59:59"),
  totalBolsas: 100,
  bolsasIniciais: 0,
  preencherDinamico: true
};

function atualizarUrgencia() {
  const agora = new Date();
  const { inicio, fim, totalBolsas, bolsasIniciais, preencherDinamico } = inscricoes;
  let preenchidas = 0, percent = 0;

  if (agora < inicio) preenchidas = bolsasIniciais;
  else if (agora >= fim) preenchidas = totalBolsas;
  else if (preencherDinamico) {
    const totalTempo = fim.getTime() - inicio.getTime();
    const tempoPassado = agora.getTime() - inicio.getTime();
    preenchidas = Math.floor(bolsasIniciais + (totalBolsas - bolsasIniciais) * (tempoPassado / totalTempo));
    if (preenchidas > totalBolsas) preenchidas = totalBolsas;
  } else preenchidas = bolsasIniciais;

  percent = Math.round((preenchidas / totalBolsas) * 100);

  if (percentFilledEl.value) percentFilledEl.value.textContent = `${percent}% das bolsas já preenchidas`;
  if (percentLeftEl.value) percentLeftEl.value.textContent = `${100 - percent}% restantes`;
  if (progressBarEl.value) progressBarEl.value.style.width = `${percent}%`;

  let diff = fim.getTime() - agora.getTime();
  if (diff < 0) diff = 0;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const min = Math.floor(diff / (1000 * 60)) % 60;
  const seg = Math.floor(diff / 1000) % 60;

  const countdownText = dias > 0
      ? `${dias} dias e ${String(horas).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`
      : `${String(horas).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;

  if (countdownEl.value) countdownEl.value.textContent = countdownText;

  if (percent >= 100 && progressBarEl.value) {
    progressBarEl.value.classList.remove("bg-blue-700");
    progressBarEl.value.classList.add("bg-green-600");
  }
}

onMounted(() => {
  atualizarUrgencia();
  setInterval(atualizarUrgencia, 1000);
});
</script>
