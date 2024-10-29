import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  const valorParametro = +to.params.id;

  if (isNaN(valorParametro) || valorParametro < 0) {
    return navigateTo('/videos');
  }
});
