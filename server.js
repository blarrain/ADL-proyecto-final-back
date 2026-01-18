import express from 'express';
import cors from 'cors';
import 'dotenv/config'

import artRouter from "./routes/articulos.router.js"
import userRouter from "./routes/usuarios.router.js"
import authRouter from "./routes/auth.router.js"

const PORT = process.env.PORT || 3000;
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

app.use("/articulos", artRouter);
app.use("/usuarios",userRouter);

app.use("/auth", authRouter);

app.listen(PORT, console.log(`🔥 Server corriendo en http://localhost:5000`))