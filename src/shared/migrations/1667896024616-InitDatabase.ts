import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1667896024616 implements MigrationInterface {
    name = 'InitDatabase1667896024616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Game" (
                "gameId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "source" integer array NOT NULL,
                "target" integer NOT NULL,
                "possibleSolution" text array NOT NULL,
                "operations" text array NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a536cd3df8b2981719ca7eb955e" PRIMARY KEY ("gameId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "Game"
        `);
    }

}
