import { Model } from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import saleInstallmentSchema from './saleInstallmentSchema';

export default class SaleInstallments extends Model {
    static table = 'sale_installments';
    static deletable = false;

    static associations = {
        sales: { type: 'belongs_to' , key: 'saleId'},
        customers: { type: 'belongs_to' , key: 'customerId'},
        //users: { type: 'belongs_to' , key: 'createdBy'}
    };

    static displayColumn = 'id';

    @field('saleId') saleId;
    @field('customerId') customerId;
    @field('branchId') branchId;
    @field('createdBy') createdBy;
    @field('type') type;
    @field('amount') amount;
    @relation('customers', 'customerId') customer;
    @relation('sales', 'saleId') sale;
    //@relation('users', 'createdBy') user;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = saleInstallmentSchema.columns.map(c => c.name);
}
