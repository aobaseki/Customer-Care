const branchSupplierSalespersonsSchema = {
    name: 'branch_supplier_salespersons',
    columns : [
        { name: 'name', type: 'string' },
        { name: 'contact', type: 'string' , isOptional: true },
        { name: 'branchId', type: 'string' },
        { name: 'branchSupplierId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'created_at' , type: 'number'},
        { name: 'updated_at' , type: 'number'}
    ]
};

export default branchSupplierSalespersonsSchema;
