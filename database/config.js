import pkg from "pg";
const { Pool } = pkg;
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;