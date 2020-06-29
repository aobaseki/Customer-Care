import { Model } from '@nozbe/watermelondb'
import {field, children, date} from '@nozbe/watermelondb/decorators';
import cashflowSchema from "./cashflowSchema";

export default class Cashflow extends Model {
    static table = 'cashflows';
    static deletable = false;

    static associations = {
        cashflow_categories: { type: 'belongs_to', foreignKey: 'categoryId' },
    };

    static displayColumn = 'id';

    @field('type') type;
    @field('amount') amount;
    @field('username') username;
    @field('branchId') branchId;
    @field('categoryId') categoryId;
    @field('status') status;
    @field('createdBy') createdBy;
    @field('statusChangedBy') statusChangedBy;
    @field('dateAdded') dateAdded;
    @date('created_at') createdAt;
    @date('updated_at') updatedAt;
    @children('cashflow_categories') category;

    static columns = cashflowSchema.columns.map(c => c.name);
}
