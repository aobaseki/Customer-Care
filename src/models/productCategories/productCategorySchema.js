const productCategorySchema = {
  name: 'product_categories',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'parentId', type: 'string' },
    {name: 'created_at' , type: 'number'},
    {name: 'updated_at' , type: 'number'}
  ]
};

export default productCategorySchema;
