interface Rotas {
  nome: string;
  path: string;
  permissao?: string;
}

export default () => {
  const rotas: Rotas[] = [
    { nome: 'Home', path: '/' },
    { nome: 'Vídeos', path: '/videos' },
    { nome: 'Adicionar Vídeos', path: '/videos/adicionar', permissao: 'Administrador' },
    { nome: 'Favoritos', path: '/videos/favoritos' },
    { nome: 'Clientes', path: '/clientes' },
  ];
  return rotas;
};

