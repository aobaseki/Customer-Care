import { Model } from '@nozbe/watermelondb';
import { field, date, children, readonly, relation} from '@nozbe/watermelondb/decorators';
import * as Q from "@nozbe/watermelondb/QueryDescription";
import branchProductSchema from "./branchProductSchema";
import LocalInfo from "../../services/LocalInfo";

export default class BranchProduct extends Model {
  static table = 'branches_products';
  static deletable = false;

  static associations = {
    product: { type: 'belongs_to', key: 'productId' },
    branches_products_stocks: { type: 'has_many' , foreignKey: 'branchProductId' },
    branches_products_stock_movements: { type: 'has_many' , foreignKey: 'branchProductId' },
    saleEntries: { type: 'has_many' , foreignKey: 'branchProductId' },
    cartEntries: { type: 'has_many' , foreignKey: 'branchProductId' },
    branches_products_stocks_histories: { type: 'has_many' , foreignKey: 'branchProductId' }
  };

  /*
  * @todo add branchStockId to branch stock model
  * */

  @field('branchId') branchId;
  @field('productId') productId;
  @field('lowestStock') lowestStock;
  @field('sellingPrice') sellingPrice;
  @children('branches_products_stocks') stock;
  @children('sale_entries') sale_entries;
  @children('cart_entries') cart_entries;
  @children('branches_products_stock_movements') stock_movements;
  @children('branches_products_stocks_histories') history;
  @relation('products', 'productId') product;
  //@relation('users', 'createdBy') createdBy;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;

  async products() {
    return this.collections.get('products')
      .query(Q.where('id', this.productId)).fetch();
  }

  stocks() {
    return this.collections.get('branches_products_stocks')
        .query(Q.where('productId' , this.productId)).fetch();
  }

  saleEntries() {
    return this.collections.get('sale_entries')
        .query(Q.where('branchProductId' , this.id)
        ).fetch();
  }

  cartEntries() {
    return this.collections.get('cart_entries')
        .query(Q.where('branchProductId' , this.id)
        ).fetch();
  }

  stockMovements() {
    return this.collections.get('branches_products_stock_movements')
        .query(Q.where('branchProductId' , this.id),
            Q.where('branchFrom' , LocalInfo.branchId))
        .fetch();
  }

  history() {
      return this.collections.get('branches_products_stocks_histories')
          .query(Q.where('productId' , this.productId)).fetch();
  }

  /*
  * @todo add product id to history
  * */

  static columns = branchProductSchema.columns.map(c => c.name);

}
