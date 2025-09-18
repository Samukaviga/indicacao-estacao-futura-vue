<template>
  <button
      :type="type"
      :disabled="disabled"
      class="w-full bg-[#FF6F00] hover:bg-[#FF6300] text-white font-bold py-3 rounded-lg transition mt-2 text-lg shadow disabled:opacity-50"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
});
</script>
