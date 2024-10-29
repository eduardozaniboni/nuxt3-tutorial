import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user, tokens }) {
    // verifica se possui usuário
    let usuario = await prisma.usuario.findUnique({
      where: {
        email: user.email,
      },
      include: {
        permissao: true,
      },
    });

    // se não possui, adiciona
    if (!usuario) {
      const PERMISSAO_USUARIO = 2;

      usuario = await prisma.usuario.create({
        data: {
          email: user.email,
          nome: user.name,
          permissao_id: PERMISSAO_USUARIO,
        },
        include: {
          permissao: true,
        },
      });
    }

    // Configura a sessão do usuário no evento de sucesso
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        urlFoto: user.picture,
        nome: String(user.name).trim(),
        permissao: usuario.permissao?.nome!,
        usuario_id: usuario.id,
      },
    });

    return sendRedirect(event, '/'); // Redireciona para a página principal
  },

  onError(event, error) {
    console.error('Google OAuth error:', error);
    return sendRedirect(event, '/'); // Redireciona para a página inicial em caso de erro
  },
});

