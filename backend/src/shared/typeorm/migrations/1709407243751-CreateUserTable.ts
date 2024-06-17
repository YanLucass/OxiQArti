import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1708695151290 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {

      //create enum for user role
      await queryRunner.query(`
       DO
       $$
       BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_type') THEN
            CREATE TYPE role_type AS ENUM('onlyArtist', 'contractingArtist', 'onlyContracting');
        END IF;
       END
       $$;
`);
      await queryRunner.createTable(
         new Table({
            name: "users",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },

               {
                  name: "name",
                  type: "varchar(60)",
                  isNullable: false,
               },

               {
                  name: "email",
                  type: "varchar(160)",
                  isNullable: false,
               },

               {
                  name: "phone",
                  type: "varchar(16)",
                  isUnique: true,
                  isNullable: true,
               },

               {
                  name: "contact",
                  type: "varchar(255)",
                  isNullable: false
               },


               {
                  name: "about",
                  type: "text",
                  isNullable: true,
               },

               {
                  name: "state",
                  type: "varchar(30)",
                  isNullable: false,
               },

               {
                  name: "city",
                  type: "varchar(30)",
                  isNullable: false,
               },

               {
                  name: "specialty",
                  type: "varchar(30)",
                  isNullable: true,
               },

               {
                  name: "role",
                  type: 'role_type',
                  isNullable: false
               },

               {
                  name: "avatar",
                  type: "varchar(255)",
                  isNullable: true,
               },

               {
                  name: "password",
                  type: "varchar(255)",
                  isNullable: false,
               },


               {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
      await queryRunner.query('DROP TYPE IF EXISTS role_type');
   }
}
