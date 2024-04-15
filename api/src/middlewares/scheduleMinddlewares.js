import { isValid } from "date-fns"; // Correção da importação

function validarDadosAgendamento(req, res, next) {
  const {
    nome,
    equipamentoId,
    quantidade,
    dataInicio,
    dataDevolucao,
    diaSemana,
  } = req.body;

  // Verificar se todos os campos obrigatórios estão presentes
  if (
    !nome ||
    !equipamentoId ||
    !quantidade ||
    !dataInicio ||
    !dataDevolucao ||
    !diaSemana
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // Verificar se as datas fornecidas são válidas
  if (!isValid(new Date(dataInicio)) || !isValid(new Date(dataDevolucao))) {
    return res.status(400).json({ error: "Datas fornecidas são inválidas" });
  }

  next();
}

export { validarDadosAgendamento }; // Correção da exportação
