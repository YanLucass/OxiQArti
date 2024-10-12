import { MigrationInterface, QueryRunner, Table } from "typeorm";
export class CreateArtistTable1725578970608 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "artist-table",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artist-table");
    }
}

