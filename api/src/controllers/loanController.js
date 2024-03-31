// loanController.js
const { PrismaClient } = require("@prisma/client");
const moment = require("moment"); // Import Moment.js

const prisma = new PrismaClient();

// Função para validar as datas usando Moment.js
async function validarDatas(dataInicio, dataDevolucao) {
  return (
    moment(dataInicio, "YYYY-MM-DD", true).isValid() &&
    moment(dataDevolucao, "YYYY-MM-DD", true).isValid()
  );
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

    // Verificar se há livros disponíveis para empréstimo
    const livro = await prisma.book.findUnique({
      where: { id: parseInt(livroId) },
    });

    // Verificar se a quantidade de livros disponíveis é suficiente
    const emprestimosAtivos = await prisma.loan.count({
      where: {
        livroId: parseInt(livroId),
        devolvido: false,
      },
    });

    if (!livro || livro.quantidade - emprestimosAtivos <= 0) {
      return res
        .status(400)
        .json({ error: "Livro não disponível para empréstimo" });
    }

    // Se as datas forem válidas e houver livros disponíveis, criar o empréstimo
    const emprestimo = await prisma.loan.create({
      data: {
        nome: nome,
        serieCurso: serieCurso,
        dataInicio: moment(dataInicio).toDate(), // Convertendo para objeto Date
        dataDevolucao: moment(dataDevolucao).toDate(), // Convertendo para objeto Date
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
        dataInicio: moment(dataInicio).toDate(), // Convertendo para objeto Date
        dataDevolucao: moment(dataDevolucao).toDate(), // Convertendo para objeto Date
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
