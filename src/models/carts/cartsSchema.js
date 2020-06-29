const cartsSchema = {
    name: 'carts',
    columns : [
        { name: 'customerId', type: 'string', isOptional: true },
        { name: 'discount', type: 'number' },
        { name: 'branchId', type: 'string' },
        { name: 'cartDate', type: 'number' },
        { name: 'status', type: 'string' },
        { name: 'createdBy', type: 'string' },
        {name: 'created_at' , type: 'number'},
        {name: 'updated_at' , type: 'number'}
    ]
};

export default cartsSchema;
