// loanController.js

const { PrismaClient } = require("@prisma/client");
const { isValid, parseISO } = require("date-fns"); // Importe a função isValid do date-fns

const prisma = new PrismaClient();

// Função para validar as datas
async function validarDatas(dataInicio, dataDevolucao) {
  return isValid(new Date(dataInicio)) && isValid(new Date(dataDevolucao));
}
async function listarEmprestimos(req, res) {
  try {
    const { nome, serieCurso } = req.query;
    let emprestimos;

    if (nome && serieCurso) {
      emprestimos = await prisma.loan.findMany({
        where: {
          AND: [
            { nome: { contains: nome } },
            { serieCurso: { contains: serieCurso } },
            { devolvido: false }, // Apenas empréstimos não devolvidos
          ],
        },
      });
    } else if (nome) {
      emprestimos = await prisma.loan.findMany({
        where: {
          AND: [
            { nome: { contains: nome } },
            { devolvido: false }, // Apenas empréstimos não devolvidos
          ],
        },
      });
    } else if (serieCurso) {
      emprestimos = await prisma.loan.findMany({
        where: {
          AND: [
            { serieCurso: { contains: serieCurso } },
            { devolvido: false }, // Apenas empréstimos não devolvidos
          ],
        },
      });
    } else {
      emprestimos = await prisma.loan.findMany({
        where: { devolvido: false }, // Apenas empréstimos não devolvidos
      });
    }

    res.json(emprestimos);
  } catch (error) {
    console.error("Erro ao listar os empréstimos:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function marcarDevolvido(req, res) {
  const { id } = req.params;

  try {
    const emprestimo = await prisma.loan.update({
      where: { id: parseInt(id) },
      data: { devolvido: true },
    });

    res.json(emprestimo);
  } catch (error) {
    console.error("Erro ao marcar empréstimo como devolvido:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function criarEmprestimo(req, res) {
  const { nome, serieCurso, dataInicio, dataDevolucao, livroId } = req.body;

  try {
    // Verificar se as datas fornecidas são válidas
    if (!validarDatas(dataInicio, dataDevolucao)) {
      return res.status(400).json({ error: "Datas fornecidas são inválidas" });
    }

    // Se as datas forem válidas, criar o empréstimo
    const emprestimo = await prisma.loan.create({
      data: {
        nome: nome,
        serieCurso: serieCurso,
        dataInicio: parseISO(dataInicio), // Parse das datas para o formato Date
        dataDevolucao: parseISO(dataDevolucao), // Parse das datas para o formato Date
        livroId: parseInt(livroId), // Converter para inteiro,
      },
    });
    res.json(emprestimo);
  } catch (error) {
    console.error("Erro ao criar empréstimo:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function obterEmprestimos(req, res) {
  const { id } = req.params;

  try {
    const emprestimo = await prisma.loan.findUnique({
      where: { id: parseInt(id) },
    });

    if (!emprestimo) {
      return res.status(404).json({ error: "Empréstimo não encontrado" });
    }

    res.json(emprestimo);
  } catch (error) {
    console.error("Erro ao obter empréstimo:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function atualizarEmprestimo(req, res) {
  const { id } = req.params;
  const { nome, serieCurso, dataInicio, dataDevolucao, livroId } = req.body;

  try {
    if (!validarDatas(dataInicio, dataDevolucao)) {
      return res.status(400).json({ error: "Datas fornecidas são inválidas" });
    }

    const emprestimo = await prisma.loan.findUnique({
      where: { id: parseInt(id) },
    });

    if (!emprestimo) {
      return res.status(404).json({ error: "Empréstimo não encontrado" });
    }

    const emprestimoAtualizado = await prisma.loan.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        serieCurso,
        dataInicio: parseISO(dataInicio),
        dataDevolucao: parseISO(dataDevolucao),
        livroId: parseInt(livroId),
      },
    });

    res.json(emprestimoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar empréstimo:", error.message);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao atualizar empréstimo" });
  }
}

async function excluirEmprestimo(req, res) {
  const { id } = req.params;

  try {
    await prisma.loan.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Empréstimo deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir empréstimo:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function listarEmprestimosAtrasados(req, res) {
  try {
    const emprestimosAtrasados = await prisma.loan.findMany({
      where: {
        devolvido: false, // Apenas empréstimos não devolvidos
        dataDevolucao: {
          lt: new Date(), // Data de devolução é anterior à data atual
        },
      },
    });

    res.json(emprestimosAtrasados);
  } catch (error) {
    console.error("Erro ao listar empréstimos atrasados:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = {
  listarEmprestimos,
  criarEmprestimo,
  obterEmprestimos,
  atualizarEmprestimo,
  excluirEmprestimo,
  marcarDevolvido,
  listarEmprestimosAtrasados, // Adicionando a nova função ao exports
};
