import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1599479653107 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
		await queryRunner.createTable(new Table({
			name: "users",
			columns: [
				{
					name: "id",
					type: "uuid",
					isPrimary: true,
					generationStrategy: 'uuid',
					default: 'uuid_generate_v4()'
				},
				{
					name: "name",
					type: "varchar",
				},
				{
					name: 'email',
					type: 'varchar',
					isUnique: true
				},
				{
					name: 'password',
					type: 'varchar'
				},
				{
					name: 'verified',
					type: 'boolean',
					default: false
				},
				{
					name: "created_at",
					type: "timestamp with time zone",
					default: "timezone('utc'::text, now())"
				}
			]
		}), true);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
		await queryRunner.query('DROP EXTENSION "uuid-ossp');
	}
}
