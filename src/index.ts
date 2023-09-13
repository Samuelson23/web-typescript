import express from "express";
import dotenv from "dotenv";
const { connect } = require("./db.ts");

dotenv.config();
const PORT = process.env.PORT;
const ROUTE = process.env.ROUTE;
const app = express();
connect();

app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ limit: "12mb", extended: false }));

app.get("/", (_req, res) => {
  res.send(`✅Servidor localhost: escuchando ✅`);
  console.log(`✅Servidor localhost:${PORT} escuchando ✅`);
});
app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("res send, PONG");
});

//!-------------------------------------------------------
//?---------------------------PRIMERA RUTA DE NUESTRA API
//!-------------------------------------------------------
import diaryRouter from "./routes/diary.routes";
app.use("/api/v1/routes", diaryRouter);
import userRoutes from "./routes/userRoutes";
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto: ${ROUTE}${PORT}`);
});
