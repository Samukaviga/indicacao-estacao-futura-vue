<template>
  <form class="flex flex-col gap-3 w-full" @submit.prevent="handleSubmit">
    <span class="text-gray-700 font-medium mt-0.5">Dados do Aluno</span>

    <Input
        v-model="registerForm.student_name"
        placeholder="Nome do Aluno"
        required
        aria-label="Nome do Aluno"
        :error="errors.student_name"
    />

     <Input
        v-model="registerForm.responsible_name"
        placeholder="Nome do Responsavel"
        required
        aria-label="Nome do Responsavel"
        :error="errors.responsible_name"
    />

    

    <span class="text-gray-700 font-medium mt-0.5">Dados do aluno indicado</span>

    <Input
        required
        name="indicated_student_name"
        v-model="registerForm.indicated_student_name"
        placeholder="Nome do aluno Indicado"
        :error="errors.indicated_student_name"
    />

      <Input
        required
        name="indicated_responsible_name"
        v-model="registerForm.indicated_responsible_name"
        placeholder="Responsavel do aluno Indicado"
        :error="errors.indicated_responsible_name"
    />

    <Input
        v-model="registerForm.indicated_mobile_phone"
        type="tel"
        placeholder="WhatsApp / Celular do Aluno Indicado"
        required
        v-mask="'(##) #####-####'"
        aria-label="WhatsApp"
        :error="errors.indicated_mobile_phone"
    />
  
  
     <div class="flex items-start gap-2 text-sm">
      <input id="aceito-termos" type="checkbox" required class="mt-1 accent-blue-800"/>
      <label for="aceito-termos" class="select-none">
        Li e aceito os Termos do Regulamento.
      </label>
    </div>

    <Button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Salvando...' : 'Confirmar' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Select from '@/components/ui/Select.vue'
import { useContactStore } from '@/stores/contactStore'
import AutoComplete from "@/components/AutoComplete.vue";
import { useUtmAttribution } from '@/composables/useUtmAttribution'

const { captureFromUrl, getFirst, getLast, toLeadSource } = useUtmAttribution()

onMounted(() => {
  captureFromUrl()
})

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


type RegisterForm = {
  responsible_name: string
  student_name: string
  indicated_student_name: string
  indicated_responsible_name: string
  indicated_mobile_phone: string
  indicated_email: string
  indicated_date_of_birth: string
  indicated_education_level: string
  lead_source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
  msclkid?: string
  referrer?: string
  landing_page?: string
}

const last = getLast() || {}
const first = getFirst() || {}
const lead = toLeadSource(last) || toLeadSource(first) || 'direct'

const registerForm = reactive<RegisterForm>({
  responsible_name: '',
  student_name: '',
  indicated_responsible_name: '',
  indicated_student_name: '',
  indicated_mobile_phone: '',
  indicated_email: '',
  indicated_date_of_birth: '',
  indicated_education_level: '',
  lead_source: lead,
  utm_source: last.utm_source ?? first.utm_source,
  utm_medium: last.utm_medium ?? first.utm_medium,
  utm_campaign: last.utm_campaign ?? first.utm_campaign,
  utm_term: last.utm_term ?? first.utm_term,
  utm_content: last.utm_content ?? first.utm_content,
  gclid: last.gclid ?? first.gclid,
  fbclid: last.fbclid ?? first.fbclid,
  msclkid: last.msclkid ?? first.msclkid,
  referrer: last.referrer ?? first.referrer,
  landing_page: last.landing_page ?? first.landing_page,
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

const router = useRouter()
const API_TOKEN = import.meta.env.VITE_API_TOKEN
const API_URL = import.meta.env.VITE_API_URL

/**
 * Submit
 */
async function handleSubmit() {
  try {
    isSubmitting.value = true

    const response = await axios.post(`${API_URL}/api/registrations/`, registerForm)

    const contactStore = useContactStore(response.data.data.id)
    contactStore.setContact(response.data.data)

    router.push(`/sucesso/${response.data.data.id}`)
  } catch (error: any) {
    isSubmitting.value = false
    alert('Oops! Encontramos um erro inesperado. Por favor, tente novamente.')

    if (error.response && error.response.status === 422) {
      errors.value = Object.fromEntries(
          Object.entries(error.response.data.errors).map(
              ([key, messages]: [string, string[]]) => [key, messages[0]]
          )
      )
    }
  }
}
</script>
