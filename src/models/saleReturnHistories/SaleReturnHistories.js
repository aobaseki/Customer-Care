import { Model } from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import saleReturnHistoriesSchema from './saleReturnHistoriesSchema';

export default class SaleReturnHistories extends Model {
    static table = 'sale_return_histories';
    static deletable = false;

    static associations = {
        sales: { type: 'belongs_to' , key: 'saleId'},
        branches_products: { type: 'belongs_to', key: 'branchProductId' },
    };

    static displayColumn = 'id';

    @field('saleId') saleId;
    @field('branchProductId') branchProductId;
    @field('branchId') branchId;
    @field('productId') productId;
    @field('createdBy') createdBy;
    @field('quantity') quantity;
    @field('returnDate') returnDate;
    @relation('sales', 'saleId') sale;
    @relation('branches_products', 'branchProductId') branchProduct;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = saleReturnHistoriesSchema.columns.map(c => c.name);
}
