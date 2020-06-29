import {
  schemaMigrations,
  // addColumns,
  createTable
} from "@nozbe/watermelondb/Schema/migrations";
import customerSchema from "./customers/customerSchema";
import salesSchema from "./sales/salesSchema";
import cartsSchema from "./carts/cartsSchema";
import cartEntrySchema from "./cartEntry/cartEntrySchema";
import saleEntrySchema from "./saleEntry/saleEntriesSchema";
import branchCustomerSchema from "./branchesCustomer/branchCustomerSchema";
import saleInstallmentSchema from "./saleInstallments/saleInstallmentSchema";
import purchaseSchema from "./branchPurchases/purchaseSchema";
import stockMovementSchema from "./stockMovements/stockMovementSchema";
import auditSchema from "./audit/auditSchema";
import auditEntriesSchema from "./auditEntry/auditEntriesSchema";
import stockReturnHistoriesSchema from "./stockReturnHistories/stockReturnHistoriesSchema";
import saleReturnHistoriesSchema from "./saleReturnHistories/saleReturnHistoriesSchema";

/*import suppliersCompanySchema from "./suppliers_company/suppliersCompanySchema";
import branchSuppliersSchema from "./branchSuppliers/branchSuppliersSchema";
import branchSupplierProductSchema from "./branchSupplierProducts/branchSupplierProductsSchema";
import branchSupplierSalespersonsSchema from "./branchSupplierSalespersons/branchSupplierSalespersonsSchema";
import branchSupplierOrderSchema from './branchSupplierOrder/branchSupplierOrderSchema';
import branchSupplierOrderPaymentInstallmentSchema from "./branchSupplierOrderPaymentInstallment/branchSupplierOrderPaymentInstallmentSchema";
import cashflowCategorySchema from "./cashflowCategories/cashflowCategorySchema";
import cashflowSchema from "./cashflow/cashflowSchema";*/

// latest migrations should be at the top entry level of the migrations array
export default schemaMigrations({
  migrations: [
    /*
      {
          toVersion: 13,
          steps: [
              createTable(cashflowCategorySchema),
              createTable(cashflowSchema),
          ]
      },
      {
          toVersion: 12,
          steps: [
              createTable(suppliersCompanySchema),
              createTable(branchSuppliersSchema),
              createTable(branchSupplierProductSchema),
              createTable(branchSupplierSalespersonsSchema),
              createTable(branchSupplierOrderSchema),
              createTable(branchSupplierOrderPaymentInstallmentSchema),
          ]
      },
    */

      {
          toVersion: 12,
          steps: [
              createTable(stockReturnHistoriesSchema),
              createTable(saleReturnHistoriesSchema),
          ]
      },
      {
          toVersion: 11,
          steps: [
              createTable(auditSchema),
              createTable(auditEntriesSchema),
          ]
      },
      {
          toVersion: 10,
          steps: [
              createTable(stockMovementSchema),
          ]
      },
      {
          toVersion: 9,
          steps: [
              createTable(purchaseSchema),
          ]
      },
      {
          toVersion: 8,
          steps: [
              createTable(saleInstallmentSchema),
          ]
      },
      {
          toVersion: 7,
          steps: [
              createTable(branchCustomerSchema),
          ]
      },
      {
          toVersion: 6,
          steps: [
              createTable(saleEntrySchema),
          ]
      },
      {
          toVersion: 5,
          steps: [
              createTable(cartEntrySchema),
          ]
      },
      {
          toVersion: 4,
          steps: [
              createTable(cartsSchema),
          ]
      },
      {
            toVersion: 3,
            steps: [
                createTable(salesSchema),
            ]
		},
		{
			toVersion: 2,
			steps: [
				createTable(customerSchema),
            ]
		},
	]
});



/*export default schemaMigrations({
  migrations: [
		{
			toVersion: 4,
			steps: [
				addColumns({
					table: 'sales',
					columns: [
						{ name: 'sales_total', type: 'number'},
					],
				})
			]
		},
  	{
		toVersion: 3,
		steps: [
			addColumns({
				table: 'sales',
				columns: [
					{ name: 'arrears', type: 'number'},
				],
			})
		]
	},{
		toVersion: 2,
		steps: [
			addColumns({
				table: 'sales',
				columns: [
					{ name: 'payment_status', type: 'string'},
				],
			}),
			createTable({
				name: 'installments',
				columns: [
					{ name: 'amount', type: 'number'},
					{ name: 'sale_id', type: 'string' },
          { name: 'company_id', type: 'string' },
					{ name: 'created_by', type: 'string' },
					{ name: 'created_at', type: 'number' },
					{ name: 'updated_at', type: 'number' },
				],
			}),
		],
	},
	]
});
*/
