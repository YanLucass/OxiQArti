import { Column, Entity, PrimaryColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidv4 } from "uuid";

@Entity("artists")
export class Artist {
   @PrimaryColumn()
   id!: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   phone: string;

   @Column()
   anotherContacts: string;

   @Column()
   url: string;

   @Column()
   state: string;

   @Column()
   city: string;

   @Column()
   specialty?: string;

   @Column()
   avatar: string;

   @Column()
   @Exclude()
   password: string;

   constructor() {
      this.id = uuidv4();
   }
}
