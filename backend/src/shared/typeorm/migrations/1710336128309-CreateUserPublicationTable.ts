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
                  name: "userId",
                  type: "uuid",
                  isNullable: false,
               },

               {
                  name: "available",
                  type: "boolean",
                  default: true
                  
               },

               {
                  name: "hiredArtist",
                  type: "uuid",
                  isNullable: true
               },
               {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
               },
            ],

            foreignKeys: [
               {
                  name: "usersId",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["userId"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
               },

               {
                  name: "artistId",
                  referencedTableName: "artists",
                  referencedColumnNames: ["id"],
                  columnNames: ["hiredArtist"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE"
               }
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users_publication");
   }
}
