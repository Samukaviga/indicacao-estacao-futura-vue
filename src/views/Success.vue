<template>
  <AppLayout>
    <Card class="max-w-md w-full">
      <p class="text-2xl font-bold text-blue-900 mb-3 text-center">
        {{ contactStore.contact?.responsible_name }}, sua indicação foi enviada com sucesso!
      </p>

      <div class="w-full bg-gray-50 rounded-xl p-4 mb-4 shadow">
        <p class="text-gray-700 mb-2"><strong>Aluno:</strong> {{ contactStore.contact.student_name }}</p>
        <p class="text-gray-700 mb-2"><strong>Responsavel:</strong> {{ contactStore.contact?.responsible_name }}</p>
        <p class="text-gray-700 mb-2"><strong>Aluno indicado:</strong> {{ contactStore.contact.indicated_student_name }}</p>
      </div>

      <p class="text-gray-700 text-center mb-4">
        Caso tenha dúvidas ou precise de mais informações, entre em contato pelo WhatsApp.
      </p>

      <a href="https://wa.me/5511944661190?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20infoma%C3%A7%C3%B5es%20sobre%20o%20sorteio%20de%20indica%C3%A7%C3%A3o!" target="_blank" class="w-full text-center text-white font-bold py-3 rounded-lg transition mt-2 text-lg shadow disabled:opacity-50 bg-green-600 hover:bg-green-700">
        Falar no WhatsApp
      </a>

      <div class="w-full flex flex-col items-center mt-4">
        <Badge class="bg-red-100 text-red-800 text-xs font-semibold px-4 py-1 rounded-lg mb-2 text-center">
          Em breve você receberá mais informações sobre o sorteio.
        </Badge>
        <span class="text-gray-500 text-xs text-center">
          Seus dados estão protegidos. <br /> Em caso de dúvida, nossa equipe está pronta para ajudar.
        </span>
      </div>
    </Card>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useContactStore } from '@/stores/contactStore';
import AppLayout from "@/layout/AppLayout.vue";
import Badge from "@/components/ui/Badge.vue";
import Card from "@/components/ui/Card.vue";

const router = useRouter();
const route = useRoute();

const contactStore = useContactStore(route.params.id);

console.log(contactStore.contact)

onMounted(() => {
  if (!contactStore.contact) {
    console.warn("Nenhum contato encontrado no store, redirecionando para /404...");
    router.push("/404");
  }
});
</script>
