import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, readonly, children} from '@nozbe/watermelondb/decorators';
import branchSupplierOrderPaymentInstallmentSchema from './branchSupplierOrderPaymentInstallmentSchema';

export default class BranchSupplierOrderPaymentInstallment extends Model {
    static table = 'branch_supplier_order_payment_installments';
    static deletable = true;

    static associations = {
        branch_supplier_orders: { type: 'belongs_to', key: 'branchSupplierOrderId' },
        branch_suppliers: { type: 'belongs_to', key: 'branchSupplierId' },
        branch_supplier_salespersons: { type: 'belongs_to', key: 'branchSupplierSalespersonId' },
    };

    static displayColumn = 'id';

    @field('branchSupplierOrderId') branchSupplierOrderId;
    @field('branchSupplierId') branchSupplierId;
    @field('branchSupplierSalespersonId') branchSupplierSalespersonId;
    @field('branchId') branchId;
    @field('amount') amount;
    @field('createdBy') createdBy;
    @relation('branch_supplier_orders', 'branchSupplierOrderId') order;
    @relation('branch_suppliers', 'branchSupplierId') supplier;
    @relation('branch_supplier_salespersons', 'branchSupplierSalespersonId') salesperson;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = branchSupplierOrderPaymentInstallmentSchema.columns.map(c => c.name);

}
