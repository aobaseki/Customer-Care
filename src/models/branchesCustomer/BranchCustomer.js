import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';
import branchCustomerSchema from "../branchesCustomer/branchCustomerSchema";

export default class BranchCustomer extends Model {
    static table = 'branches_customers';
    static deletable = false;

    static associations = {
        customers: { type: 'belongs_to', key: 'customerId' },
        users: { type: 'belongs_to', key: 'createdBy' },
    };

    @field('branchId') branchId;
    @field('customerId') customerId;
    @field('createdBy') createdBy;
    @relation('customers', 'customerId') customer;
    @relation('branch', 'branchId') branch;
    @relation('users', 'createdBy') userCreated;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = branchCustomerSchema.columns.map(c => c.name);

}
