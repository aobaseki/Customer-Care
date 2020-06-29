
const branchPurchasesSchema = {
    name: 'branch_purchases',
    columns: [
        { name: 'branchProductStockId', type: 'string' },
        { name: 'branchId', type: 'string' },
        { name: 'amount', type: 'number' },
        { name: 'createdBy', type: 'string' },
        { name: 'paymentSource', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ]
};

export default branchPurchasesSchema;
