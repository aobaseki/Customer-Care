const cashflowCategorySchema = {
    name: 'cashflow_categories',
    columns: [
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ]
};

export default cashflowCategorySchema;
