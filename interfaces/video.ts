export interface Video {
  id: number;
  descricao: string;
  url: string;
  data_postagem: Date | null;
  usuario_id: number | null;
}
