const manufacturerSchema = {
  name: 'manufacturers',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'createdBy', type: 'string' },
    {name: 'created_at' , type: 'number'},
    {name: 'updated_at' , type: 'number'}
  ]
};

export default manufacturerSchema;
