const branchSupplierOrderPaymentInstallmentSchema = {
    name: 'branch_supplier_order_payment_installments',
    columns : [
        { name: 'amount', type: 'number' },
        { name: 'branchSupplierOrderId', type: 'string' },
        { name: 'branchSupplierId', type: 'string' },
        { name: 'branchSupplierSalespersonId', type: 'string' },
        { name: 'branchId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'created_at' , type: 'number'},
        { name: 'updated_at' , type: 'number'}
    ]
};

export default branchSupplierOrderPaymentInstallmentSchema;
