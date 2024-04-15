// middlewares/validateEquipmentMiddleware.js

// Função para validar os dados de um equipamento
function validateEquipment(req, res, next) {
  const { nome, tipo, quantidade } = req.body;

  // Verifica se o campo "nome" está presente e é uma string não vazia
  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({
      error: "O campo 'nome' é obrigatório e deve ser uma string não vazia.",
    });
  }

  // Verifica se o campo "tipo" está presente e é uma string não vazia
  if (!tipo || typeof tipo !== "string" || tipo.trim() === "") {
    return res.status(400).json({
      error: "O campo 'tipo' é obrigatório e deve ser uma string não vazia.",
    });
  }

  // Verifica se o campo "quantidade" está presente e é um número inteiro positivo
  if (
    !quantidade ||
    typeof quantidade !== "number" ||
    quantidade < 0 ||
    !Number.isInteger(quantidade)
  ) {
    return res.status(400).json({
      error:
        "O campo 'quantidade' é obrigatório e deve ser um número inteiro positivo.",
    });
  }

  // Se todos os campos passaram na validação, chama o próximo middleware
  next();
}

export { validateEquipment }; // Correção da exportação
