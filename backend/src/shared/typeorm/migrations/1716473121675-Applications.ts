import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Applications1716473121675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "applications",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isNullable: false
                },

                {
                    name: "userPublicationId", 
                    type: "uuid",
                    isNullable: false
                },

                {
                    name: "userId",
                    type: "uuid",
                    isNullable: false
                },
            ],

            foreignKeys: [
                {
                    name: "userPublicationIdFk",
                    referencedTableName: "users_publication",
                    referencedColumnNames: ["id"],
                    columnNames: ["userPublicationId"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },

                {
                    name: "userIdFk",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["userId"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("applications");
    }

}


