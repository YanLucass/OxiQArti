//to typeorm
import "reflect-metadata";
import { app } from "./appExpress";

//swagger
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger.json";

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

import { PostgresDataSource } from "../typeorm/connect";

//create connection
PostgresDataSource.initialize()
    .then(() => {
        //conection successful
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server started on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => {
        console.log("Erro ao se conectar com o postgres.", err);
    });

