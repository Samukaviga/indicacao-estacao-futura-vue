<template>
  <AppLayout>
    <Card class="max-w-md w-full">
      <p class="text-2xl font-bold text-blue-900 mb-4 text-center">
        Parabéns, {{ contact.name }}! Chegou a hora de agendar seu atendimento e garantir sua vaga.
      </p>

      <h2 class="text-md md:text-md font-semibold text-blue-900 mb-6 text-center">
        Escolha o melhor dia e horário para você
      </h2>

      <FormSchedule :groupedSlots="groupedSlots"/>
      <div class="w-full flex flex-col items-center mt-6">
        <Badge class="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-1 rounded-full mb-2 text-center">
          Garanta seu horário! As vagas são limitadas por dia.
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
import Badge from "@/components/ui/Badge.vue";
import Card from "@/components/ui/Card.vue";
import FormSchedule from "@/components/FormSchedule.vue";
import { useContactStore } from '@/stores/contactStore';

import {onMounted, ref} from "vue";


import axios from "axios";
import {useRoute, useRouter}  from "vue-router";

const route = useRoute();
const router = useRouter();
const contactId = route.params.id as string;

const contact = ref<{ [key: string]: any[] }>({});

const groupedSlots = ref<{ [key: string]: any[] }>({});
const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;


async function fetchSchedule() {
  try {
    const response = await axios.get(`${API_URL}/api/contacts/schedules/${contactId}`, {
      headers: {Authorization: `Bearer ${API_TOKEN}`},
    });

    const contactStore = useContactStore(response.data.contact.id);
    contactStore.setContact(response.data.contact);

    groupedSlots.value = response.data.schedules;
    contact.value = response.data.contact;

  } catch (error) {
    const code = Number(error?.response?.data?.code);
    const message = error?.response?.data?.error;

    console.log(code)

    if ([22, 20, 21].includes(code)) {
      router.push({ name: 'ScheduleUnavailable', query: { message } });
    } else if (24 == code) {
      router.push(`/agendado/${contactId}`);
    } else {
      router.push({ name: '404' });
    }

  }
}

onMounted(fetchSchedule);

</script>
