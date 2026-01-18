import bcrypt from "bcryptjs";
import pool from "../database/config.js";

const run = async () => {
  const passwordPlano = "123456";
  const hash = bcrypt.hashSync(passwordPlano, 10);

  await pool.query(
    `UPDATE usuario SET password_hash = $1 WHERE id_usuario IN (1,2,3,4)`,
    [hash]
  );

  console.log("✅ Passwords corregidas");
  process.exit();
};

run();
