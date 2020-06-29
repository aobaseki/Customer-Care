const salesSchema = {
    name: 'sales',
    columns: [
        { name: 'note', type: 'string', isOptional: true },
        { name: 'type', type: 'string' },
        //{ name: 'paymentStatus', type: 'string' },
        { name: 'paymentType', type: 'string' },
        { name: 'customerId', type: 'string' },
        { name: 'discount', type: 'number' },
        { name: 'branchId', type: 'string' },
        { name: 'salesDate', type: 'number' },
        { name: 'receiptNumber', type: 'string' },
        { name: 'createdBy', type: 'string' },
        {name: 'created_at' , type: 'number'},
        {name: 'updated_at' , type: 'number'}
    ]
};

export default salesSchema;
