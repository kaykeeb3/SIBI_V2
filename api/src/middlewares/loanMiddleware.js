const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function verificarDisponibilidadeLivro(req, res) {
  try {
    const { nome, serieCurso } = req.query;
    let emprestimos;

    // Verificar se o nome e a série/curso estão presentes nos parâmetros da requisição
    if (nome !== undefined && serieCurso !== undefined) {
      emprestimos = await prisma.loan.findMany({
        where: {
          AND: [
            { nome: { contains: nome } }, // Verificar se o nome contém a string fornecida
            { serieCurso: { contains: serieCurso } }, // Verificar se a série/curso contém a string fornecida
          ],
        },
      });
    }
    // Verificar se apenas o nome está presente nos parâmetros da requisição
    else if (nome !== undefined) {
      emprestimos = await prisma.loan.findMany({
        where: { nome: { contains: nome } },
      });
    }
    // Verificar se apenas a série/curso está presente nos parâmetros da requisição
    else if (serieCurso !== undefined) {
      emprestimos = await prisma.loan.findMany({
        where: { serieCurso: { contains: serieCurso } },
      });
    }
    // Se nenhum filtro foi aplicado, retornar todos os empréstimos
    else {
      emprestimos = await prisma.loan.findMany();
    }

    res.json(emprestimos);
  } catch (error) {
    console.error("Erro ao listar os empréstimos:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

module.exports = { verificarDisponibilidadeLivro };
