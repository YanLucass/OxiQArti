import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
//migrations
import { CreateUserTable1708695151290 } from "./migrations/1709407243751-CreateUserTable";
import { CreateArtistTable1708975074539 } from "./migrations/1709407254551-CreateArtistTable";
import { CreateRefreshTokenTable1708795878871 } from "./migrations/1709407719737-CreateRefreshTokenTable";
import { CreateUserPublicationTable1710336128309 } from "./migrations/1710336128309-CreateUserPublicationTable";
import { PublicationsImages1710954972808 } from "./migrations/1710954972808-PublicationsImages";
import { Applications1716473121675 } from "./migrations/1716473121675-Applications";
//entities
import { User } from "@users/entities/User";
import { Artist } from "@artists/entities/Artist";
import { RefreshToken } from "@authentication/entities/RefreshToken";
import { UserPublication } from "@userPublications/entities/UserPublication";
import { PublicationImage } from "@publicationImages/entities/PublicationImage";
import { Applications } from "@applications/entities/Applications";

//postgres
export const PostgresDataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT || "5432", 10),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: [User, Artist, RefreshToken, UserPublication, PublicationImage, Applications],
   migrations: [
      CreateUserTable1708695151290,
      CreateArtistTable1708975074539,
      CreateUserPublicationTable1710336128309,
      CreateRefreshTokenTable1708795878871,
      PublicationsImages1710954972808,
      Applications1716473121675
   ],
});
