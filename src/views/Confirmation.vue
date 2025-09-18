<template>
  <AppLayout>
    <Card class="max-w-md w-full">
      <p class="text-2xl font-bold text-blue-900 mb-4 text-center">
        Agendamento confirmado com sucesso!
      </p>

      <div class="my-4 w-full flex flex-col items-center">
        <span class="text-gray-700 text-sm">Protocolo do agendamento:</span>
        <span class="text-2xl font-bold text-blue-900 tracking-widest">{{ contactStore.contact.reference }}</span>
      </div>

      <div class="w-full bg-gray-50 rounded-xl p-4 mb-4 shadow">
        <p class="text-gray-700 mb-2"><strong>Nome:</strong> {{ contactStore.contact.name }}</p>
        <p class="text-gray-700 mb-2"><strong>Dia agendado:</strong> {{ contactStore.contact.date }}</p>
        <p class="text-gray-700 mb-2"><strong>Horário:</strong> {{ contactStore.contact.time }}</p>
        <p class="text-gray-700 mb-2"><strong>Unidade:</strong> {{ contactStore.contact.school }}</p>
        <p class="text-gray-700 mb-2"><strong>Endereço:</strong> {{ contactStore.contact.schoolAddress }}</p>
      </div>

      <p class="text-center text-gray-700 mb-6">
        Para finalizar sua matrícula, compareça no dia agendado portando
        <strong>RG, CPF e comprovante de residência</strong>. Menores de idade devem estar acompanhados pelo responsável legal.
      </p>

      <a href="http://liceubrasil.com.br/whatsapp" target="_blank" class="w-full text-center text-white font-bold py-3 rounded-lg transition mt-2 text-lg shadow disabled:opacity-50 bg-green-600 hover:bg-green-700">
        Entrar no Grupo do WhatsApp
      </a>

      <div class="w-full flex flex-col items-center mt-6">
        <Badge class="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-1 rounded-full mb-2 text-center">
          Chegue com 15 minutos de antecedência no dia do atendimento.
        </Badge>
        <span class="text-gray-500 text-xs text-center">
          Seus dados estão protegidos. Nossa equipe está à disposição para ajudar.
        </span>
      </div>
    </card>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "@/layout/AppLayout.vue";
import Button from "@/components/ui/Button.vue";
import Badge from "@/components/ui/Badge.vue";
import Card from "@/components/ui/Card.vue";
import {useContactStore} from '@/stores/contactStore';
import {useRoute} from "vue-router";

const route = useRoute();

const contactStore = useContactStore(route.params.id);


</script>
