import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, readonly, children} from '@nozbe/watermelondb/decorators';
import branchSuppliersSchema from './branchSuppliersSchema';
import * as Q from "@nozbe/watermelondb/QueryDescription";
import LocalInfo from "../../services/LocalInfo";

export default class BranchSuppliers extends Model {
    static table = 'branch_suppliers';
    static deletable = true;

    /*static associations = {

    };*/

    static displayColumn = 'id';

    @field('entityId') entityId;
    @field('entityType') entityType;
    @field('name') name;
    @field('contact') contact;
    @field('deliveryDays') deliveryDays;
    @field('branchId') branchId;
    @field('createdBy') createdBy;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    orders() {
        return this.collections.get('branch_supplier_orders')
            .query(
                Q.where('branchSupplierId', this.id),
                Q.where('branchId' , LocalInfo.branchId)
            ).fetch();
    }

    payments() {
        return this.collections.get('branch_supplier_order_payment_installments')
            .query(
                Q.where('branchSupplierId', this.id),
                Q.where('branchId' , LocalInfo.branchId)
            ).fetch();
    }

    static columns = branchSuppliersSchema.columns.map(c => c.name);

}
