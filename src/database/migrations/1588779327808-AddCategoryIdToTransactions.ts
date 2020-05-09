import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AddCategoryIdToTransactions1588779327808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'transactions',
            new TableColumn({
                name: 'category_id',
                type: 'uuid',
                isNullable: false,
            }),        
        );

        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                name: 'TransactionCategory',
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

        await queryRunner.dropColumn('transactions', 'category');
    }

}
