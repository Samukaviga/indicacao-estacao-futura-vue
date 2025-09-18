<template>
  <AppLayout>
    <Card class="max-w-md w-full">
      <h1 class="text-2xl font-bold text-red-600 mb-4 text-center">Agendamento Indisponível</h1>

      <p class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        No momento não foi possível concluir o agendamento.
      </p>

      <p class="text-gray-600 text-center mb-3">
        {{message }}
      </p>

      <a href="https://wa.me/5511953255890" target="_blank" class="w-full text-center text-white font-bold py-3 rounded-lg transition mt-2 text-lg shadow disabled:opacity-50 bg-green-600 hover:bg-green-700">
        Enviar mensagem
      </a>

      <div class="w-full flex flex-col items-center mt-6">
        <span class="text-gray-500 text-xs text-center">
          Se o problema persistir, entre em contato com nossa equipe pelo WhatsApp.
        </span>
      </div>
    </Card>
  </AppLayout>
</template>


<script setup lang="ts">
import AppLayout from "@/layout/AppLayout.vue";
import Card from "@/components/ui/Card.vue";

defineProps(['message'])

</script>
