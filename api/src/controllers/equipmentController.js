// controllers/equipmentController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cadastrarEquipamento(req, res) {
  const { nome, tipo, quantidade } = req.body;
  try {
    const novoEquipamento = await prisma.equipment.create({
      data: {
        nome,
        tipo,
        quantidade,
      },
    });
    res.status(201).json(novoEquipamento);
  } catch (error) {
    console.error("Erro ao cadastrar equipamento:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function listarEquipamentos(req, res) {
  try {
    const equipamentos = await prisma.equipment.findMany();
    res.json(equipamentos);
  } catch (error) {
    console.error("Erro ao listar equipamentos:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function obterEquipamentoPorId(req, res) {
  const equipamentoId = parseInt(req.params.id);
  try {
    const equipamento = await prisma.equipment.findUnique({
      where: {
        id: equipamentoId,
      },
    });
    if (!equipamento) {
      return res.status(404).json({ error: "Equipamento não encontrado" });
    }
    return res.status(200).json(equipamento);
  } catch (error) {
    console.error("Erro ao obter equipamento:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function atualizarEquipamento(req, res) {
  const equipamentoId = parseInt(req.params.id);
  const { nome, tipo, quantidade } = req.body;
  try {
    const equipamentoAtualizado = await prisma.equipment.update({
      where: {
        id: equipamentoId,
      },
      data: {
        nome,
        tipo,
        quantidade,
      },
    });
    res.json(equipamentoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar equipamento:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function excluirEquipamento(req, res) {
  const equipamentoId = parseInt(req.params.id);
  try {
    await prisma.equipment.delete({
      where: {
        id: equipamentoId,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao excluir equipamento:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export {
  cadastrarEquipamento,
  listarEquipamentos,
  obterEquipamentoPorId,
  atualizarEquipamento,
  excluirEquipamento,
};
