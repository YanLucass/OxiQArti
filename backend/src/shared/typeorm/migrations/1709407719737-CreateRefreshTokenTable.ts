import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshTokenTable1708795878871 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "refresh_token",
            columns: [
               {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
               },

               {
                  name: "user_id",
                  type: "uuid",
                  isNullable: true,
               },

               {
                  name: "artist_id",
                  type: "uuid",
                  isNullable: true,
               },

               {
                  name: "refreshToken",
                  type: "varchar(255)",
                  isUnique: true,
               },

               {
                  name: "valid",
                  type: "boolean",
                  default: true,
               },
               {
                  name: "expires",
                  type: "timestamp",
               },

               {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
               },
            ],

            foreignKeys: [
               {
                  name: "RefreshTokenUsers",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["user_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
               },

               {
                  name: "RefreshTokenArtists",
                  referencedTableName: "artists",
                  referencedColumnNames: ["id"],
                  columnNames: ["artist_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
               },
            ],
         }),
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("refresh_token");
   }
}
