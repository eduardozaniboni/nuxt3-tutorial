import { Video } from '~/interfaces/video';

const { client } = postgresClient();

export async function getAllVideos(): Promise<Video[]> {
  const resultado = await client.query('SELECT * FROM videos ORDER BY descricao ASC');
  return resultado.rows as Video[];
}

export async function getVideoById(id: string): Promise<Video | null> {
  const resultado = await client.query('SELECT * FROM videos WHERE id = $1', [id]);
  return (resultado.rows[0] as Video) || null;
}

export async function addVideo(descricao: string, url: string): Promise<string> {
  const resultado = await client.query('SELECT MAX(id) FROM videos');
  const id = (resultado.rows[0].max as number) + 1;

  await client.query('INSERT INTO videos (id, descricao, url, data_postagem) VALUES ($1, $2, $3, CURRENT_DATE)', [
    id,
    descricao,
    url,
  ]);

  return 'Vídeo adicionado com sucesso';
}

export async function updateVideo(id: string, descricao: string, url: string): Promise<string> {
  await client.query(
    'UPDATE videos SET descricao = $1, url = $2, data_postagem = CURRENT_DATE WHERE id = $3 RETURNING *',
    [descricao, url, id]
  );

  return 'Vídeo atualizado com sucesso';
}

export async function deleteVideo(id: string): Promise<string> {
  await client.query('DELETE FROM videos WHERE id = $1', [id]);
  return 'Vídeo removido com sucesso';
}
