<template>
  <form class="flex flex-col gap-3 w-full" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-gray-700 font-medium mb-1">Selecione o dia:</label>
      <Select
          v-model="scheduleForm.date"
          :options="dateOptions"
      />
    </div>
    <div v-if="selectedTimeOptions.length">
      <label class="block text-gray-700 font-medium mb-2">Escolha o horário:</label>
      <RadioGroup v-model="scheduleForm.time" name="horario" :options="selectedTimeOptions"/>
    </div>

    <Button type="submit" :disabled="!scheduleForm.date || !scheduleForm.time || isSubmitting">
      <span v-if="!isSubmitting">Confirmar Agendamento</span>
      <span v-else>Enviando...</span>
    </Button>
  </form>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import RadioGroup from "@/components/ui/RadioGroup.vue";
import Select from "@/components/ui/Select.vue";
import {computed, reactive, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import axios from "axios";
import type {ScheduleForm} from "@/types/ScheduleForm";
import {useContactStore} from '@/stores/contactStore';

const props = defineProps<{
  groupedSlots: Record<string, Slot[]>;
}>();

const router = useRouter();
const route = useRoute();

const scheduleForm = reactive<ScheduleForm>({
  name: "",
  date: "",
  time: "",
});

const selectedSlots = computed(() => props.groupedSlots[scheduleForm.date] ?? []);
const isSubmitting = ref(false);


const selectedTimeOptions = computed(() => {
  return selectedSlots.value.map(slot => (slot.start_time));
});

const dateOptions = computed(() => {
  return Object.keys(props.groupedSlots);
});

async function handleSubmit() {
  try {

    isSubmitting.value = true;

    const API_URL = import.meta.env.VITE_API_URL;
    const API_TOKEN = import.meta.env.VITE_API_TOKEN;
    const contactId = route.params.id;

    if (!contactId) {
      alert("ID do contato não encontrado.");
      return;
    }

    const payload = {
      contact_id: contactId,
      date: scheduleForm.date,
      time: scheduleForm.time,
    };

    const contactStore = useContactStore(contactId);
    contactStore.setContact(payload);

    const response = await axios.post(`${API_URL}/api/contacts/schedules/${contactId}`, payload, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    contactStore.setContact(response.data.contact);

    router.push(`/confirmacao/${contactId}`);
  } catch (error: any) {
    console.error("Erro ao agendar:", error);
    alert("Houve um erro ao confirmar o agendamento. Tente novamente.");
  } finally {
    isSubmitting.value = false;
  }
}
</script>
