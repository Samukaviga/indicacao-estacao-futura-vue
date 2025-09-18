<template>
  <div class="w-full">
    <input
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        :class="[
        'w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none transition',
        error ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-300'
      ]"
    />

    <p v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

<script setup>

defineOptions({ inheritAttrs: false });

defineProps({
  type: { type: String, default: 'text' },
  placeholder: String,
  required: { type: Boolean, default: false },
  modelValue: String,
  error: { type: String, default: '' }
});

defineEmits(['update:modelValue']);
</script>
