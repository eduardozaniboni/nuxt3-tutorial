<template>
  <UCard>
    <template #header>
      <h1 class="text-2xl text-center p-4">Faça login para acessar a plataforma</h1>
      <div class="flex flex-col items-center justify-center gap-4">
        <a class="w-full" href="/api/auth/google">
          <UButton icon="logos:google-icon" label="Login com Google" color="gray" size="lg" block />
        </a>
        <!-- <a class="w-full" href="/api/auth/github">
          <UButton icon="logos:github-icon" label="Login com Github" color="gray" size="lg" block />
        </a>
        <a class="w-full" href="/api/auth/oauth0">
          <UButton icon="logos:auth0-icon" label="Login com OAuth" color="gray" size="lg" block />
        </a> -->
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
});
</script>

<style></style>

