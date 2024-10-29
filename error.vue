<template>
  <div class="h-screen w-full flex flex-col items-center justify-center gap-4">
    <h1 class="text-8xl font-bold text-green-600">{{ error.statusCode }}</h1>
    <p class="text-2xl font-bold text-green-600">{{ error.message }}</p>
    <UButton @click="voltarHome" color="green" variant="outline" label="Ir para a Home" />
  </div>
</template>

<script setup>
defineProps({
  error: {
    default: {
      url: '',
      statusCode: 0,
      message: '',
      description: '',
      data: {},
    },
  },
});

const voltarHome = () => clearError({ redirect: '/' });
</script>
