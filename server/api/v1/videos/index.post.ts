import { addVideo } from '~/server/services/v2/videoService';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { descricao, url, usuario_id } = await readBody(event);

    if (!descricao || !url) {
      throw createError({ statusCode: 400, message: 'Campos obrigatórios ausentes' });
    }

    return await addVideo(descricao, url, usuario_id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao adicionar vídeo',
    });
  }
});

