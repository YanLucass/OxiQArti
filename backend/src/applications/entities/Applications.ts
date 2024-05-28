import { Artist } from "@artists/entities/Artist";
import { UserPublication } from "@userPublications/entities/UserPublication";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity("applications")
export class Applications {
    @PrimaryColumn()
    id: string;

    //relation with userPublication.
    @ManyToOne(() => UserPublication, userPublication => userPublication.applications)
    userPublication: UserPublication;

    //one artist have many applications.
    @ManyToOne(() => Artist, {
        cascade: true
    })    
    artist: Artist;


    constructor() {
        this.id = uuidv4()
    }

}