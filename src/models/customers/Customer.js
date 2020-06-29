import { Model } from '@nozbe/watermelondb'
import {field, date} from '@nozbe/watermelondb/decorators';
import customerSchema from "./customerSchema";

export default class Customer extends Model {
  static table = 'customers';
  static deletable = false;

  static displayColumn = 'name';

  static columns = customerSchema.columns.map(c => c.name);

  @field('firstName') firstName;
  @field('otherNames') otherNames;
  @field('phone') phone; // @todo use phone number on both api and client as search key
  @field('location') location;
  @field('email') email;
  @field('createdBy') createdBy;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
