import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCalenderTaskEntity1712737349375 implements MigrationInterface {
    name = 'CreateCalenderTaskEntity1712737349375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`calender_task_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`startDate\` datetime NULL, \`endDate\` datetime NULL, \`status\` enum ('pending', 'completed') NOT NULL DEFAULT 'pending', \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedOn\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`calender_task_entity\``);
    }

}
