<script setup lang="ts">
const { diasPassados, diferencaEmDias } = useUseFormatacao();

const dataVideo = new Date(2023, 9, 3);

diasPassados(dataVideo);
</script>

<template>
  <h1>Components - Nuxt 3</h1>
  <p>Autor: Eduardo Zaniboni</p>
  <p>{{ diferencaEmDias }} dias atrás</p>
</template>

