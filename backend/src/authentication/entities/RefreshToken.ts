import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("refresh_token")
export class RefreshToken {
   @PrimaryColumn()
   id!: string;

   @Column()
   user_id: string;

   @Column()
   refreshToken: string;

   @Column()
   valid: boolean;

   @Column({ type: 'timestamptz' })
   expires: Date;

   @CreateDateColumn()
   created_at: Date;

   constructor() {
      this.id = uuidv4();
   }
}
