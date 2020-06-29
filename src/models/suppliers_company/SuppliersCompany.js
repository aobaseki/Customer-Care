import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, readonly, children} from '@nozbe/watermelondb/decorators';
import suppliersCompanySchema from './suppliersCompanySchema';

export default class SuppliersCompany extends Model {
    static table = 'suppliers_companies';
    static deletable = true;

    static displayColumn = 'id';

    @field('name') name;
    @field('contact') contact;
    @field('email') email;
    @field('isTemporary') isTemporary;
    @field('createdBy') createdBy;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = suppliersCompanySchema.columns.map(c => c.name);
}
