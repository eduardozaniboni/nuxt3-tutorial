-- CreateTable
CREATE TABLE
    "Video" (
        "id" SERIAL NOT NULL,
        "descricao" TEXT NOT NULL,
        "url" TEXT NOT NULL,
        "data_postagem" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "usuarioId" INTEGER,
        CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "Usuario" (
        "id" SERIAL NOT NULL,
        "nome" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "permissaoId" INTEGER,
        CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
    );

-- CreateTable
CREATE TABLE
    "Permissao" (
        "id" SERIAL NOT NULL,
        "nome" TEXT NOT NULL,
        CONSTRAINT "Permissao_pkey" PRIMARY KEY ("id")
    );

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario" ("email");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_permissaoId_fkey" FOREIGN KEY ("permissaoId") REFERENCES "Permissao" ("id") ON DELETE SET NULL ON UPDATE CASCADE;