<template>
  <form class="flex flex-col gap-3 w-full" @submit.prevent="handleSubmit">

    <span class="text-gray-700 font-medium mb-1 mt-0.5">Endereço residencial:</span>
    <div class="flex flex-col gap-0 w-full">



      <div class="flex flex-col sm:flex-row sm:gap-2 md:mb-4 w-full">
        <Input v-model="completeForm.indicated_date_of_birth" type="tel"
          placeholder="Data de nascimento do Aluno indicado" v-mask="'##/##/####'" aria-label="Data de nascimento"
          :error="errors.indicated_date_of_birth" />

        <Select v-model="completeForm.indicated_education_level" placeholder="Série Atual"
          :options="availableGroupedOptions()" :error="errors.indicated_education_level" />
      </div>


    </div>

    <Button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Salvando...' : 'Concluir Cadastro' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useContactStore } from "@/stores/contactStore";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import type { CompleteForm } from "@/types/CompleteForm";

const route = useRoute();
const router = useRouter();

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

const contactId = route.params.id as string;

const contactStore = useContactStore(route.params.id);

const completeForm = reactive<CompleteForm>({
  indicated_date_of_birth: '',
  indicated_education_level: '',
});

onMounted(() => {


  console.log(contactId)

  if (!contactStore.contact || contactStore.contact.id !== contactId) {
    console.warn("Contato não encontrado no store, redirecionando para /404...");
    router.push("/404");
  }
});


/**
 * Dados e opções (apenas o que é usado)
 */
const escolaridadeObrigatoria = [
  {
    etapa: 'Educação Infantil',
    series: [
      { serie: 'Menor de 1 ano', idade: 1, obrigatoria: false },
      { serie: 'Pré-Escola - 2 anos', idade: 2, obrigatoria: false },
      { serie: 'Pré-Escola - 3 anos', idade: 3, obrigatoria: false },
      { serie: 'Pré-Escola - 4 anos', idade: 4, obrigatoria: true },
      { serie: 'Pré-Escola - 5 anos', idade: 5, obrigatoria: true },
    ]
  },
  {
    etapa: 'Ensino Fundamental',
    series: [
      { serie: '1º ano', idade: 6, obrigatoria: true },
      { serie: '2º ano', idade: 7, obrigatoria: true },
      { serie: '3º ano', idade: 8, obrigatoria: true },
      { serie: '4º ano', idade: 9, obrigatoria: true },
      { serie: '5º ano', idade: 10, obrigatoria: true },
      { serie: '6º ano', idade: 11, obrigatoria: true },
      { serie: '7º ano', idade: 12, obrigatoria: true },
      { serie: '8º ano', idade: 13, obrigatoria: true },
      { serie: '9º ano', idade: 14, obrigatoria: true }
    ]
  },
  {
    etapa: 'Ensino Médio',
    series: [
      { serie: '1ª série', idade: 15, obrigatoria: true },
      { serie: '2ª série', idade: 16, obrigatoria: true },
      { serie: '3ª série', idade: 17, obrigatoria: true }
    ]
  }
]

function availableGroupedOptions() {
  return escolaridadeObrigatoria.map(grupo => ({
    label: grupo.etapa,
    options: grupo.series.map(serie => ({
      label: `${serie.serie}`,
      value: serie.serie
    }))
  }))
}

const isReadOnly = ref(false);
const isSubmitting = ref(false);

const errors = ref({})


async function handleSubmit() {
  try {
    const payload = {
      ...completeForm,
      contact_id: contactId,
    };
    isSubmitting.value = true

    const response = await axios.patch(`${API_URL}/api/registrations/${contactId}`, payload, {
      // headers: {
      //   Authorization: `Bearer ${API_TOKEN}`,
      // },
    });

    console.log(response)

    contactStore.setContact({
      id: response.data.id,
      name: response.data.name,
      protocol: response.data.reference,
    });

    router.push(`/sucesso/${contactId}`);
  } catch (error) {
    isSubmitting.value = false
    if (error.response && error.response.status === 422) {
      errors.value = Object.fromEntries(
        Object.entries(error.response.data.errors).map(([key, messages]) => [key, messages[0]])
      )
    }
  }
}
</script>
