
const stockMovementSchema = {
    name: 'branches_products_stock_movements',
    columns: [
        { name: 'branchProductStockId', type: 'string' },
        { name: 'branchProductId', type: 'string' },
        { name: 'productId', type: 'string' },
        { name: 'branchFrom', type: 'string' },
        { name: 'branchTo', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'quantity', type: 'number' },
        { name: 'entryDate', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ]
};

export default stockMovementSchema;
