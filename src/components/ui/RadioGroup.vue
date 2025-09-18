<template>
  <div class="flex flex-wrap gap-2">
    <label v-for="option in options" :key="option" class="flex items-center cursor-pointer">
      <input
          type="radio"
          :name="name"
          :value="option"
          v-model="internalValue"
          required
          class="hidden peer"
      />
      <span class="px-4 py-2 border border-gray-300 rounded-full text-gray-700 peer-checked:bg-blue-700 peer-checked:text-white transition">
        {{ option }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string;
  modelValue: string;
  options: string[];
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const internalValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>
