const auditEntriesSchema = {
    name: 'audit_entries',
    columns : [
        {name: 'productId', type: 'string'},
        {name: 'quantityCounted' , type: 'number'},
        {name: 'storeQuantity' , type: 'number'},
        {name: 'auditId' , type: 'string'},
        {name: 'branchId' , type: 'string'},
        {name: 'branchProductId' , type: 'string'},
        {name: 'sellingPrice', type: 'number'},
        {name: 'costPrice' , type: 'number'},
        {name: 'created_at' , type: 'number'},
        {name: 'updated_at' , type: 'number'}
    ]
};

export default auditEntriesSchema;
