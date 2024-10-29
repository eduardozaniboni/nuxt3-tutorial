<template>
  <div>
    <h1 class="text-center text-4xl py-4">{{ $t('tituloFavorito') }}</h1>
    <div class="grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
      <UCard v-for="video in favoritos" :key="video.id">
        <template #header>
          {{ video.descricao }}
        </template>
        <div class="video-container">
          <iframe class="h-44 w-full" :src="video.url" frameborder="0" title="Youtube Vídeo Player" allowfullscreen />
        </div>
        <template #footer>
          <div class="flex items-center justify-center">
            <UButton @click="removerFavorito(video.id)">Remover dos favoritos</UButton>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Com Pinia
import { useVideoStore } from '~/stores/video';

const videoStore = useVideoStore();
const { favoritos } = storeToRefs(videoStore);

// Sem Pinia
// const favoritos = useFavoritos();

// const removerFavorito = (id: Number) => {
//   const favoritosFiltrados = favoritos.value.filter((x) => x.id !== id);
//   favoritos.value = favoritosFiltrados;
// };

const { $toast } = useNuxtApp();

const removerFavorito = (id: Number) => {
  videoStore.removerFavorito(id);
  $toast.error('Vídeo removido dos favoritos!');
};
</script>

<style scoped></style>

