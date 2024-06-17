import { UserPublication } from "@userPublications/entities/UserPublication";
import { User } from "@users/entities/User";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity("applications")
export class Applications {
    @PrimaryColumn()
    id: string;

    //relation with userPublication.
    @ManyToOne(() => UserPublication, userPublication => userPublication.applications)
    userPublication: UserPublication;

    //one user have many applications.
    @ManyToOne(() => User, {
        cascade: true
    })    
    user: User;


    constructor() {
        this.id = uuidv4()
    }

}