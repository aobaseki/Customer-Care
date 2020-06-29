const productSchema = {
  name: 'products',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string', isOptional: true },
    { name: 'measurementUnit', type: 'string', isOptional: true },
    { name: 'barCode', type: 'string' },
    { name: 'manufacturerId', type: 'string' },
    { name: 'brandId', type: 'string' },
    { name: 'image', type: 'string' },
    { name: 'productCategoryId', type: 'string' },
    {name: 'created_at' , type: 'number'},
    {name: 'updated_at' , type: 'number'}
  ]
};

export default productSchema;
