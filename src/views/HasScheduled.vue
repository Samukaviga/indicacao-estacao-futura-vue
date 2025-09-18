<template>
  <AppLayout>
    <Card class="max-w-md w-full">
      <p class="text-2xl font-bold text-yellow-700 mb-4 text-center">
        {{ contact?.first_name }}, você já possui um horário agendado!
      </p>

      <div class="my-4 w-full flex flex-col items-center">
        <span class="text-gray-700 text-sm">Protocolo do agendamento:</span>
        <span class="text-2xl font-bold text-yellow-700 tracking-widest">{{ contact?.reference }}</span>
      </div>

      <div class="w-full bg-gray-50 rounded-xl p-4 mb-4 shadow">
        <p class="text-gray-700 mb-2"><strong>Nome:</strong> {{ contact?.name }}</p>
        <p class="text-gray-700 mb-2"><strong>Dia agendado:</strong> {{ contact?.date }}</p>
        <p class="text-gray-700 mb-2"><strong>Horário:</strong> {{ contact?.time }}</p>
        <p class="text-gray-700 mb-2"><strong>Unidade:</strong> {{ contact?.school }}</p>
        <p class="text-gray-700 mb-2"><strong>Endereço:</strong> {{ contact?.schoolAddress ?? 'Não informado' }}</p>
      </div>

      <p class="text-center text-gray-700 mb-6">
        Já encontramos um agendamento ativo para você. Se precisar alterar ou tiver dúvidas,
        <strong>entre em contato com nossa equipe</strong> pelo WhatsApp ou telefone.
      </p>

      <Button as="a" href="#" class="bg-green-600 hover:bg-green-700">
        Falar no WhatsApp
      </Button>

      <div class="w-full flex flex-col items-center mt-6">
        <Badge class="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-1 rounded-full mb-2 text-center">
          Leve RG, CPF e comprovante de residência no dia agendado. Menores de idade devem estar acompanhados pelo responsável legal.
        </Badge>
        <span class="text-gray-500 text-xs text-center">
          Nossa equipe está à disposição para ajudar em qualquer dúvida.
        </span>
      </div>
    </Card>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "@/layout/AppLayout.vue";
import Button from "@/components/ui/Button.vue";
import Badge from "@/components/ui/Badge.vue";
import Card from "@/components/ui/Card.vue";
import { useContactStore } from '@/stores/contactStore';
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, ref } from 'vue'

const route = useRoute();
const contactStore = useContactStore(route.params.id);

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

onMounted(() => {
  getHasSchedule();
})

const contact = ref<Record<string, any> | null>(null);

async function getHasSchedule() {
  try {
    const response = await axios.get(`${API_URL}/api/contacts/schedules/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    contact.value = response.data.contact;
  } catch (error) {
    contact.value = error.response.data.contact
    console.log(contact.value.name)
    console.error(error.response.data.contact);
  }
}

</script>
