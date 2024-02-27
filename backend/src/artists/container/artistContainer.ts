import { CreateArtistController } from "@artists/controllers/CreateArtistController";
import { ArtistsRepository } from "@artists/repositories/ArtistsRepository";
import { IArtistsRepository } from "@artists/repositories/IArtistsRepository";
import { container } from "tsyringe";

//repositories
container.registerSingleton<IArtistsRepository>("ArtistsRepository", ArtistsRepository);
//controlelrs
container.registerSingleton("CreateArtistController", CreateArtistController);
