import "reflect-metadata";
// Renaming variable app to server
import { app as server } from "./appExpress";

// Organizing imports
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger.json";
import { PostgresDataSource } from "../typeorm/connect";

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Initializing connection to PostgreSQL.
PostgresDataSource.initialize()
    .then(() => {
        console.log(`Server started on port ${process.env.PORT || 5000}`);
        server.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.error("Error connecting to PostgreSQL", err);
    });

