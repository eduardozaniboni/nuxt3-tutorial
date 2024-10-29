<template>
  <UForm :validate="validate" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
    <UFormGroup label="Descrição" name="descricao">
      <UInput v-model="state.descricao" />
    </UFormGroup>

    <UFormGroup label="URL do Vídeo" name="url">
      <UInput v-model="state.url" />
    </UFormGroup>

    <UButton type="submit"> Adicionar </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

definePageMeta({
  middleware: ['auth'],
  permissao: 'Administrador',
});

const { user } = useUserSession();

const router = useRouter();
const { $toast } = useNuxtApp();

const state = reactive({
  descricao: undefined,
  url: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.descricao) errors.push({ path: 'descricao', message: 'Required' });
  if (!state.url) errors.push({ path: 'url', message: 'Required' });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  try {
    await $fetch('/api/v1/videos', {
      method: 'POST',
      body: {
        ...state,
        usuario_id: user.value?.usuario_id,
      },
    });
    $toast.success(`Vídeo adicionado com sucesso!
Redirecionando para a página de vídeos...`);
    setTimeout(() => {
      router.push('/videos');
    }, 2500);
  } catch (error) {
    console.error(error);
    $toast.error('Erro ao adicionar vídeo');
  }
  console.log(event.data);
}
</script>

