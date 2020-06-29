const branchSupplierStockSchema = {
    name: 'branch_supplier_stocks',
    columns : [
        { name: 'branchProductStockId', type: 'string' },
        { name: 'branchId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'created_at' , type: 'number'},
        { name: 'updated_at' , type: 'number'}
    ]
};

export default branchSupplierStockSchema;
