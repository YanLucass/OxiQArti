import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
//migrations
import { CreateUserTable1708695151290 } from "./migrations/1708695151290-CreateUserTable";
import { CreateRefreshTokenTable1708795878871 } from "./migrations/1708795878871-CreateRefreshTokenTable";
//entities
import { User } from "@users/entities/User";
import { RefreshToken } from "@authentication/entities/RefreshToken";
//postgres
export const PostgresDataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT || "5432", 10),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: [User, RefreshToken],
   migrations: [CreateUserTable1708695151290, CreateRefreshTokenTable1708795878871],
});
