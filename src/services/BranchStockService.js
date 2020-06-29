import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import database from '../models/database';
import { Q } from '@nozbe/watermelondb'
import BranchProductService from "./BranchProductService";
import BranchProductStock from "../models/branchesProductsStocks/BranchProductStock";
import getUnixTime from "date-fns/getUnixTime";

export default class BranchStockService{
    constructor(){
        this.branchId = LocalInfo.branchId;
        this.companyId = LocalInfo.companyId;
    }

    async addStock(formFields){
        console.log(formFields)
        const stockColumns = {
            quantity: parseFloat(formFields.quantity),
            branchId: formFields.branchId,
            productId: formFields.productId,
            type: formFields.type,
            stockDate:  formFields.stockDate || getUnixTime(new Date(LocalInfo.workingDate)),
            branchProductId: formFields.branchProductId,
            costPrice: parseFloat(formFields.costPrice),
            createdBy: LocalInfo.userId,
        };

        try{
            const response = await new ModelAction('BranchProductStock').post(stockColumns);

            if(await BranchStockService.addStockHistory()){
                await BranchStockService.addPurchase(formFields);
                await BranchStockService.updateProduct(formFields);

                return true;
            }

            return false;
        } catch (e) {
            return false;
        }
    }

    async changeProductSellingPrice(formFields){
        try{
            const response = await new ModelAction('BranchProduct').update(formFields.branchProductId , {
                sellingPrice: parseFloat(formFields.sellingPrice)
            });

            return true;
        } catch (e) {
            return false;
        }
    }


    async addSupplierStock(formFields){
        const stockColumns = {
            quantity: parseFloat(formFields.quantity),
            branchId: formFields.branchId,
            productId: formFields.productId,
            type: formFields.type,
            stockDate:  getUnixTime(new Date(LocalInfo.workingDate)),
            branchSupplierOrderId: formFields.branchSupplierOrderId,
            branchProductId: formFields.branchProductId,
            costPrice: parseFloat(formFields.costPrice),
            createdBy: LocalInfo.userId,
        };

        try{
            const response = await new ModelAction('BranchProductStock').post(stockColumns);
            console.log(response)
            if(await BranchStockService.addStockHistory()){
                await BranchStockService.addPurchase(formFields);
                await BranchStockService.updateProduct(formFields);

                return true;
            }

            return false;
        } catch (e) {
            return false;
        }
    }

    /*
    * @var cartEntry
    * @var new quantity
    * @return new cartEntry
    * */
    async updateStockEntryDetails(stockEntry , quantity){
        //1. Check if quantity of product is valid
        //2. Update quantity of entry

        try {
            await new ModelAction('BranchProductStock').update(stockEntry.id , {
                quantity: parseFloat(quantity),
                branchId: stockEntry.branchId,
                productId: stockEntry.productId,
                type: stockEntry.type,
                branchSupplierOrderId: stockEntry.branchSupplierOrderId,
                branchProductId: stockEntry.branchProductId,
                costPrice: parseFloat(stockEntry.costPrice),
                createdBy: LocalInfo.userId,
            });

            return true;
        } catch (e) {
            return false;
        }
    }

    async moveStock(formFields){
        const response = await this.addStock(formFields);
        alert(await formFields.branchProductId[0].id)
        if(response){
            const lastStock = await BranchStockService.getLastStock(formFields.branchId);

            const stockMovementColumns = {
                quantity: parseFloat(formFields.quantity),
                branchId: formFields.moveTo,
                productId: formFields.productId,
                branchProductId: (await formFields.branchProductId[0].id),
                costPrice: parseFloat(formFields.costPrice),
                branchFrom: formFields.moveFrom,
                branchTo: formFields.moveTo,
                createdBy: LocalInfo.userId,
                branchProductStockId: lastStock.id,
            };

            try{
                const response = await new ModelAction('StockMovement').post(stockMovementColumns);

                return true;
            } catch (e) {
                return false;
            }

        }else{
            return false;
        }
    }

    static async getLastStock(branchId = LocalInfo.branchId){
        const lastStock = await new ModelAction('BranchProductStock').findByColumnNotObserve({
            name: 'branchId',
            value: branchId,
            fxn: 'eq',
        });

        return lastStock[lastStock.length - 1];
    }

    static async addStockHistory(){
        const lastStock = await BranchStockService.getLastStock();

        const historyColumns = {
            branchProductStockId: lastStock.id,
            quantity: lastStock.quantity,
            stockDate:  getUnixTime(new Date(LocalInfo.workingDate)),
            branchProductId: lastStock.branchProductId,
            createdBy: lastStock.createdBy,
        };

        try{
            await new ModelAction('BranchProductStockHistory').post(historyColumns);
            return true;
        } catch (e) {
            return false;
        }
    }

    static async addPurchase(formFields){
        const lastStock = await BranchStockService.getLastStock();

        const purchaseColumns = {
            branchProductStockId: lastStock.id,
            amount: lastStock.quantity * lastStock.costPrice,
            branchId: lastStock.branchId,
            createdBy: lastStock.createdBy,
            paymentSource: formFields.paymentSource,
        };

        try{
            await new ModelAction('BranchPurchases').post(purchaseColumns);
            return true;
        } catch (e) {
            return false;
        }
    }

    static async updateProduct(formFields){
        await new ModelAction('BranchProduct').update(formFields.branchProductId,{
            sellingPrice: parseFloat(formFields.sellingPrice)
        })
    }

    async getLastProductStock(productId){
        const dataCollection = await database.collections.get('branches_products_stocks');
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        const stock = await dataCollection.query(
            Q.where('productId' , productId),
            Q.where('branchId' , Q.oneOf(branches))
        ).fetch();

        return stock[stock.length - 1];
    }

    async getCompanyProductStock(productId){
        const dataCollection = await database.collections.get(BranchProductStock.table);
        const branches = (LocalInfo.branches).map(branch => branch.id);

        const stock = await dataCollection.query(
            Q.where('productId' , productId),
            Q.where('branchId' , Q.oneOf(branches))
        ).fetch();

        return stock;
    }

    async getProductStockQuantity(productId){
        return ((await this.getCompanyProductStock(productId))).reduce((a, b) => a + (b['quantity'] || 0), 0);
    }

    async getBranchStockQuantities(productId){
        const branches = LocalInfo.branches;
        const dataCollection = await database.collections.get('branches_products');

        const stocks = await this.getCompanyProductStock(productId);
        console.log(stocks)
        const response = branches.map((branch) => {
            const branchStock = stocks.filter(stock => stock.branchId === branch.id);
            console.log(branchStock)

            let branchProduct = dataCollection.query(
                Q.where('productId' , productId),
                Q.where('branchId' , branch.id)
            ).fetch();

            return {
                name: branch.name,
                quantity: (branchStock).reduce((a, b) => a + (b['quantity'] || 0), 0),
                id: branch.id,
                productId: productId,
                branchProductId: branchStock.length > 0 ? branchStock[branchStock.length - 1].branchProductId : null,
            }
        });
        console.log(response)
        return response;
    }

    static async getBranchProductQuantity(productId , branchId){
        const dataCollection = await database.collections.get('branches_products_stocks');

        const stock = await dataCollection.query(
            Q.where('productId' , productId),
            Q.where('branchId' , branchId)
        ).fetch();

    }

    async getCompanyItemsLeft(){
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        const companyStock = await new ModelAction('BranchProductStock').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companySaleEntries = await new ModelAction('SaleEntry').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companyStockMovement = await new ModelAction('StockMovement').findByColumnNotObserve({
            name: 'branchFrom',
            value: this.branchId,
            fxn: 'eq'
        });

        const stock = (companyStock).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const sales = (companySaleEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const stockMovement = (companyStockMovement).reduce((a, b) => a + (b['quantity'] || 0), 0);

        return parseFloat(stock - (sales + stockMovement));
    }

    async getLowStockItems(){
        const companyStock = await new ModelAction('BranchProductStock').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companySaleEntries = await new ModelAction('SaleEntry').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companyStockMovement = await new ModelAction('StockMovement').findByColumnNotObserve({
            name: 'branchFrom',
            value: this.branchId,
            fxn: 'eq'
        });

        const branchProducts = await new ModelAction('BranchProduct').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const outOfStock = branchProducts.filter((product) => {
            const stock = companyStock.filter((item) => item.productId === product.productId && item.branchId === this.branchId);
            const sales = companySaleEntries.filter((item) => item.productId === product.productId && item.branchId === this.branchId);
            const movement = companyStockMovement.filter((item) => item.productId === product.productId && item.branchId === this.branchId);

            const countStock = ((stock).reduce((a, b) => a + (b['quantity'] || 0), 0));
            const countSales = ((sales).reduce((a, b) => a + (b['quantity'] || 0), 0));
            const countMovement = ((movement).reduce((a, b) => a + (b['quantity'] || 0), 0));

            return product.lowestStock >= (countStock - (countSales + countMovement))
        });

        return outOfStock;
    }

    async getItemsOutOfStock(){
        const companyStock = await new ModelAction('BranchProductStock').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companySaleEntries = await new ModelAction('SaleEntry').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companyStockMovement = await new ModelAction('StockMovement').findByColumnNotObserve({
            name: 'branchFrom',
            value: this.branchId,
            fxn: 'eq'
        });

        const branchProducts = await new ModelAction('BranchProduct').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const outOfStock = branchProducts.filter((product) => {
            const stock = companyStock.filter((item) => item.productId === product.productId && item.branchId === this.branchId);
            const sales = companySaleEntries.filter((item) => item.productId === product.productId && item.branchId === this.branchId);
            const movement = companyStockMovement.filter((item) => item.productId === product.productId && item.branchId === this.branchId);

            const countStock = ((stock).reduce((a, b) => a + (b['quantity'] || 0), 0));
            const countSales = ((sales).reduce((a, b) => a + (b['quantity'] || 0), 0));
            const countMovement = ((movement).reduce((a, b) => a + (b['quantity'] || 0), 0));

            //console.log(countStock , (countSales + countMovement))

            return (countStock <= (countSales + countMovement))
        });

        return outOfStock;
    }

    async getTotalCostPrice(){
        const companyStock = await new ModelAction('BranchProductStock').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companySaleEntries = await new ModelAction('SaleEntry').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companyStockMovement = await new ModelAction('StockMovement').findByColumnNotObserve({
            name: 'branchFrom',
            value: this.branchId,
            fxn: 'eq'
        });

        const branchProducts = await new ModelAction('BranchProduct').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const stockCostValue = branchProducts.map(async (product) => {
            const stock = companyStock.filter((item) => item.productId === product.productId && item.branchId === this.branchId);
            const sales = companySaleEntries.filter((item) => item.productId === product.productId && item.branchId === this.branchId);
            const movement = companyStockMovement.filter((item) => item.productId === product.productId && item.branchId === this.branchId);

            const countStock = ((stock).reduce((a, b) => a + (b['quantity'] || 0), 0));
            const countSales = ((sales).reduce((a, b) => a + (b['quantity'] || 0), 0));
            const countMovement = ((movement).reduce((a, b) => a + (b['quantity'] || 0), 0));

            //console.log(countStock , (countSales + countMovement))
            //console.log(await new BranchProductService(product).getCostPrice())
            return ((countStock - (countSales + countMovement)) * await new BranchProductService(product).getCostPrice())
        });

        return stockCostValue.reduce(async function(a,b){
            return await a + await b
        }, 0);
    }

    async getTotalSellingPrice(){
        const companyStock = await new ModelAction('BranchProductStock').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companySaleEntries = await new ModelAction('SaleEntry').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const companyStockMovement = await new ModelAction('StockMovement').findByColumnNotObserve({
            name: 'branchFrom',
            value: this.branchId,
            fxn: 'eq'
        });

        const branchProducts = await new ModelAction('BranchProduct').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });

        const stockValue = branchProducts.map((product) => {
            const stock = companyStock.filter((item) => item.productId === product.productId && item.branchId === this.branchId);
            const sales = companySaleEntries.filter((item) => item.productId === product.productId && item.branchId === this.branchId);
            const movement = companyStockMovement.filter((item) => item.productId === product.productId && item.branchId === this.branchId);

            const countStock = ((stock).reduce((a, b) => a + (b['quantity'] || 0), 0));
            const countSales = ((sales).reduce((a, b) => a + (b['quantity'] || 0), 0));
            const countMovement = ((movement).reduce((a, b) => a + (b['quantity'] || 0), 0));

            //console.log(countStock , (countSales + countMovement))
            return ((countStock - (countSales + countMovement)) * product.sellingPrice)
        });

        return stockValue.reduce(function(a,b){
            return a + b
        }, 0);
    }

    async getTotalExpectedProfit(){
        return await this.getTotalSellingPrice() - await this.getTotalCostPrice();
    }

    /*
    * Get Stock products by Id
    */
    async getStockProductsById(id){
        try {
            const stockCollection = await new ModelAction('BranchProductStock').findByColumnNotObserve({
                name: 'id',
                value: id,
                fxn: 'eq',
            });

            return stockCollection;
        }catch (e) {
            return e;
        }
    }

        /*
    * Get Stock products by Id
    */
   async getSellingStockProductsById(id){
    try {
        const stockCollection = await new ModelAction('BranchProduct').findByColumnNotObserve({
            name: 'id',
            value: id,
            fxn: 'eq',
        });

        return stockCollection;
    }catch (e) {
        return e;
    }
}

    /*
    *
    * Get sale individual items cost price
    * */
    getStockEntryCostPrice(product){
        return parseFloat(product.costPrice * product.quantity).toFixed(2);
    }

    /*
    *
    * Get sale individual items selling price
    * */
    getStockEntrySellingPrice(product){
        return parseFloat((product.sellingPrice * product.quantity) - (product.discount * product.quantity)).toFixed(2);
    }

    /*
    *
    * Get cart individual items total
    * */
    getStockEntryProfit(product){
        return parseFloat(((product.sellingPrice * product.quantity) - ((product.costPrice * product.quantity) + (product.discount * product.quantity)))).toFixed(2);
    }

    static async getStockProductQuantity(id){
        return ((await new BranchStockService().getStockProductsById(id))).reduce((a, b) => a + (b['quantity'] || 0), 0);
    }

    /*
    * Get sale total cost price by Id
    * */
    static async getStockEntryCostPriceById(id){
        return ((await new BranchStockService().getStockProductsById(id))).reduce((a, b) => parseFloat(a) + parseFloat(new BranchStockService().getStockEntryCostPrice(b) || 0), 0).toFixed(2);
    }

    /*
    * Get sale total cost price by Id
    * */
    static async getStockEntrySellingPriceById(id){
        return ((await new BranchStockService().getSellingStockProductsById(id))).reduce((a, b) => parseFloat(a) + parseFloat(new BranchStockService().getStockEntrySellingPrice(b) || 0), 0).toFixed(2);
    }

    /*
    * Get sale total profit by Id
    * */
    static async getStockEntryProfitById(saleId){
        return ((await new BranchStockService().getStockProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new BranchStockService().getStockEntryProfit(b) || 0), 0).toFixed(2);
    }

}
