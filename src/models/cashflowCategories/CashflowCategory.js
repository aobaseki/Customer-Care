import { Model } from '@nozbe/watermelondb'
import {field, children, date} from '@nozbe/watermelondb/decorators';
import cashflowCategorySchema from "./cashflowCategorySchema";

export default class CashflowCategory extends Model {
    static table = 'cashflow_categories';
    static deletable = false;


    static displayColumn = 'name';

    @field('name') name;
    @field('type') type;
    @field('createdBy') createdBy;
    @field('status') status;
    @date('created_at') createdAt;
    @date('updated_at') updatedAt;

    static columns = cashflowCategorySchema.columns.map(c => c.name);
}
