const suppliersCompanySchema = {
    name: 'suppliers_companies',
    columns : [
        { name: 'name', type: 'string' },
        { name: 'contact', type: 'string' },
        { name: 'email', type: 'string', isOptional: true },
        { name: 'isTemporary', type: 'boolean' },
        { name: 'createdBy', type: 'string' },
        { name: 'created_at' , type: 'number'},
        { name: 'updated_at' , type: 'number'}
    ]
};

export default suppliersCompanySchema;
