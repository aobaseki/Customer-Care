import { Model } from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import auditEntrySchema from './auditEntriesSchema';

export default class AuditEntries extends Model {
    static table = 'audit_entries';
    static deletable = false;

    static associations = {
        audits: { type: 'belongs_to' , key: 'auditId'},
        branchProducts: { type: 'belongs_to' , key: 'branchProductId'},
        products: { type: 'belongs_to' , key: 'productId'}
    };

    static displayColumn = 'id';

    static columns = auditEntrySchema.columns.map(c => c.name);

    @relation('audits', 'auditId') audit;
    @relation('products', 'productId') product;
    @field('branchId') branchId;
    @field('branchProductId') branchProductId;
    @field('quantityCounted') quantityCounted;
    @field('storeQuantity') storeQuantity;
    @field('productId') productId;
    @field('auditId') auditId;
    @field('sellingPrice') sellingPrice;
    @field('costPrice') costPrice;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;
}
