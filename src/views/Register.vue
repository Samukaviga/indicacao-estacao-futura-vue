<template>
  <AppLayout>
    <Card class="max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-3 text-center">Indique um amigo!</h2>
      <p class="text-sm text-gray-600 text-center mb-6">
        Preencha todos os campos abaixo para <br/>
        concorrer a um <span class="font-bold text-[#d87812]">Desconto de até 100%, Alexa, Tablet e um Kit uniforme</span>.
      </p>

      <FormRegister/>

    </Card>
  </AppLayout>
</template>

<script setup>
import FormRegister from '@/components/FormRegister.vue';
import AppLayout from "@/layout/AppLayout.vue";
import Card from "@/components/ui/Card.vue";
</script>