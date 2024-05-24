import { Artist } from "@artists/entities/Artist";
import { UserPublication } from "@userPublications/entities/UserPublication";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";


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



}