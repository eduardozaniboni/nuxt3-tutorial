import { getVideoById } from '~/server/services/v2/videoService';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, message: 'ID não fornecido' });

    const video = await getVideoById(id);
    if (!video) throw createError({ statusCode: 404, message: 'Vídeo não encontrado' });

    return video;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao buscar vídeo',
    });
  }
});

