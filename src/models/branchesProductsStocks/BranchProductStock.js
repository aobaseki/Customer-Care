import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';
import branchProductStockSchema from "./branchProductStockSchema";

export default class BranchProductStock extends Model {
  static table = 'branches_products_stocks';
  static deletable = false;

  /*
  * @todo add branch product relation here
  * */
  static associations = {
    branches_products: { type: 'belongs_to', key: 'branchProductId' },
    products: { type: 'belongs_to', key: 'productId' },
  };

  @field('branchProductId') branchProductId;
  @field('branchId') branchId;
  @field('productId') productId;
  @field('branchSupplierOrderId') branchSupplierOrderId;
  @field('quantity') quantity;
  @field('type') type;
  @field('stockDate') stockDate;
  @field('costPrice') costPrice;
  @field('createdBy') createdBy;
  @relation('products', 'productId') product;
  @relation('branches_products', 'branchProductId') branchProduct;
/*
  @relation('branches_products', 'branchProductId') branchProduct;
*/
  //@relation('users', 'createdBy') createdBy;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;

  static columns = branchProductStockSchema.columns.map(c => c.name);

}
