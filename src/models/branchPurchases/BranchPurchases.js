import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';
import branchPurchasesSchema from "./purchaseSchema";

export default class BranchPurchases extends Model {
    static table = 'branch_purchases';
    static deletable = false;

    static associations = {
        branches_products_stocks: { type: 'belongs_to', key: 'branchProductStockId' },
    };

    @field('branchProductStockId') branchProductStockId;
    @field('branchId') branchId;
    @field('amount') amount;
    @field('createdBy') createdBy;
    @relation('branches_products_stocks', 'branchProductStockId') branchProductStock;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = branchPurchasesSchema.columns.map(c => c.name);

}
