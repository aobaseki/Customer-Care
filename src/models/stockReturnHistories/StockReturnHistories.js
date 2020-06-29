import { Model } from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import stockReturnHistoriesSchema from './stockReturnHistoriesSchema';

export default class StockReturnHistories extends Model {
    static table = 'stock_return_histories';
    static deletable = false;

    static associations = {
        branches_products_stocks: { type: 'belongs_to' , key: 'branchProductStockId'},
        branches_products: { type: 'belongs_to', key: 'branchProductId' },
    };

    static displayColumn = 'id';

    @field('branchProductStockId') branchProductStockId;
    @field('branchProductId') branchProductId;
    @field('branchId') branchId;
    @field('productId') productId;
    @field('createdBy') createdBy;
    @field('quantity') quantity;
    @field('returnDate') returnDate;
    @relation('branches_products_stocks', 'branchProductStockId') branchStock;
    @relation('branches_products', 'branchProductId') branchProduct;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = stockReturnHistoriesSchema.columns.map(c => c.name);
}
