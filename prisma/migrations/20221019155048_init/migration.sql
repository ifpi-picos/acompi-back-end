-- CreateTable
CREATE TABLE "professor" (
    "email_professor" VARCHAR(20) NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("email_professor")
);

-- CreateTable
CREATE TABLE "criarturma" (
    "id_turma" INTEGER NOT NULL,
    "email_professor" VARCHAR(20) NOT NULL,
    "id_lab" INTEGER NOT NULL,
    "data_turma" TIMESTAMP(3) NOT NULL,
    "horario_inicio" TIME(0),
    "horario_fim" TIME(0),
    "curso" VARCHAR(20) NOT NULL,

    CONSTRAINT "criarturma_pkey" PRIMARY KEY ("email_professor")
);

-- CreateTable
CREATE TABLE "administrador" (
    "email_adm" VARCHAR(20) NOT NULL,
    "nome_adm" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "proibelaboratorio" (
    "id" SERIAL NOT NULL,
    "data_inicio" TIMESTAMP(3),
    "data_fim" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "criarturma_id_turma_key" ON "criarturma"("id_turma");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_adm_key" ON "administrador"("email_adm");

-- CreateIndex
CREATE UNIQUE INDEX "proibelaboratorio_id_key" ON "proibelaboratorio"("id");
