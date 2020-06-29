const branchSuppliersSchema = {
    name: 'branch_suppliers',
    columns : [
        { name: 'entityId', type: 'string' },
        { name: 'entityType', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'contact', type: 'string' },
        { name: 'branchId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'deliveryDays' , type: 'string' },
        { name: 'created_at' , type: 'number'},
        { name: 'updated_at' , type: 'number'}
    ]
};

export default branchSuppliersSchema;
