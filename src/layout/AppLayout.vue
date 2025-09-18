<template>
  <div class="min-h-screen flex flex-col bg-overlay">

    <main
        class="flex-1 flex flex-col lg:flex-row justify-center items-center gap-4 px-2 md:px-8 py-8 md:py-16 max-w-[1366px] mx-auto w-full">
      <BannerSection/>
      <slot/>
    </main>
    <Footer/>
  </div>
</template>
<script setup lang="ts">
import BannerSection from "@/components/BannerSection.vue";
import Footer from "@/components/Footer.vue";
</script>