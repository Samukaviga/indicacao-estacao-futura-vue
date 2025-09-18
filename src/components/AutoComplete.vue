<template>
  <div class="relative w-full">
    <Input
        type="text"
        v-model="searchTerm"
        @input="onInput"
        :placeholder="placeholder"
    />

    <ul
        v-if="showList && results.length"
        class="absolute z-50 bg-white border w-full mt-1 rounded shadow"
    >
      <li
          v-for="item in results"
          :key="item.value"
          @click="selectItem(item)"
          class="px-3 py-2 hover:bg-blue-100 cursor-pointer"
      >
        {{ item.label }}
        <span class="text-gray-500 text-xs">
          ({{ item.extra.city }}/{{ item.extra.state }})
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import Input from "./ui/Input.vue"

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()
const emit = defineEmits(['update:modelValue'])

const searchTerm = ref(props.modelValue || '')
const results = ref<any[]>([])
const showList = ref(false)

let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const API_URL = import.meta.env.VITE_API_URL

function onInput() {
  emit('update:modelValue', searchTerm.value)
  onSearch()
}

async function onSearch() {
  if (debounceTimeout) clearTimeout(debounceTimeout)

  debounceTimeout = setTimeout(async () => {
    const q = (searchTerm.value || '').trim()

    if (q.length < 2) {
      results.value = []
      showList.value = false
      return
    }

    try {
      const { data } = await axios.get(`${API_URL}/api/schools`, {
        params: { q, limit: 10, format: 'select' },
      })

      results.value = Array.isArray(data?.data) ? data.data : []
      showList.value = results.value.length > 0
    } catch (err: any) {
      console.error('Autocomplete error:', err?.response?.status, err?.response?.data || err?.message)
      results.value = []
      showList.value = false
    }
  }, 150)
}

function selectItem(item: any) {
  searchTerm.value = item.label
  emit('update:modelValue', item.label)
  showList.value = false
}
</script>
