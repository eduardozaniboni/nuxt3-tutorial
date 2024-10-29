import { PrismaClient } from '@prisma/client';
import { Video } from '~/interfaces/video';

const prisma = new PrismaClient();

// Função para obter todos os vídeos
export async function getAllVideos(): Promise<Video[]> {
  const videos = await prisma.video.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  return videos as Video[];
}

// Função para obter um vídeo pelo ID
export async function getVideoById(id: string): Promise<Video | null> {
  const video = await prisma.video.findUnique({
    where: {
      id: Number(id),
    },
  });
  return video || null;
}

// Função para adicionar um novo vídeo
export async function addVideo(descricao: string, url: string, usuario_id: number): Promise<string> {
  await prisma.video.create({
    data: {
      descricao,
      url,
      data_postagem: new Date(), // Usa a data atual
      usuario_id,
    },
  });

  return 'Vídeo adicionado com sucesso';
}

// Função para atualizar um vídeo existente
export async function updateVideo(id: string, descricao: string, url: string): Promise<string> {
  await prisma.video.update({
    where: {
      id: Number(id),
    },
    data: {
      descricao,
      url,
      data_postagem: new Date(), // Atualiza a data de postagem
    },
  });

  return 'Vídeo atualizado com sucesso';
}

// Função para deletar um vídeo
export async function deleteVideo(id: string): Promise<string> {
  await prisma.video.delete({
    where: {
      id: Number(id),
    },
  });

  return 'Vídeo removido com sucesso';
}
