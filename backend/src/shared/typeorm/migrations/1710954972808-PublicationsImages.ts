import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PublicationsImages1710954972808 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "publicationsImages",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },

               {
                  name: "nameImage",
                  type: "varchar(255)",
                  isNullable: false,
               },

               {
                  name: "publicationId",
                  type: "uuid",
                  isNullable: false,
               },

               {
                  name: "userId",
                  type: "uuid",
                  isNullable: true,
               },


               {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
               },
            ],

            foreignKeys: [
               {
                  name: "userPublicationId",
                  referencedTableName: "users_publication",
                  referencedColumnNames: ["id"],
                  columnNames: ["publicationId"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
               },
    

               {
                  name: "userId",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["userId"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
               }
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("publicationsImages");
   }
}
