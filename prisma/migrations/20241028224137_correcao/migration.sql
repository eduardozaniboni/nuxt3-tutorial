/*
Warnings:

- You are about to drop the column `permissaoId` on the `Usuario` table. All the data in the column will be lost.
- You are about to drop the column `usuarioId` on the `Video` table. All the data in the column will be lost.

 */
-- DropForeignKey
ALTER TABLE "Usuario"
DROP CONSTRAINT "Usuario_permissaoId_fkey";

-- DropForeignKey
ALTER TABLE "Video"
DROP CONSTRAINT "Video_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Usuario"
DROP COLUMN "permissaoId",
ADD COLUMN "permissao_id" INTEGER;

-- AlterTable
ALTER TABLE "Video"
DROP COLUMN "usuarioId",
ADD COLUMN "usuario_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_permissao_id_fkey" FOREIGN KEY ("permissao_id") REFERENCES "Permissao" ("id") ON DELETE SET NULL ON UPDATE CASCADE;