import { CreateApplicationDTO, IApplicationRepository } from "./IApplicationRepository";
import { Repository } from "typeorm";
import { PostgresDataSource } from "@shared/typeorm/connect";
import { Applications } from "@applications/entities/Applications";
import { User } from "@users/entities/User";

export class ApplicationRepository implements IApplicationRepository {

    private applicationRepository: Repository<Applications>
    constructor() {
        this.applicationRepository = PostgresDataSource.getRepository(Applications)
    }
    getAllArtistApplications(userPublicationId: string): Promise<User[] | null> {
        throw new Error("Method not implemented.");
    }
    

    //create application
    createApplication({userPublication, user}: CreateApplicationDTO): Promise<Applications> {
        const newApplication = this.applicationRepository.create({
           userPublication,
           user
        });

        return this.saveApplication(newApplication);
        
    }

    async saveApplication(application: Applications) {
        return this.applicationRepository.save(application);
    }

    //to check if artist already applicated on a userPublication(artService)
    async findRepeatApplication(userPublicationId: string, userId: string): Promise<Applications | null> {
        
        return this.applicationRepository.findOne({
            where: {
                userPublication: { id: userPublicationId },
                user: { id: userId}
            },
            relations: ['userPublication', 'user']
        });

        

        
    }

    // //get all artists applications from an userPublication
    // async getAllArtistApplications(userPublicationId: string): Promise<Artist[] | null> {
    //     const applications = await this.applicationRepository.find({
    //         where: {
    //             userPublication: { id: userPublicationId}
    //         },

    //         relations: ["artist"]       
    //     })
        
    //     // //return object artist from applications array
    //     // const artists = applications.map((application) => { 
    //     //     return application.artist
    //     // })

    //     // return artists;
        

    }
