import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, readonly, children} from '@nozbe/watermelondb/decorators';
import branchSupplierStockSchema from './branchSupplerStockSchema';

export default class BranchSupplierStock extends Model {
    static table = 'branch_supplier_stocks';
    static deletable = true;

    static associations = {
        branches_products_stocks: { type: 'belongs_to', key: 'branchProductStockId' },
    };

    static displayColumn = 'id';

    @field('branchProductStockId') branchProductStockId;
    @field('branchId') branchId;
    @field('createdBy') createdBy;
    @relation('branches_products_stocks', 'branchProductStockId') branchProductStock;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = branchSupplierStockSchema.columns.map(c => c.name);

}
