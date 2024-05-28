
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";
import { Router } from "express";
import { container } from "tsyringe";

const applicationRouter = Router();

//import controllers
import { CreateApplicationController } from "@applications/controllers/CreateApplicationController";

//controllers resolve
const createApplicationController = container.resolve(CreateApplicationController);

//create new application to artService(userPublication)
applicationRouter.post('/:id', IsAuthenticated, (req, res) => {
   return createApplicationController.handle(req, res);
})

export { applicationRouter }