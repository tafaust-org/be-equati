import { MigrationInterface, QueryRunner } from "typeorm";

export class ContractTermEndNullable1665257375969 implements MigrationInterface {
    name = 'ContractTermEndNullable1665257375969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Contract"
            ALTER COLUMN "termEnd" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Contract"
            ALTER COLUMN "termEnd"
            SET NOT NULL
        `);
    }

}
