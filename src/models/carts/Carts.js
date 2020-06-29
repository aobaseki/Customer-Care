import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, readonly, children} from '@nozbe/watermelondb/decorators';
import cartsSchema from './cartsSchema';

export default class Carts extends Model {
    static table = 'carts';
    static deletable = true;

    static associations = {
        cartEntries: { type: 'has_many', key: 'cartId' },
        customer: {type: 'belongs_to' , key: 'customerId'},
    };

    static displayColumn = 'id';

    @relation('customers' , 'customerId') customer;
    @field('discount') discount;
    @field('branchId') branchId;
    @field('status') status;
    @field('cartDate') cartDate;
    @field('customerId') customerId;
    @field('createdBy') createdBy;
    @children('cart_entries') cart_entries;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = cartsSchema.columns.map(c => c.name);

}
