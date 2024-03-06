const { PrismaClient } = require("@prisma/client");
const { isValid, parseISO } = require("date-fns");

const prisma = new PrismaClient();

async function validarDatas(dataInicio, dataDevolucao) {
  return isValid(new Date(dataInicio)) && isValid(new Date(dataDevolucao));
}

async function criarAgendamento(req, res) {
  try {
    const {
      nome,
      quantidade,
      dataInicio,
      dataDevolucao,
      diaSemana,
      equipamentoId,
      tipo,
    } = req.body;

    // Converter as datas para objetos Date
    const inicio = new Date(dataInicio);
    const devolucao = new Date(dataDevolucao);

    // Verificar se o equipamento existe
    const equipmentExists = await prisma.equipment.findUnique({
      where: {
        id: parseInt(equipamentoId),
      },
    });

    if (!equipmentExists) {
      return res.status(400).json({ error: "Equipamento não encontrado" });
    }

    // Verificar se as datas fornecidas são válidas
    if (!isValid(inicio) || !isValid(devolucao)) {
      return res.status(400).json({ error: "Datas fornecidas são inválidas" });
    }

    // Criar o agendamento
    const agendamento = await prisma.schedule.create({
      data: {
        nome,
        quantidade,
        dataInicio: inicio,
        dataDevolucao: devolucao,
        diaSemana,
        equipamentoId: parseInt(equipamentoId),
        tipo,
        devolvido: false, // Definindo devolvido como false ao criar um novo agendamento
      },
    });

    res.json(agendamento);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function listarAgendamentos(req, res) {
  try {
    const agendamentos = await prisma.schedule.findMany();
    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao listar agendamentos:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function excluirAgendamento(req, res) {
  const { id } = req.params;
  try {
    await prisma.schedule.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Agendamento excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function atualizarAgendamento(req, res) {
  const { id } = req.params;
  const {
    nome,
    quantidade,
    dataInicio,
    dataDevolucao,
    diaSemana,
    equipamentoId,
    tipo,
  } = req.body;

  try {
    // Verificar se o agendamento existe
    const agendamento = await prisma.schedule.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // Verificar se o agendamento existe antes de prosseguir
    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    // Atualizar o agendamento
    const agendamentoAtualizado = await prisma.schedule.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome,
        quantidade,
        dataInicio: new Date(dataInicio),
        dataDevolucao: new Date(dataDevolucao),
        diaSemana,
        equipamentoId: parseInt(equipamentoId),
        tipo,
      },
    });

    res.json(agendamentoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Função para marcar um agendamento como devolvido
async function marcarDevolvido(req, res) {
  const { id } = req.params;

  try {
    const agendamento = await prisma.schedule.update({
      where: { id: parseInt(id) },
      data: { devolvido: true },
    });

    res.json(agendamento);
  } catch (error) {
    console.error("Erro ao marcar agendamento como devolvido:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  criarAgendamento,
  listarAgendamentos,
  excluirAgendamento,
  atualizarAgendamento,
  marcarDevolvido, // Adicionando a função para marcar como devolvido
};
