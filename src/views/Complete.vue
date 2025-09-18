<script setup lang="ts">
import AppLayout from "@/layout/AppLayout.vue";
import Badge from "@/components/ui/Badge.vue";
import FormComplete from "@/components/FormComplete.vue";
import Card from "@/components/ui/Card.vue";
</script>

<template>
  <AppLayout>
    <Card class="max-w-md w-full">
      <h2 class="text-3xl font-bold text-blue-900 mb-5 text-center">
        Seu cadastro está quase completo!
      </h2>
      <p class="text-blue-900 text-gray-700 text-base text-center mb-5">
        Preencha os dados abaixo para finalizar sua inscrição.
      </p>
      <FormComplete/>
      <div class="w-full flex flex-col items-center mt-6">
        <Badge bgClass="bg-yellow-100" textClass="text-yellow-800">
          Só mais um passo para concluir sua inscrição!
        </Badge>
        <span class="text-gray-500 text-xs text-center mt-2">
          Seus dados estão protegidos. <br/> Em caso de dúvida, nossa equipe está pronta para ajudar.
        </span>
      </div>
    </card>
  </AppLayout>
</template>
