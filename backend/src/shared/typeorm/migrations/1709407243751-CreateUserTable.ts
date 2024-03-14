import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1708695151290 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
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
                  name: "likes",
                  type: "varchar(30)",
                  isNullable: true,
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
                  name: "isArtist",
                  type: "boolean",
                  default: false,
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
   }
}
