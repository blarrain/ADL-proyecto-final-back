import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const PORT = process.env.PORT || 3000;
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

app.listen(PORT, console.log(`🟢 Server up: http://localhost:${PORT}`))