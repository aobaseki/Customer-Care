import { Model } from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import saleEntrySchema from './saleEntriesSchema';

export default class SaleEntries extends Model {
    static table = 'sale_entries';
    static deletable = false;

    static associations = {
        sales: { type: 'belongs_to' , key: 'saleId'},
        customers: { type: 'belongs_to' , key: 'customerId'},
        products: { type: 'belongs_to' , key: 'productId'}
    };

    static displayColumn = 'id';

    static columns = saleEntrySchema.columns.map(c => c.name);

    @relation('customers', 'customerId') customer;
    @relation('sales', 'saleId') sale;
    @relation('products', 'productId') product;
    @field('branchId') branchId;
    @field('branchProductId') branchProductId;
    @field('productId') productId;
    @field('saleId') saleId;
    @field('entryDate') entryDate;
    @field('sellingPrice') sellingPrice;
    @field('costPrice') costPrice;
    @field('discount') discount;
    @field('quantity') quantity;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;
}
