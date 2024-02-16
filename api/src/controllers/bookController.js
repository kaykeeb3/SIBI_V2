const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function listarLivros(req, res) {
  try {
    const { nome, categoria } = req.query;
    let livros;

    if (nome && categoria && categoria !== "Todos") {
      livros = await prisma.book.findMany({
        where: {
          nome: { contains: nome },
          genero: categoria,
        },
      });
    } else if (nome) {
      livros = await prisma.book.findMany({
        where: {
          nome: { contains: nome },
        },
      });
    } else if (categoria && categoria !== "Todos") {
      livros = await prisma.book.findMany({
        where: {
          genero: categoria,
        },
      });
    } else {
      livros = await prisma.book.findMany();
    }

    res.json(livros);
  } catch (error) {
    console.error("Erro ao listar os livros:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function cadastrarLivro(req, res) {
  const { nome, numero, autor, genero, quantidade } = req.body;

  if (!nome || !numero || !autor || !genero || !quantidade) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const livroCriado = await prisma.book.create({
      data: {
        nome,
        numero: parseInt(numero),
        autor,
        genero,
        quantidade: parseInt(quantidade),
      },
    });

    res.status(201).json(livroCriado);
  } catch (error) {
    console.error("Erro durante o cadastro do livro:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function editarLivro(req, res) {
  const { id } = req.params;
  const { nome, numero, autor, genero, quantidade } = req.body;

  if (!nome || !numero || !autor || !genero || !quantidade) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const livroAtualizado = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        numero: parseInt(numero),
        autor,
        genero,
        quantidade: parseInt(quantidade),
      },
    });

    res.json(livroAtualizado);
  } catch (error) {
    console.error("Erro durante a edição do livro:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

async function deletarLivro(req, res) {
  const { id } = req.params;

  try {
    // Verificar se existem empréstimos vinculados ao livro
    const emprestimosVinculados = await prisma.loan.findMany({
      where: { livroId: parseInt(id) },
    });

    // Se houver empréstimos vinculados, excluir todos os empréstimos primeiro
    if (emprestimosVinculados.length > 0) {
      await prisma.loan.deleteMany({
        where: { livroId: parseInt(id) },
      });
    }

    // Excluir o livro após excluir os empréstimos vinculados
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    console.error("Erro durante a exclusão do livro:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = { cadastrarLivro, editarLivro, deletarLivro, listarLivros };
