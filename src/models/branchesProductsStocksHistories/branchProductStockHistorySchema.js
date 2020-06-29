
const branchProductStockHistorySchema = {
  name: 'branches_products_stocks_histories',
  columns: [
    { name: 'branchProductStockId', type: 'string' },
    { name: 'branchProductId', type: 'string' },
    { name: 'createdBy', type: 'string' },
    { name: 'stockDate', type: 'number' },
    { name: 'quantity', type: 'number' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ]
};

export default branchProductStockHistorySchema;
