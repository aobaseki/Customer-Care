import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, readonly, children} from '@nozbe/watermelondb/decorators';
import branchSupplierSalespersonsSchema from './branchSupplierSalespersonsSchema';

export default class BranchSupplierSalespersons extends Model {
    static table = 'branch_supplier_salespersons';
    static deletable = true;

    static associations = {
        branch_suppliers: { type: 'belongs_to', key: 'branchSuppliersId' },
    };

    static displayColumn = 'id';

    @field('branchSupplierId') branchSupplierId;
    @field('name') name;
    @field('contact') contact;
    @field('branchId') branchId;
    @field('createdBy') createdBy;
    @relation('branch_suppliers', 'branchSupplierId') branchProductStock;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = branchSupplierSalespersonsSchema.columns.map(c => c.name);

}
