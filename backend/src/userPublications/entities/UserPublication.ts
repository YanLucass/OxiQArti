import { User } from "@users/entities/User";
import { PublicationImage } from "@publicationImages/entities/PublicationImage";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users_publication")
export class UserPublication {
   @PrimaryColumn()
   id!: string;

   @Column()
   title: string;

   @Column()
   description: string;

   @Column()
   service: string;

   //image relation
   @OneToMany(() => PublicationImage, image => image.userPublication, { cascade: true })
   images: PublicationImage[];

   //user relalation
   @ManyToOne(() => User, {
      cascade: true,
   })
   user: User;

   @CreateDateColumn()
   created_at: Date;

   constructor(title: string, description: string, service: string) {
      this.id = uuidv4();
      this.title = title;
      this.description = description;
      this.service = service;
   }
}
