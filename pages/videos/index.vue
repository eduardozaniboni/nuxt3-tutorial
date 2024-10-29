<template>
  <div>
    <h1 class="text-center text-4xl py-4">{{ $t('titulo') }}</h1>
    <div class="grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
      <UCard v-for="video in videos" :key="video.id">
        <template #header>
          {{ video.descricao }}
        </template>
        {{ formataData(video.data_postagem!, 'dd/mm/yyyy') }}
        <iframe class="h-44 w-full" :src="video.url" frameborder="0" title="Youtube Vídeo Player" allowfullscreen />
        <template #footer>
          <div class="flex items-center justify-between gap-4">
            <UButton @click="favoritar(video as Video)">Adicionar Favorito</UButton>
            <NuxtLink
              :to="{
                name: 'videos-id',
                params: { id: video.id.toString() },
              }"
            >
              <UButton label="Ver vídeo" color="gray">
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                </template>
              </UButton>
            </NuxtLink>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Video } from '~/interfaces/video';
import { useVideoStore } from '~/stores/video';

definePageMeta({
  middleware: ['auth'],
});

const { $toast } = useNuxtApp();

const { data: videos, error } = await useFetch('/api/v1/videos');
// const videos = ref<Video[]>([]);

const favoritar = (video: Video) => {
  adicionarFavorito(video);
  $toast.success('Vídeo adicionado aos favoritos!');
};

onMounted(() => {
  if (error.value) {
    $toast.error(error.value.message || '');
  }
});

// Controle de Estado Com Pinia
const { adicionarFavorito } = useVideoStore();

// Controle de Estado Sem Pinia
// const favoritos = useFavoritos();

// const adicionarFavorito = (video: Video) => {
//   favoritos.value.push(video);
// };
</script>

<style scoped></style>

