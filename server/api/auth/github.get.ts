export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user, tokens }) {
    // Configura a sessão do usuário no evento de sucesso
    await setUserSession(event, {
      user: user,
    });
    return sendRedirect(event, '/'); // Redireciona para a página principal
  },

  onError(event, error) {
    console.error('Github OAuth error:', error);
    return sendRedirect(event, '/'); // Redireciona para a página inicial em caso de erro
  },
});

