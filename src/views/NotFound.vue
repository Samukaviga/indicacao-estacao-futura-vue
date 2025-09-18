<template>
  <AppLayout>
    <Card class="max-w-md w-full">
      <h1 class="text-5xl font-bold text-red-600 mb-4 text-center">404</h1>

      <p class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Página não encontrada
      </p>

      <p class="text-gray-600 text-center mb-6">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>

      <router-link
          to="/"
          class="w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-900 text-white font-bold py-3 rounded-lg text-lg shadow transition text-center"
      >
        Voltar para o Início
      </router-link>

      <div class="w-full flex flex-col items-center mt-6">
        <span class="text-gray-500 text-xs text-center">
          Se o problema persistir, entre em contato com nossa equipe de suporte.
        </span>
      </div>
    </card>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "@/layout/AppLayout.vue";
import Card from "@/components/ui/Card.vue";
</script>
