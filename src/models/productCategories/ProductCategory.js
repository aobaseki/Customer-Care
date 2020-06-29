import { Model } from '@nozbe/watermelondb'
import {field, date, children, relation} from '@nozbe/watermelondb/decorators';
import productSchema from "../products/productSchema";

export default class ProductCategories extends Model {
  static table = 'product_categories';
  static deletable = false;

  static associations = {
    products_categories: { type: 'belongs_to', foreignKey: 'parentId' },
  };

  static displayColumn = 'name';

  static columns = productSchema.columns.map(c => c.name);

  @field('name') name;
  @field('parentId') number;
  @relation('product_categories', 'parentId') parentProductCategory;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @children('products') products;
}
