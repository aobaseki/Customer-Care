const branchSupplierOrderSchema = {
    name: 'branch_supplier_orders',
    columns: [
        { name: 'branchId', type: 'string' },
        { name: 'branchSupplierId', type: 'string' },
        { name: 'salespersonId', type: 'string' , isOptional: true },
        { name: 'createdBy', type: 'string' },
        { name: 'orderDate', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ]
};

export default branchSupplierOrderSchema;
