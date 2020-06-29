const branchCustomerSchema = {
    name: 'branches_customers',
    columns: [
        { name: 'branchId', type: 'string' },
        { name: 'customerId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ]
};

export default branchCustomerSchema;
