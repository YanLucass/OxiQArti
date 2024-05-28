
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";
import { Router } from "express";
import { container } from "tsyringe";

const applicationRouter = Router();

//import controllers
import { CreateApplicationController } from "@applications/controllers/CreateApplicationController";
import { GetAllArtistApplicationsController } from "@applications/controllers/GetAllArtistApplicationsController";

//controllers resolve
const createApplicationController = container.resolve(CreateApplicationController);
const getAllArtistApplicationController = container.resolve(GetAllArtistApplicationsController);

//create new application to artService(userPublication)
applicationRouter.post('/:id', IsAuthenticated, (req, res) => {
   return createApplicationController.handle(req, res);
})

//get all userPublication applications
applicationRouter.get("/userPublication/:id", IsAuthenticated, (req, res) => {
   return getAllArtistApplicationController.handle(req, res);
})
export { applicationRouter }