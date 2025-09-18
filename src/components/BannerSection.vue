<template>
  <section class="w-full lg:w-1/2 flex flex-col items-center justify-center">
    <div class="w-full flex justify-center mb-1 pt-8">
      <img :src="logoBolsas" alt="Bolsas de Estudo Colégio Itaquá"
           class="max-w-xs md:max-w-sm lg:max-w-md w-full mb-1 drop-shadow-lg select-none pointer-events-none"
           draggable="false" />
    </div>
    <div class="w-full flex justify-center mb-1 pb-2">
      <img :src="logo" alt="Colégio Itaquá" class=" h-15 lg:h-18" fetchpriority="high" />
    </div>
  </section>
</template>

<script setup>
import logo from '@/assets/images/logo.webp'
import logoBolsas from '@/assets/images/roleta-2.webp'
</script>
