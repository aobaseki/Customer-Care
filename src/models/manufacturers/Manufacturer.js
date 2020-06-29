import { Model } from '@nozbe/watermelondb'
import {field, children, date} from '@nozbe/watermelondb/decorators';
import productSchema from "../products/productSchema";

export default class Manufacturer extends Model {
  static table = 'manufacturers';
  static deletable = false;

  static associations = {
    products: { type: 'has_many', foreignKey: 'manufacturerId' },
  };

  static displayColumn = 'name';

  static columns = productSchema.columns.map(c => c.name);

  @field('name') name;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @children('products') products;
}
