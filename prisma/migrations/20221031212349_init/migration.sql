-- CreateTable
CREATE TABLE "aluno" (
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" VARCHAR(20) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ativo',
    "id" SERIAL NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id_turma" INTEGER NOT NULL,
    "id_aluno" INTEGER NOT NULL,
    "id_reserva" INTEGER NOT NULL,
    "computador" TEXT NOT NULL,
    "consentimento" BOOLEAN NOT NULL,
    "curso" TEXT NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id_reserva")
);

-- CreateTable
CREATE TABLE "professor" (
    "email_professor" VARCHAR(20) NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "id_professor" SERIAL NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id_professor")
);

-- CreateTable
CREATE TABLE "laboratorio" (
    "id_lab" SERIAL NOT NULL,
    "quantidade_computadores" INTEGER NOT NULL,

    CONSTRAINT "laboratorio_pkey" PRIMARY KEY ("id_lab")
);

-- CreateTable
CREATE TABLE "bloqueia" (
    "email_professor" VARCHAR(20) NOT NULL,
    "id_lab" INTEGER NOT NULL,
    "horario_inicio" TIME(0),
    "horario_fim" TIME(0),
    "data_inicio_bloqueia" TIMESTAMP(3) NOT NULL,
    "data_fim_bloqueia" TIMESTAMP(3) NOT NULL,
    "dia_semana" VARCHAR(20) NOT NULL
);

-- CreateTable
CREATE TABLE "criarturma" (
    "id_turma" INTEGER NOT NULL,
    "email_professor" VARCHAR(20),
    "id_lab" INTEGER NOT NULL,
    "data_turma" TIMESTAMP(3) NOT NULL,
    "curso" VARCHAR(20) NOT NULL,
    "horario_inicio" TIMESTAMP(3),
    "horario_fim" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "administrador" (
    "email_adm" VARCHAR(20) NOT NULL,
    "nome_adm" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "proibelaboratorio" (
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "email_adm" VARCHAR(20) NOT NULL,
    "id_lab" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "reserva_id_reserva_key" ON "reserva"("id_reserva");

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_professor_key" ON "professor"("email_professor");

-- CreateIndex
CREATE UNIQUE INDEX "laboratorio_id_lab_key" ON "laboratorio"("id_lab");

-- CreateIndex
CREATE UNIQUE INDEX "bloqueia_email_professor_key" ON "bloqueia"("email_professor");

-- CreateIndex
CREATE UNIQUE INDEX "bloqueia_horario_inicio_key" ON "bloqueia"("horario_inicio");

-- CreateIndex
CREATE UNIQUE INDEX "bloqueia_dia_semana_key" ON "bloqueia"("dia_semana");

-- CreateIndex
CREATE UNIQUE INDEX "criarturma_id_turma_key" ON "criarturma"("id_turma");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_adm_key" ON "administrador"("email_adm");

-- CreateIndex
CREATE UNIQUE INDEX "proibelaboratorio_email_adm_key" ON "proibelaboratorio"("email_adm");

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_turma_fkey" FOREIGN KEY ("id_turma") REFERENCES "criarturma"("id_turma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proibelaboratorio" ADD CONSTRAINT "proibelaboratorio_email_adm_fkey" FOREIGN KEY ("email_adm") REFERENCES "administrador"("email_adm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proibelaboratorio" ADD CONSTRAINT "proibelaboratorio_id_lab_fkey" FOREIGN KEY ("id_lab") REFERENCES "laboratorio"("id_lab") ON DELETE RESTRICT ON UPDATE CASCADE;
