<template>
  <div class="relative">
    <select
        :required="required"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        class="w-full appearance-none px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition pr-10"
    >
      <option disabled value="">{{ placeholder }}</option>

      <template v-if="hasGroups">
        <optgroup
            v-for="group in options"
            :key="group.label"
            :label="group.label"
        >
          <option
              v-for="option in group.options"
              :key="option.value"
              :value="option.value"
          >
            {{ option.label }}
          </option>
        </optgroup>
      </template>

      <template v-else>
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </template>
    </select>

    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

import { computed } from 'vue';

const props = defineProps({
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Selecione...' },
  modelValue: String,
  options: {
    type: [Array, Object],
    default: () => []
  }
});

defineEmits(['update:modelValue']);

const hasGroups = computed(() => {
  return Array.isArray(props.options) &&
      props.options.length > 0 &&
      props.options[0].options !== undefined;
});
</script>
