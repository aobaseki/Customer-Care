import { Model } from '@nozbe/watermelondb';
import {field, date, children, readonly} from '@nozbe/watermelondb/decorators';
import auditSchema from "./auditSchema";
import { Q } from '@nozbe/watermelondb';

export default class Audits extends Model {
    static table = 'audits';
    static deletable = false;

    static associations = {
        audit_entries: { type: 'has_many', key: 'auditId' },
    };

    static displayColumn = 'id';

    @field('branchId') branchId;
    @field('createdBy') createdBy;
    @children('auditEntries') audit_entries;
    @field('status') status;
    @field('isActive') isActive;
    @field('auditDate') auditDate;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    auditEntries = this.collections
        .get('audit_entries')
        .query(Q.where('auditId' , this.id));

    static columns = auditSchema.columns.map(c => c.name);
}
