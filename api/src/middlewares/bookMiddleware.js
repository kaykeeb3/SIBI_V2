// middlewares/bookMiddleware.js
async function validateLivroInput(req, res, next) {
  const { nome, numero, autor, genero, quantidade } = req.body;

  console.log("Dados recebidos:", req.body);

  // Validar se todos os campos obrigatórios estão presentes
  if (
    !nome ||
    !autor ||
    !genero ||
    quantidade === undefined ||
    quantidade < 0
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // Validar o formato do número do livro (por exemplo, deve ser um número inteiro positivo)
  if (!Number.isInteger(numero) || numero <= 0) {
    return res
      .status(400)
      .json({ error: "O número do livro deve ser um número inteiro positivo" });
  }

  // Validar se o nome do autor contém apenas letras e espaços
  if (!/^[a-zA-Z\s]+$/.test(autor)) {
    return res
      .status(400)
      .json({ error: "O nome do autor deve conter apenas letras e espaços" });
  }

  // Validar se o gênero do livro é uma string
  if (typeof genero !== "string") {
    return res
      .status(400)
      .json({ error: "O gênero do livro deve ser uma string" });
  }

  // Validar se a quantidade é um número inteiro positivo
  if (!Number.isInteger(quantidade) || quantidade < 0) {
    return res
      .status(400)
      .json({ error: "A quantidade deve ser um número inteiro positivo" });
  }

  // Se todas as validações passaram, chame o próximo middleware ou rota
  next();
}

export { validateLivroInput }; // Correção da exportação
