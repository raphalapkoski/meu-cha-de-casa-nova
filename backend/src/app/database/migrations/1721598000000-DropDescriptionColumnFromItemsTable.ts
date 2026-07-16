import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropDescriptionColumnFromItemsTable1721598000000
  implements MigrationInterface
{
  name = 'DropDescriptionColumnFromItemsTable1721598000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('items', 'description');
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        length: '1000',
      }),
    );
  }
}
