import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const tokenParts = token.split(" ");
  const tokenBearer = tokenParts[0];
  const tokenValue = tokenParts[1];

  if (tokenBearer !== "Bearer" || !tokenValue) {
    return res.status(401).json({ error: "Token malformado" });
  }

  jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
}

export { authenticateToken };
