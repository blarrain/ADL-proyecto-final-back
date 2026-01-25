import { Router } from "express";
import https from "https";

const router = Router();

// ignora certificado vencido
const agent = new https.Agent({
  rejectUnauthorized: false,
});

router.get("/", (req, res) => {
  https.get(
    "https://apis.digital.gob.cl/dpa/comunas",
    { agent },
    (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => (data += chunk));

      apiRes.on("end", () => {
        try {
          const json = JSON.parse(data);
          const comunas = json.map((c) => c.nombre);
          res.json(comunas);
        } catch (error) {
          console.error("❌ Parse comunas:", error.message);
          res.status(500).json({ message: "Error procesando comunas" });
        }
      });
    }
  ).on("error", (error) => {
    console.error("❌ HTTPS comunas:", error.message);
    res.status(500).json({ message: "Error consultando comunas" });
  });
});

export default router;
