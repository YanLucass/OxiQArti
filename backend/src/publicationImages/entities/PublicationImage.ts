// PublicationImage.entity.ts
import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { UserPublication } from "@userPublications/entities/UserPublication";
import { v4 as uuidv4 } from "uuid";

@Entity("publicationsImages")
export class PublicationImage {
   @PrimaryColumn()
   id!: string;

   @Column()
   nameImage: string;

   @ManyToOne(() => UserPublication, userPublication => userPublication.images)
   @JoinColumn({ name: "publicationId" })
   userPublication: UserPublication;

   @Column()
   publicationId: string;

   @Column()
   userId: string;

   @Column()
   artistId: string;

   @CreateDateColumn()
   created_at: Date;

   constructor(
      nameImage: string,
      userPublication: UserPublication,
      userId: string,
      artistId: string,
   ) {
      this.id = uuidv4();
      this.nameImage = nameImage;
      this.userPublication = userPublication;
      this.userId = userId;
      this.artistId = artistId;
   }
}
