import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateItemsTable1721065000000 implements MigrationInterface {
  name = 'CreateItemsTable1721065000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000',
          },
          {
            name: 'image',
            type: 'text',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'available'",
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
  }
}
