import { Model } from '@nozbe/watermelondb'
import {field, children, date} from '@nozbe/watermelondb/decorators';
import brandSchema from "./brandSchema";

export default class Brand extends Model {
  static table = 'brands';
  static deletable = false;

  static associations = {
    products: { type: 'has_many', foreignKey: 'brandId' },
  };

  static displayColumn = 'name';

  static columns = brandSchema.columns.map(c => c.name);

  @field('name') name;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @children('products') products;
}
