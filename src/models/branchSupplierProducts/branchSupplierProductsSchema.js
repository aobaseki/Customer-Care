const branchSupplierProductsSchema = {
    name: 'branch_supplier_products',
    columns : [
        { name: 'branchProductId', type: 'string' },
        { name: 'productId', type: 'string' },
        { name: 'branchSupplierId', type: 'string' },
        { name: 'branchId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'created_at' , type: 'number'},
        { name: 'updated_at' , type: 'number'}
    ]
};

export default branchSupplierProductsSchema;
