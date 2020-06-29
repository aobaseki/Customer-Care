import { Model } from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import cartEntrySchema from './cartEntrySchema';

export default class CartEntry extends Model {
    static table = 'cart_entries';
    static deletable = true;

    static associations = {
        carts: { type: 'belongs_to' , key: 'cartId'},
        products: { type: 'belongs_to' , key: 'productId'},
        branches_products: { type: 'belongs_to' , key: 'branchProductId'},
    };

    static displayColumn = 'id';

    @relation('carts', 'cart_id') cart;
    @relation('products', 'productId') product;
    @relation('branches_products', 'branchProductId') branchProduct;
    @field('branchId') branchId;
    @field('cartId') cartId;
    @field('branchProductId') branchProductId;
    @field('productId') productId;
    @field('sellingPrice') sellingPrice;
    @field('costPrice') costPrice;
    @field('entryDate') entryDate;
    @field('discount') discount;
    @field('quantity') quantity;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = cartEntrySchema.columns.map(c => c.name);
}
