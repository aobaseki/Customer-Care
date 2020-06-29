const branchProductStockSchema = {
  name: 'branches_products_stocks',
  columns: [
    { name: 'branchProductId', type: 'string' },
    { name: 'branchId', type: 'string' },
    { name: 'productId', type: 'string' },
    { name: 'branchSupplierOrderId', type: 'string' , isOptional: true },
    { name: 'createdBy', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'stockDate', type: 'number' },
    { name: 'quantity', type: 'number' },
    { name: 'costPrice', type: 'number' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ]
};

export default branchProductStockSchema;
