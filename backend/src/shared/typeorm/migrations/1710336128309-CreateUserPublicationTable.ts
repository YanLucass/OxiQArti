import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserPublicationTable1710336128309 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "users_publication",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },
               {
                  name: "title",
                  type: "varchar(100)",
                  isNullable: true,
               },

               {
                  name: "description",
                  type: "text",
                  isNullable: false,
               },
               {
                  name: "service",
                  type: "varchar(80)",
                  isNullable: false,
               },

               {
                  name: "user_id",
                  type: "uuid",
                  isNullable: false,
               },
            ],

            foreignKeys: [
               {
                  name: "users_id",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["user_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users_publication");
   }
}
