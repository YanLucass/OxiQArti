import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
//migrations

//entities

//postgres
export const PostgresDataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT || "5432", 10),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: [],
   migrations: [],
});
