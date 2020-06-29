const cashflowSchema = {
    name: 'cashflows',
    columns: [
        { name: 'amount', type: 'number' },
        { name: 'type', type: 'string' },
        { name: 'categoryId', type: 'string' },
        { name: 'branchId', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'statusChangedBy', type: 'string' },
        { name: 'dateAdded', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'username' , type: 'string' },
    ]
};

export default cashflowSchema;
