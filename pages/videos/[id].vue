<template>
  <div class="grid w-full justify-center">
    <UCard class="w-[800px] justify-center">
      <template #header>
        {{ video?.descricao }}
      </template>
      <iframe class="h-[500px] w-full" :src="video?.url" title="YouTube video player" frameborder="0" />
      <template #footer>
        <div class="flex justify-between">
          <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="primary"
            variant="solid"
            label="Editar Vídeo"
            :trailing="false"
            @click="abrirModal"
          />
          <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="red"
            variant="outline"
            label="Remover Vídeo"
            :trailing="false"
            @click="deletarVideo"
          />
        </div>
      </template>
    </UCard>
    <UModal v-model="isOpen">
      <div class="p-4">
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Descrição" name="descricao">
            <UInput v-model="state.descricao" />
          </UFormGroup>

          <UFormGroup label="URL do Vídeo" name="url">
            <UInput v-model="state.url" />
          </UFormGroup>

          <UButton type="submit"> Adicionar </UButton>
        </UForm>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types';

import type { Video } from '~/interfaces/video';

// const { id } = useRoute().params;
const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const { $toast } = useNuxtApp();
// const video = ref<Video>({} as Video);
const { data: video } = await useFetch<Video>(`/api/v1/videos/${route.params.id}`);

// Simplificando as coisas com useSeoMeta({}) mais simplificada que o useHead({})
useSeoMeta({
  title: 'Nuxt - SEO e Meta',
  ogDescription: video.value?.descricao || '',
  ogUrl: video.value?.url || '',
  ogType: 'video.other',
});

if (!video.value) {
  throw createError({
    statusCode: 404,
    message: 'Vídeo não encontrado',
  });
}

// onMounted(async () => {
//   video.value = await useFetch(`/api/v1/video/${route.params.id}`);
// });

const state = reactive({
  descricao: '',
  url: '',
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.descricao) errors.push({ path: 'descricao', message: 'Required' });
  if (!state.url) errors.push({ path: 'url', message: 'Required' });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  try {
    await $fetch(`/api/v1/videos/${route.params.id}`, {
      method: 'PUT',
      body: state,
    });
    $toast.success(`Vídeo atualizado com sucesso!
Redirecionando para a página de vídeos...`);
    isOpen.value = false;
    setTimeout(() => {
      router.push('/videos');
    }, 2000);
  } catch (error) {
    console.error(error);
    $toast.error('Erro ao atualizar o vídeo');
  }
}

const abrirModal = () => {
  state.descricao = video.value?.descricao || '';
  state.url = video.value?.url || '';
  isOpen.value = true;
};

const deletarVideo = async () => {
  try {
    await $fetch(`/api/v1/videos/${route.params.id}`, {
      method: 'DELETE',
      body: state,
    });
    $toast.success(`Vídeo removido com sucesso!
Redirecionando para a página de vídeos...`);
    isOpen.value = false;
    setTimeout(() => {
      router.push('/videos');
    }, 2000);
  } catch (error) {
    console.error(error);
    $toast.error('Erro ao remover o vídeo');
  }
};
</script>

<style></style>

