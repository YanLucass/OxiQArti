import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

//assotiate for users
@Entity("users")
export class User {
   @PrimaryColumn()
   id!: string;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column({ nullable: true })
   likes: string;

   @Column()
   @Exclude()
   password: string;

   @CreateDateColumn()
   created_at: Date;

   constructor(name: string, email: string, password: string) {
      this.id = uuidv4();
      this.name = name;
      this.email = email;
      this.password = password;
   }
}
