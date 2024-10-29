export default defineOAuthAuth0EventHandler({
  async onSuccess(event, { user, tokens }) {
    // Configura a sessão do usuário no evento de sucesso
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        urlFoto: user.picture,
        nome: String(user.name).trim(),
      },
    });
    return sendRedirect(event, '/'); // Redireciona para a página principal
  },

  onError(event, error) {
    console.error('OAuth error:', error);
    return sendRedirect(event, '/'); // Redireciona para a página inicial em caso de erro
  },
});

