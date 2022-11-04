import { MigrationInterface, QueryRunner } from "typeorm";

export class DateContextBoundColumnsToTimestamptz1666448885631 implements MigrationInterface {
    name = 'DateContextBoundColumnsToTimestamptz1666448885631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Contract" DROP COLUMN "termEnd"
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract"
            ADD "termEnd" TIMESTAMP WITH TIME ZONE
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "Location" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "Location"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "Location" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "Location"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Location" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "Location"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "Location" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "Location"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract" DROP COLUMN "termEnd"
        `);
        await queryRunner.query(`
            ALTER TABLE "Contract"
            ADD "termEnd" integer
        `);
    }

}
