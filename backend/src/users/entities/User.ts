import { UserRole } from "@users/repositories/IUsersRepository";
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

   @Column()
   phone: string;

   @Column()
   contact: string;

   @Column()
   about: string;
   

   @Column()
   state: string;

   @Column()
   city: string;

   @Column()
   specialty?: string

   @Column({
      type: "enum",
      enum: UserRole,
      default: UserRole.onlyContracting
   })
   role: UserRole
   
   @Column()
   avatar: string;

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
