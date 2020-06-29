import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import BranchProductService from "./BranchProductService";
import isToday from 'date-fns/isToday'
import isWeek from 'date-fns/isThisWeek'
import isYear from 'date-fns/isThisYear'
import isThisMonth from 'date-fns/isThisMonth'
import database from "../models/database";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import SaleService from "./SaleService";
import fromUnixTime from 'date-fns/fromUnixTime';
import isSameDay from "date-fns/isSameDay";
import getUnixTime from 'date-fns/getUnixTime';

export default class BranchService {
    constructor (branchId = LocalInfo.branchId) {
        this.branch = (LocalInfo.branches).find(branch => branch.branchId === branchId);
        this.branchId = branchId;
    }

    getProducts() {
        return new ModelAction('BranchProduct').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });
    }

    /*
    * Get a branches customers
    * */
    getCustomers() {
        return new ModelAction('BranchCustomer').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });
    }

    /*
    * Search for a branch product
    * */
    async searchBranchProduct(searchValue) {
        const products = await new ModelAction('Product').findByColumnNotObserve({
            name: 'name',
            value: searchValue,
            fxn: 'like'
        });

        return  database.collections.get('branches_products').query(Q.where('productId',
          Q.oneOf(products.map(p => p.id))), Q.where('branchId', LocalInfo.branchId)).fetch();
    }

    /*
    * @var product with barcode
    * @return object
    * @todo barcode search...
    * */
    /*async searchBarcodeProduct(barcode){
        const products = await new ModelAction('Product').findByColumnNotObserve({
            name: 'barCode',
            value: barcode,
            fxn: 'eq'
        });

        return  database.collections.get('branches_products').query(Q.where('productId',
            Q.oneOf(products.map(p => p.id))), Q.where('branchId', LocalInfo.branchId)).fetch();
    }*/

    /*
    * Filter item
    * */
    static async filterProduct(column , value , item){
        const product = await new BranchProductService(item).product();
        console.log(product)
        return product[column] === value;
    }

    /*
    * Get Today sales using user role
    * @return all today sales
    * */
    async getTodaySales() {
        // const userRole = LocalInfo.userRole;
        let todaySales = [];

        // const day = new Date();

        //if(userRole === 'owner'){
            const sales = await new ModelAction('Sales').findByColumnNotObserve(
                {
                    name: 'branchId',
                    value: LocalInfo.branchId,
                    fxn: 'eq',
                }
            );

            todaySales = sales.filter(sale => isToday(fromUnixTime(sale.salesDate)));
        //}

        /*
        * @todo handle other user roles
        * */

        return todaySales;
    }

    /*
    * @todo Chris before you change a function check if it is being used. I am sorry for your punishment I have to claim my function cos i spend almost 2 hours to find the issues...
    * */
    /*static async getSales(duration, date) {
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: branches,
                fxn: 'oneOf'
            }
        );

        const day = new Date(date);

        // switch (duration) {
        //     case 'today':
        //         return sales.filter(sale => isToday(sale.createdAt));
        //     case 'week':
        //         return sales.filter(sale => isWeek(sale.createdAt));
        //     case 'month':
        //         return sales.filter(sale => isThisMonth(sale.createdAt));
        //     case 'year':
        //         return sales.filter(sale => isYear(sale.createdAt));
        // }
        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(new Date(sale.salesDate) , day));
            case 'week':
                //console.log(isSameWeek(sale.salesDate, day))
                return sales.filter(sale => isSameWeek(new Date(sale.salesDate), day));
            case 'month':
                return sales.filter(sale => isSameMonth(new Date(sale.salesDate), day));
            case 'year':
                return sales.filter(sale => isSameYear(new Date(sale.salesDate), day));
        }

    }

    /!*
    * Get today sales total details
    * @return number - promise
    * *!/
    async getSalesDetails(duration , date) {
        const sale = await BranchService.getSales(duration , date);
        console.log(sale);
        let total = 0;
        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;
        let purchases = 0;

        for (let step = 0; step < sale.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(sale[step].id));
        }

        for (let step = 0; step < sale.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(sale[step].id));
        }

        for (let step = 0; step < sale.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(sale[step].id));
        }

        for (let step = 0; step < sale.length; step++) {
            total += parseFloat(await SaleService.getSaleEntryAmountById(sale[step].id));
        }

        for (let step = 0; step < sale.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(sale[step].id));
        }

        for (let step = 0; step < sale.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(sale[step].id));
        }

        return {
            sales:sale,
            total,
            profit,
            credit,
            purchases,
            sellingPrice,
            quantity,
            costPrice
        };
    }*/

    static async getSales(duration) {
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: branches,
                fxn: 'oneOf'
            }
        );

        console.log(sales)

        switch (duration) {
            case 'today':
                return sales.filter(sale => isToday(fromUnixTime(sale.salesDate)));
            case 'week':
                return sales.filter(sale => isWeek(fromUnixTime(sale.salesDate)));
            case 'month':
                return sales.filter(sale => isThisMonth(fromUnixTime(sale.salesDate)));
            case 'year':
                return sales.filter(sale => isYear(fromUnixTime(sale.salesDate)));
            default:
                return 'error';
        }

    }

    /*
    * Get today sales total details
    * @return number - promise
    * */
    async getSalesDetails(duration , branchId = LocalInfo.branchId) {
        const sales = await BranchService.getSales(duration);

        let total = 0;
        let profit = 0;
        let credit = 0;
        let purchases = 0;

        for (let step = 0; step < sales.length; step++) {
            total += parseFloat(await SaleService.getSaleEntryAmountById(sales[step].id));
        }

        for (let step = 0; step < sales.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(sales[step].id));
        }

        for (let step = 0; step < sales.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(sales[step].id));
        }

        return {
            total,profit,credit,purchases
        };
    }
}
