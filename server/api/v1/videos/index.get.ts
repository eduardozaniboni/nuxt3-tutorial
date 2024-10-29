import { getAllVideos } from '~/server/services/v2/videoService';

export default defineEventHandler(async () => {
  try {
    return await getAllVideos();
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao buscar vídeos',
    });
  }
});

