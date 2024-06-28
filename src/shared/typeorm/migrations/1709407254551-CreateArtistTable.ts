import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArtistTable1708975074539 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "artists",
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
                  type: "varchar(180)",
                  isUnique: true,
                  isNullable: false,
               },

               {
                  name: "phone",
                  type: "varchar(16)",
                  isUnique: true,
                  isNullable: false,
               },

               {
                  name: "anotherContacts",
                  type: "varchar(50)",
                  isNullable: true,
               },

               {
                  name: "url",
                  type: "varchar(255)",
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
                  name: "avatar",
                  type: "varchar(255)",
                  isNullable: true,
               },

               {
                  name: "password",
                  type: "varchar(255)",
                  isNullable: false,
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("artists");
   }
}
