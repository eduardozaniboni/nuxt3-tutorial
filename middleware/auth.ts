const { user } = useUserSession();

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();
  if (!loggedIn.value) {
    return navigateTo('/login');
  }

  if (to.meta.permissao && to.meta.permissao !== user.value?.permissao) {
    throw createError({
      statusCode: 401,
      message: 'Você não tem permissão para acessar essa rota',
    });
  }
});

