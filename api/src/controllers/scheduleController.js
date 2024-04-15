// controllers/scheduleController.js
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

async function validarDatas(dataInicio, dataDevolucao) {
  return (
    moment(dataInicio, "YYYY-MM-DD", true).isValid() &&
    moment(dataDevolucao, "YYYY-MM-DD", true).isValid()
  );
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

    const equipmentExists = await prisma.equipment.findUnique({
      where: {
        id: parseInt(equipamentoId),
      },
    });

    if (!equipmentExists) {
      return res.status(400).json({ error: "Equipamento não encontrado" });
    }

    if (!validarDatas(dataInicio, dataDevolucao)) {
      return res.status(400).json({ error: "Datas fornecidas são inválidas" });
    }

    const activeSchedulesCount = await prisma.schedule.count({
      where: {
        equipamentoId: parseInt(equipamentoId),
        devolvido: false,
      },
    });

    if (activeSchedulesCount >= 2) {
      return res
        .status(400)
        .json({ error: "O equipamento já possui dois agendamentos ativos" });
    }

    const agendamento = await prisma.schedule.create({
      data: {
        nome,
        quantidade,
        dataInicio: moment(dataInicio, "YYYY-MM-DD").toDate(),
        dataDevolucao: moment(dataDevolucao, "YYYY-MM-DD").toDate(),
        diaSemana,
        equipamentoId: parseInt(equipamentoId),
        tipo,
        devolvido: false,
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
    const { data, local } = req.query;
    let agendamentos;

    if (data && local) {
      agendamentos = await prisma.schedule.findMany({
        where: {
          AND: [
            { data: { contains: data } },
            { local: { contains: local } },
            { devolvido: false },
          ],
        },
      });
    } else if (data) {
      agendamentos = await prisma.schedule.findMany({
        where: {
          AND: [{ data: { contains: data } }, { devolvido: false }],
        },
      });
    } else if (local) {
      agendamentos = await prisma.schedule.findMany({
        where: {
          AND: [{ local: { contains: local } }, { devolvido: false }],
        },
      });
    } else {
      agendamentos = await prisma.schedule.findMany({
        where: {
          devolvido: false,
        },
      });
    }

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
    const agendamento = await prisma.schedule.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    if (!validarDatas(dataInicio, dataDevolucao)) {
      return res.status(400).json({ error: "Datas fornecidas são inválidas" });
    }

    const agendamentoAtualizado = await prisma.schedule.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome,
        quantidade,
        dataInicio: moment(dataInicio, "YYYY-MM-DD").toDate(),
        dataDevolucao: moment(dataDevolucao, "YYYY-MM-DD").toDate(),
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

export {
  criarAgendamento,
  listarAgendamentos,
  excluirAgendamento,
  atualizarAgendamento,
  marcarDevolvido,
};
