import { Model } from '@nozbe/watermelondb';
import { field, date, text, relation} from '@nozbe/watermelondb/decorators';
import * as Q from "@nozbe/watermelondb/QueryDescription";
import productSchema from "./productSchema";

export default class Product extends Model {
  static table = 'products';
  static deletable = false;

  static associations = {
    brands: { type: 'belongs_to', key: 'brandId' },
    product_categories: { type: 'belongs_to', key: 'productCategoryId' },
    manufacturers: { type: 'belongs_to', key: 'manufacturerId' },
  };

  static displayColumn = 'name';

  @field('name') name;
  @text('description') description;
  @field('measurementUnit') measurementUnit;
  @field('barCode') barCode;
  @field('manufacturerId') manufacturerId;
  @field('brandId') brandId;
  @field('image') image;
  @field('productCategoryId') productCategoryId;
  @relation('brands', 'brandId') brand;
  @relation('product_categories', 'productCategoryId') productCategory;
  @relation('manufacturers', 'manufacturerId') manufacturer;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;

  static columns = productSchema.columns.map(c => c.name);

  async stocks(branchId) {
    return this.collections
      .get('branches_products_stocks')
      .query(Q.where('productId', this.id), Q.where('branchId', branchId));
  }
}
