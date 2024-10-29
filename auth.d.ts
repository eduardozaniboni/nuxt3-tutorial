declare module '#auth-utils' {
  interface User {
    id: number;
    nome: string;
    email: string;
    permissao: string;
    urlFoto: string;
    usuario_id: number;
  }
}

export {};
