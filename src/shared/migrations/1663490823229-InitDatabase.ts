import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1663490823229 implements MigrationInterface {
  name = 'InitDatabase1663490823229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."Currency" AS ENUM(
                'EUR',
                'DOLLAR',
                'GBP',
                'CHF',
                'TRY',
                'RUB',
                'UAH',
                'PHP'
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."Unit" AS ENUM('kWh', 'Mwh', 'm3', 'liter')
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."ContractType" AS ENUM('ELECTRICITY', 'GAS', 'WATER_COLD', 'WATER_WARM')
        `);
    await queryRunner.query(`
            CREATE TABLE "Contract" (
                "contractId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "currency" "public"."Currency" NOT NULL,
                "unit" "public"."Unit" NOT NULL,
                "contractType" "public"."ContractType" NOT NULL,
                "priceInCents" numeric(10, 4) NOT NULL,
                "termEnd" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "locationCountryCode" text,
                "locationRegionCode" text,
                CONSTRAINT "PK_c06d84183e9fb493db369191b18" PRIMARY KEY ("contractId")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Location" (
                "countryCode" text NOT NULL,
                "regionCode" text NOT NULL,
                "country" text NOT NULL,
                "regionName" text NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6b939a3a378f93b06c80aec402e" PRIMARY KEY ("countryCode", "regionCode")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "Contract"
            ADD CONSTRAINT "FK_bb91a20fdc83faf41b0beaed973" FOREIGN KEY ("locationCountryCode", "locationRegionCode") REFERENCES "Location"("countryCode", "regionCode") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Contract" DROP CONSTRAINT "FK_bb91a20fdc83faf41b0beaed973"
        `);
    await queryRunner.query(`
            DROP TABLE "Location"
        `);
    await queryRunner.query(`
            DROP TABLE "Contract"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."ContractType"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Unit"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Currency"
        `);
  }
}
