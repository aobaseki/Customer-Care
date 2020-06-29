import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';
import branchSupplierOrderSchema from "./branchSupplierOrderSchema";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import LocalInfo from "../../services/LocalInfo";

export default class BranchSupplierOrder extends Model {
    static table = 'branch_supplier_orders';
    static deletable = false;

    /*
    * @todo add branch product relation here
    * */
    static associations = {
        branch_supplier_salespersons: { type: 'belongs_to', key: 'salespersonId' },
        branch_suppliers: { type: 'belongs_to', key: 'branchSupplierId' },
    };

    @field('salespersonId') salespersonId;
    @field('branchId') branchId;
    @field('orderDate') orderDate;
    @field('branchSupplierId') branchSupplierId;
    @field('createdBy') createdBy;
    @relation('branch_supplier_salespersons', 'salespersonId') salesperson;
    @relation('branch_suppliers', 'branchSupplierId') branchSupplier;


    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;


    stocks() {
        return this.collections.get('branches_products_stocks')
            .query(
                Q.where('branchSupplierOrderId', this.id),
                Q.where('branchId' , LocalInfo.branchId)
            ).fetch();
    }

    payments() {
        return this.collections.get('branch_supplier_order_payment_installments')
            .query(
                Q.where('branchSupplierOrderId', this.id)
            ).fetch();
    }

    static columns = branchSupplierOrderSchema.columns.map(c => c.name);

}
