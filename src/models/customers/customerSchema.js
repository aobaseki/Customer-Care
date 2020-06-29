const customerSchema = {
  name: 'customers',
  columns: [
    { name: 'firstName', type: 'string' },
    { name: 'otherNames', type: 'string' , isOptional: true },
    { name: 'email', type: 'string' , isOptional: true },
    { name: 'createdBy', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'location', type: 'string', isOptional: true },
    {name: 'created_at' , type: 'number'},
    {name: 'updated_at' , type: 'number'}
  ]
};

export default customerSchema;
