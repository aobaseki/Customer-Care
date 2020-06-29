const branchProductSchema = {
  name: 'branches_products',
  columns: [
    { name: 'branchId', type: 'string' },
    { name: 'productId', type: 'string' },
    { name: 'lowestStock', type: 'number' },
    { name: 'sellingPrice', type: 'number' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ]
};

export default branchProductSchema;
