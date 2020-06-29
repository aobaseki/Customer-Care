import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, children, readonly} from '@nozbe/watermelondb/decorators';
import salesSchema from "./salesSchema";
import { Q } from '@nozbe/watermelondb';

export default class Sales extends Model {
    static table = 'sales';
    static deletable = false;

    static associations = {
        sale_entries: { type: 'has_many', key: 'saleId' },
        sale_installments: { type: 'has_many', key: 'saleId' },
        customers: {type: 'belongs_to' , key: 'customerId'},
    };

    static displayColumn = 'id';

    @relation('customers' , 'customerId') customer;
    @field('discount') discount;
    @text('type') type;
    @field('note') note;
    @field('branchId') branchId;
    @field('paymentType') paymentType;
    @field('customerId') customerId;
    @field('createdBy') createdBy;
    @field('salesDate') salesDate;
    @field('receiptNumber') receiptNumber;
    @children('sale_entries') sale_entries;
    @children('sale_installments') sale_installments;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    salesEntries(){
        return this.collections.get('sale_entries')
            .query(
                Q.where('saleId', this.id)
            ).fetch();
    }

    static columns = salesSchema.columns.map(c => c.name);
}
