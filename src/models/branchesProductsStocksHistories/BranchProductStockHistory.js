import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';
import branchProductStockHistorySchema from "./branchProductStockHistorySchema";

export default class BranchProductStockHistory extends Model {
  static table = 'branches_products_stocks_histories';
  static deletable = false;

  static associations = {
    branches_products_stocks: { type: 'belongs_to', key: 'branchProductStockId' },
    branches_products: { type: 'belongs_to', key: 'branchProductId' },
  };

  @field('branchProductStockId') branchProductStockId;
  @field('branchProductId') branchProductId;
  @field('quantity') quantity;
  @field('createdBy') createdBy;
  @field('stockDate') stockDate;
  @relation('branches_products' , 'branchProductId') branchProduct;
  @relation('branches_products_stocks', 'branchProductStockId') branchProductStock;
  //@relation('users', 'createdBy') createdBy;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;

  static columns = branchProductStockHistorySchema.columns.map(c => c.name);

}
