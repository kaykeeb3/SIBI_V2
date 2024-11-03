import express from "express";
import cors from "cors";
import http from "http";

import { Socket } from "@/infra/socket/socket";
import authRoutes from "@/infra/routes/authRoutes";
import bookRoutes from "@/infra/routes/bookRoutes";
import loanRoutes from "@/infra/routes/loanRoutes";
import equipmentRoutes from "@/infra/routes/equipmentRoutes";
import scheduleRoutes from "@/infra/routes/scheduleRoutes";

const app = express();
const server = http.createServer(app);

// Configuração do CORS
const corsOptions = {
  origin: "*",
  methods: "*",
};

// Uso de middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);
app.use("/equipments", equipmentRoutes);
app.use("/schedules", scheduleRoutes);

// Configuração do Socket.io
const { io, cleanup } = Socket(server);

// Iniciar o servidor
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export { server, io, cleanup };
