import { CreateApplicationDTO, IApplicationRepository } from "./IApplicationRepository";
import { Repository } from "typeorm";
import { PostgresDataSource } from "@shared/typeorm/connect";
import { Applications } from "@applications/entities/Applications";

export class ApplicationRepository implements IApplicationRepository {

    private applicationRepository: Repository<Applications>
    constructor() {
        this.applicationRepository = PostgresDataSource.getRepository(Applications)
    }

    //create application
    createApplication({userPublication, artist}: CreateApplicationDTO): Promise<Applications> {
        const newApplication = this.applicationRepository.create({
           userPublication,
           artist
        });

        return this.saveApplication(newApplication);
        
    }

    async saveApplication(application: Applications) {
        return this.applicationRepository.save(application);
    }

    //to check if artist already applicated on a userPublication(artService)
    async findRepeatApplication(userPublicationId: string, artistId: string): Promise<Applications | null> {
        return this.applicationRepository.findOne({
            where: {
                userPublication: { id: userPublicationId },
                artist: { id: artistId }
            },
            relations: ['userPublication', 'artist']
        });
    }
}