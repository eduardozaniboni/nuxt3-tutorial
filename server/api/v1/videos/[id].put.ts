import { updateVideo } from '~/server/services/v2/videoService';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const id = event.context.params?.id;
    const { descricao, url } = await readBody(event);

    if (!id) throw createError({ statusCode: 400, message: 'ID não fornecido' });
    if (!descricao || !url) throw createError({ statusCode: 400, message: 'Campos obrigatórios ausentes' });

    return await updateVideo(id, descricao, url);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao atualizar vídeo',
    });
  }
});

