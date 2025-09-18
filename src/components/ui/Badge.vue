<template>
  <span
      :class="[
      'text-sm font-semibold px-3 py-1 rounded-full shadow-sm',
      bgClass,
      textClass,
    ]"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({
  bgClass: { type: String, default: 'bg-green-100' },
  textClass: { type: String, default: 'text-green-800' },
});
</script>
