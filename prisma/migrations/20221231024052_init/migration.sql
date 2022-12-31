-- CreateTable
CREATE TABLE "aluno" (
    "nome" TEXT NOT NULL,
    "senha" VARCHAR NOT NULL,
    "email" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ativo',
    "id" SERIAL NOT NULL,
    "codigoConfirmacao" TEXT NOT NULL,
    "status" BOOLEAN,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id_turma" INTEGER NOT NULL,
    "id_aluno" INTEGER NOT NULL,
    "id_reserva" SERIAL NOT NULL,
    "computador" TEXT NOT NULL,
    "curso" TEXT NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id_reserva")
);

-- CreateTable
CREATE TABLE "professor" (
    "nome" TEXT NOT NULL,
    "senha" VARCHAR NOT NULL,
    "codigoConfirmacao" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ativo',
    "id" SERIAL NOT NULL,
    "status" BOOLEAN,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
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
    "dia_semana" VARCHAR(20) NOT NULL,
    "id" SERIAL NOT NULL
);

-- CreateTable
CREATE TABLE "turma" (
    "id_lab" INTEGER NOT NULL,
    "data_turma" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "horario_inicio" TEXT NOT NULL,
    "horario_fim" TEXT NOT NULL,
    "id_professor" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrador" (
    "email" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" VARCHAR NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proibelaboratorio" (
    "data_inicio" TIMESTAMP(3),
    "data_fim" TIMESTAMP(3),
    "id_lab" INTEGER NOT NULL,
    "id" SERIAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_codigoConfirmacao_key" ON "aluno"("codigoConfirmacao");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_status_key" ON "aluno"("email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "reserva_id_aluno_id_turma_key" ON "reserva"("id_aluno", "id_turma");

-- CreateIndex
CREATE UNIQUE INDEX "professor_codigoConfirmacao_key" ON "professor"("codigoConfirmacao");

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_status_key" ON "professor"("email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "laboratorio_id_lab_key" ON "laboratorio"("id_lab");

-- CreateIndex
CREATE UNIQUE INDEX "bloqueia_id_key" ON "bloqueia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_key" ON "administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "proibelaboratorio_id_key" ON "proibelaboratorio"("id");

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_turma_fkey" FOREIGN KEY ("id_turma") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bloqueia" ADD CONSTRAINT "bloqueia_id_lab_fkey" FOREIGN KEY ("id_lab") REFERENCES "laboratorio"("id_lab") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turma" ADD CONSTRAINT "turma_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proibelaboratorio" ADD CONSTRAINT "proibelaboratorio_id_lab_fkey" FOREIGN KEY ("id_lab") REFERENCES "laboratorio"("id_lab") ON DELETE RESTRICT ON UPDATE CASCADE;
