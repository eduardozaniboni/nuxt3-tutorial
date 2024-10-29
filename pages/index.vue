<template>
  <div>
    <div class="text-center text-5xl py-4">Página Inicial</div>
    {{ user }}
  </div>
</template>

<script setup>
const { user } = useUserSession();
// Abordagem dinâmica do título
const tituloSite = 'Pablo Codes - Tutoriais';

// Aplicando de forma única na página
useHead({
  title: tituloSite,
  meta: [
    {
      name: 'description',
      content: 'Site de tutoriais de VueJS e NuxtJS',
    },
  ],
});
</script>

