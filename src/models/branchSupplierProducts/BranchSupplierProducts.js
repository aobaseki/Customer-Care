import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, readonly, children} from '@nozbe/watermelondb/decorators';
import branchSupplierProductsSchema from './branchSupplierProductsSchema';

export default class BranchSupplierProducts extends Model {
    static table = 'branch_supplier_products';
    static deletable = true;

    static associations = {
        branches_products: { type: 'belongs_to', key: 'branchProductId' },
        products: { type: 'belongs_to', key: 'productId' },
    };

    static displayColumn = 'id';

    @field('branchProductId') branchProductId;
    @field('branchSupplierId') branchSupplierId;
    @field('productId') productId;
    @field('branchId') branchId;
    @field('createdBy') createdBy;
    @relation('branches_products', 'branchProductId') branchProduct;
    @relation('products', 'productId') product;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = branchSupplierProductsSchema.columns.map(c => c.name);

}
