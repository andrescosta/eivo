import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1741035071462 implements MigrationInterface {
    name = 'InitialSchema1741035071462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."application_type_enum" AS ENUM('Humain', 'IA')`);
        await queryRunner.query(`CREATE TABLE "application" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "description" character varying NOT NULL, "petiteImage" character varying NOT NULL, "grandeImage" character varying NOT NULL, "type" "public"."application_type_enum" NOT NULL, CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topique" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "locataireId" integer, "domaineId" integer, CONSTRAINT "PK_479ed81e6df2cc9c5e8cd4090e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locataire" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_7ea9ad289d5b7f7243bbe822226" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "domaine" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "description" character varying, "type" character varying, "locataireId" integer, CONSTRAINT "PK_7b1a38eea3de9532294e04e97c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topique_by_domain" ("id" SERIAL NOT NULL, "domainId" integer, "topiqueId" integer, CONSTRAINT "PK_6682cda5e7709e4deaa34c0fe13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classe" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "description" character varying, "domaineId" integer, CONSTRAINT "PK_f5164b0fb85545cd6d8e86b6b70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historique" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "membreId" integer, CONSTRAINT "PK_a3f568c26777290a99254aeb607" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."membre_role_enum" AS ENUM('ETUDIANT', 'PROFESSEUR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "membre" ("id" SERIAL NOT NULL, "role" "public"."membre_role_enum" NOT NULL, "utilisateurId" integer, "myclassId" integer, CONSTRAINT "PK_29f70347c7e5db7a98937c91a1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "utilisateur" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, CONSTRAINT "PK_838f0f99fe900e49ef050030443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activite" ("id" SERIAL NOT NULL, "applicationId" integer, "classeId" integer, CONSTRAINT "PK_c4f04c4217a4a990c0b0a762e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jeu" ("id" SERIAL NOT NULL, "nom" character varying NOT NULL, "description" character varying, "date" TIMESTAMP NOT NULL, "activiteId" integer, CONSTRAINT "PK_05a8630d3c361f8b8ee2a06cc33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topique_applications_application" ("topiqueId" integer NOT NULL, "applicationId" integer NOT NULL, CONSTRAINT "PK_cc5b21b39c4371effcb0275881b" PRIMARY KEY ("topiqueId", "applicationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ee15fdf3642a91188d9a50614" ON "topique_applications_application" ("topiqueId") `);
        await queryRunner.query(`CREATE INDEX "IDX_92071d496fb7754f9436ff5c45" ON "topique_applications_application" ("applicationId") `);
        await queryRunner.query(`ALTER TABLE "topique" ADD CONSTRAINT "FK_f68e2e89afb2f5e494bd49e3e47" FOREIGN KEY ("locataireId") REFERENCES "locataire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topique" ADD CONSTRAINT "FK_a239addd2d54152e604ea651c67" FOREIGN KEY ("domaineId") REFERENCES "domaine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "domaine" ADD CONSTRAINT "FK_46f320baba7b94f81f006147a29" FOREIGN KEY ("locataireId") REFERENCES "locataire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topique_by_domain" ADD CONSTRAINT "FK_cdc05d417d3ba0726963293140a" FOREIGN KEY ("domainId") REFERENCES "domaine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topique_by_domain" ADD CONSTRAINT "FK_8e06cfe3e1124cb45fc793d658b" FOREIGN KEY ("topiqueId") REFERENCES "topique"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classe" ADD CONSTRAINT "FK_6e6c756df99e3d996ee9b6611b1" FOREIGN KEY ("domaineId") REFERENCES "domaine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historique" ADD CONSTRAINT "FK_3797116f96d22ad83d2685e5b1e" FOREIGN KEY ("membreId") REFERENCES "membre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membre" ADD CONSTRAINT "FK_c068aed3405c351b6562543e112" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membre" ADD CONSTRAINT "FK_508a37ad48bc64fd20df6ee9e9c" FOREIGN KEY ("myclassId") REFERENCES "classe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activite" ADD CONSTRAINT "FK_dbd1fa98dfc741f7fb67dd483d0" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activite" ADD CONSTRAINT "FK_02584d4e5a44a14f4f0c39ffa3c" FOREIGN KEY ("classeId") REFERENCES "classe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jeu" ADD CONSTRAINT "FK_aabda85c51b4f9031be7bda13c8" FOREIGN KEY ("activiteId") REFERENCES "activite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topique_applications_application" ADD CONSTRAINT "FK_6ee15fdf3642a91188d9a506146" FOREIGN KEY ("topiqueId") REFERENCES "topique"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "topique_applications_application" ADD CONSTRAINT "FK_92071d496fb7754f9436ff5c451" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topique_applications_application" DROP CONSTRAINT "FK_92071d496fb7754f9436ff5c451"`);
        await queryRunner.query(`ALTER TABLE "topique_applications_application" DROP CONSTRAINT "FK_6ee15fdf3642a91188d9a506146"`);
        await queryRunner.query(`ALTER TABLE "jeu" DROP CONSTRAINT "FK_aabda85c51b4f9031be7bda13c8"`);
        await queryRunner.query(`ALTER TABLE "activite" DROP CONSTRAINT "FK_02584d4e5a44a14f4f0c39ffa3c"`);
        await queryRunner.query(`ALTER TABLE "activite" DROP CONSTRAINT "FK_dbd1fa98dfc741f7fb67dd483d0"`);
        await queryRunner.query(`ALTER TABLE "membre" DROP CONSTRAINT "FK_508a37ad48bc64fd20df6ee9e9c"`);
        await queryRunner.query(`ALTER TABLE "membre" DROP CONSTRAINT "FK_c068aed3405c351b6562543e112"`);
        await queryRunner.query(`ALTER TABLE "historique" DROP CONSTRAINT "FK_3797116f96d22ad83d2685e5b1e"`);
        await queryRunner.query(`ALTER TABLE "classe" DROP CONSTRAINT "FK_6e6c756df99e3d996ee9b6611b1"`);
        await queryRunner.query(`ALTER TABLE "topique_by_domain" DROP CONSTRAINT "FK_8e06cfe3e1124cb45fc793d658b"`);
        await queryRunner.query(`ALTER TABLE "topique_by_domain" DROP CONSTRAINT "FK_cdc05d417d3ba0726963293140a"`);
        await queryRunner.query(`ALTER TABLE "domaine" DROP CONSTRAINT "FK_46f320baba7b94f81f006147a29"`);
        await queryRunner.query(`ALTER TABLE "topique" DROP CONSTRAINT "FK_a239addd2d54152e604ea651c67"`);
        await queryRunner.query(`ALTER TABLE "topique" DROP CONSTRAINT "FK_f68e2e89afb2f5e494bd49e3e47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_92071d496fb7754f9436ff5c45"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ee15fdf3642a91188d9a50614"`);
        await queryRunner.query(`DROP TABLE "topique_applications_application"`);
        await queryRunner.query(`DROP TABLE "jeu"`);
        await queryRunner.query(`DROP TABLE "activite"`);
        await queryRunner.query(`DROP TABLE "utilisateur"`);
        await queryRunner.query(`DROP TABLE "membre"`);
        await queryRunner.query(`DROP TYPE "public"."membre_role_enum"`);
        await queryRunner.query(`DROP TABLE "historique"`);
        await queryRunner.query(`DROP TABLE "classe"`);
        await queryRunner.query(`DROP TABLE "topique_by_domain"`);
        await queryRunner.query(`DROP TABLE "domaine"`);
        await queryRunner.query(`DROP TABLE "locataire"`);
        await queryRunner.query(`DROP TABLE "topique"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP TYPE "public"."application_type_enum"`);
    }

}
