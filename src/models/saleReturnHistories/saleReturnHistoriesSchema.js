const saleReturnHistoriesSchema = {
    name: 'sale_return_histories',
    columns: [
        { name: 'saleId', type: 'string' },
        { name: 'branchProductId', type: 'string' },
        { name: 'branchId', type: 'string' },
        { name: 'productId', type: 'number' },
        { name: 'quantity', type: 'string' },
        { name: 'returnDate', type: 'number' },
        { name: 'createdBy', type: 'string' },
        {name: 'created_at' , type: 'number'},
        {name: 'updated_at' , type: 'number'}
    ]
};

export default saleReturnHistoriesSchema;
