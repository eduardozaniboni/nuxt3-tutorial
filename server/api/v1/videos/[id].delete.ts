import { deleteVideo } from '~/server/services/v2/videoService';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, message: 'ID não fornecido' });

    return await deleteVideo(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao remover vídeo',
    });
  }
});

