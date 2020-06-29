import SaleService from "./SaleService";
import PurchaseService from "./PurchaseService";
import database from "../models/database";
import BranchProductStock from "../models/branchesProductsStocks/BranchProductStock";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import SaleEntries from "../models/saleEntry/SaleEntries";
import StockMovement from "../models/stockMovements/StockMovement";
import CartEntry from "../models/cartEntry/CartEntry";
import LocalInfo from "./LocalInfo";
import getUnixTime from 'date-fns/getUnixTime';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import getWeekOfMonth from "date-fns/getWeekOfMonth";
import isSameYear from "date-fns/isSameYear";
import lastDayOfYear from "date-fns/lastDayOfYear";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";

export default class StockMovementService {
    static async getEntryFormatAsync(entry , startKey , endKey , productId) {
        let totalSold = 0;
        let totalPurchased = 0;
        let openingBalance = 0;
        let closingBalance = 0;

        if(productId === null) {
            openingBalance = await this.getBranchOpeningQuantity(new Date(startKey));
            closingBalance = await this.getBranchClosingQuantity(new Date(endKey));
        }else{
            openingBalance = await this.getBranchProductOpeningQuantity(new Date(startKey) , productId);
            closingBalance = await this.getBranchProductClosingQuantity(new Date(endKey) , productId);
        }

        let difference = closingBalance - openingBalance;

        for (let step = 0; step < entry.length; step++) {
            totalSold += entry[step].sold;
        }

        for (let step = 0; step < entry.length; step++) {
            totalPurchased += entry[step].purchased;
        }

        if(difference > 0){
            difference = `+${difference}`;
        }else if(difference < 0){
            difference = `${difference}`;
        }else{
            difference = 0;
        }

        return {
            totalSold,
            totalPurchased,
            openingBalance,
            closingBalance,
            difference
        }
        //console.log(totalSold , totalPurchased , openingBalance , closingBalance , difference)
    }

    static async weekSalesFormat(sales , date , productId = null) {
        let weekDaySales = [];
        const newDate = new Date(date);
        let weekFormatSales = [];

        const weekStart = startOfWeek(newDate , { weekStartsOn: 1 });
        const weekEnd = endOfWeek(newDate , { weekStartsOn: 1 });

        const daysInWeek = eachDayOfInterval({
            start: weekStart,
            end: weekEnd
        });

        for (let i = 0; i < daysInWeek.length; i++) {
            const day = format(daysInWeek[i] , 'dd MMMM yyyy');

            weekFormatSales[day] = [];
        }

        for (let index = 0; index < sales.length; index++){

            let day = format(fromUnixTime(sales[index].entryDate) , 'dd MMMM yyyy');

            weekFormatSales[day] = [...weekFormatSales[day] || [], sales[index]];
        }

        for (const [key, value] of Object.entries(weekFormatSales)) {
            const index = format(new Date(key) , 'MM/dd/yyyy');

            if(value.length > 0) {
                weekDaySales.push({...await this.getEntryFormatAsync(value , startOfDay(new Date(key)) , endOfDay(new Date(key)) , productId), day: key, index: index})
            }
        }

        return weekDaySales;
    }

    static async monthSalesFormat (sales , date , productId = null){
        const newDate = new Date(date);
        let weekFormatSales = [];
        let monthWeekSales = [];

        const monthStart = startOfMonth(newDate , { weekStartsOn: 1 });
        const monthEnd = lastDayOfMonth(newDate , { weekStartsOn: 1 });

        const weeksInMonth = eachWeekOfInterval({
            start: monthStart,
            end: monthEnd
        }, { weekStartsOn: 1 });

        /*
        * @todo there is an issue with weeks that start in other previous month...
        * */
        for (let i = 0; i < weeksInMonth.length; i++) {
            const startDate = format(startOfWeek(weeksInMonth[i] , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            const lastDate = format(endOfWeek(weeksInMonth[i] , { weekStartsOn: 1 }), 'MM/dd/yyyy');

            let week = getWeekOfMonth(weeksInMonth[i]);

            week = `Week ${week} : ${startDate} - ${lastDate}`;

            monthWeekSales[week] = [];
        }

        for (let index = 0; index < sales.length; index++){
            const day = fromUnixTime(sales[index].entryDate);

            const startDate = format(startOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            const lastDate = format(endOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');

            let week = getWeekOfMonth(day , { weekStartsOn: 1 });
            week = `Week ${week} : ${startDate} - ${lastDate}`;
            monthWeekSales[week] = [...monthWeekSales[week] || [], sales[index]];
        }

        for (const [key, value] of Object.entries(monthWeekSales)) {
            const index = key.slice(9,19);

            if(value.length > 0) {
                weekFormatSales.push({...await this.getEntryFormatAsync(value , startOfWeek(new Date(index) , { weekStartsOn: 1 }) , endOfWeek(new Date(index) , { weekStartsOn: 1 }) , productId), week: key, index: index})
            }
        }

        return weekFormatSales;
    }

    static async yearSalesFormat (sales , date , productId = null){
        const newDate = new Date(date);
        let yearFormatSales = [];
        let yearMonthSales = [];

        const yearStart = startOfYear(newDate);

        const isYear = isSameYear(newDate, new Date());
        let yearEnd = '';

        if(isYear){
            yearEnd = new Date();
        }else{
            yearEnd = lastDayOfYear(newDate);
        }

        const monthsInYear = eachMonthOfInterval({
            start: yearStart,
            end: yearEnd
        });


        for (let i = 0; i < monthsInYear.length; i++) {
            const month = format(monthsInYear[i] , 'MMMM yyyy');

            yearMonthSales[month] = [];
        }

        for (let index = 0; index < sales.length; index++){
            const day = new Date(fromUnixTime(sales[index].entryDate));

            let month = format(day , 'MMMM yyyy');
            const isValid = isSameYear(day , newDate);

            if(isValid) {
                yearMonthSales[month] = [...yearMonthSales[month] || [], sales[index]];
            }
        }

        for (const [key, value] of Object.entries(yearMonthSales)) {
            const index = format(new Date(key) , 'MM/dd/yyyy');

            if(value.length > 0) {
                yearFormatSales.push({...await this.getEntryFormatAsync(value , startOfMonth(new Date(index), { weekStartsOn: 1 }) , lastDayOfMonth(new Date(index) , { weekStartsOn: 1 }) , productId), month: key, index: index})
            }
        }

        return yearFormatSales;
    }


    /*
    * 0. Get all carts
    * 1. Get all sales
    * 2. Get all stocks
    * 3. Get all sales returns
    * 4. Get all stock returns
    * 5. Get all stock movements between branch
    * 6. Merge all arrays.
    * 7. Add type of history
    * */
    static async getStockMovementListByDate(duration , date){
        let movement = [];
        let openingBalance = 0;
        let closingBalance = 0;
        let sales = [];
        let stocks = [];

        if (duration === 'day') {
            //Get sales of date
            sales = await StockMovementService.formatSales(duration , date);

            //Get stocks of date
            stocks = await StockMovementService.formatStock(duration , date);

            movement = sales[0].concat(stocks[0]);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });

            openingBalance = await this.getBranchOpeningQuantity(startOfDay(new Date(date)));
            closingBalance = await this.getBranchClosingQuantity(endOfDay(new Date(date)));
        } else if(duration === 'week') {
            //Get sales of date
            sales = await StockMovementService.formatSales(duration , date);

            //Get stocks of date
            stocks = await StockMovementService.formatStock(duration , date);

            movement = sales[0].concat(stocks[0]);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });
            movement = await this.weekSalesFormat(movement , date);

            openingBalance = await this.getBranchOpeningQuantity(startOfWeek(new Date(date), { weekStartsOn: 1 }));
            closingBalance = await this.getBranchClosingQuantity(endOfWeek(new Date(date), { weekStartsOn: 1 }));
        } else if (duration === 'month') {
            //Get sales of date
            sales = await StockMovementService.formatSales(duration , date);

            //Get stocks of date
            stocks = await StockMovementService.formatStock(duration , date);

            movement = sales[0].concat(stocks[0]);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });

            movement = await this.monthSalesFormat(movement , date);

            openingBalance = await this.getBranchOpeningQuantity(startOfMonth(new Date(date)));
            closingBalance = await this.getBranchClosingQuantity(endOfMonth(new Date(date)));
        } else if (duration === 'year') {
            //Get sales of date
            sales = await StockMovementService.formatSales(duration , date);

            //Get stocks of date
            stocks = await StockMovementService.formatStock(duration , date);

            movement = sales[0].concat(stocks[0]);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });
            movement = await this.yearSalesFormat(movement , date);

            openingBalance = await this.getBranchOpeningQuantity(startOfYear(new Date(date)));
            closingBalance = await this.getBranchClosingQuantity(endOfYear(new Date(date)));
        }

        return {
            entries: movement.reverse(),
            openingBalance: openingBalance,
            closingBalance: closingBalance,
            totalSold: sales[1],
            totalPurchased: stocks[1]
        }
    }

    static async getStockMovementListByProduct(duration , date , productId){
        let movement = [];
        let openingBalance = 0;
        let closingBalance = 0;
        let sales = [];
        let stocks = [];

        if (duration === 'day') {
            //Get sales of date
            sales = await StockMovementService.formatSales(duration , date , productId);

            //Get stocks of date
            stocks = await StockMovementService.formatStock(duration , date , productId);

            movement = sales[0].concat(stocks[0]);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });

            openingBalance = await this.getBranchProductOpeningQuantity(startOfDay(new Date(date)) , productId);
            closingBalance = await this.getBranchProductClosingQuantity(endOfDay(new Date(date)) , productId);
        } else if(duration === 'week') {
            //Get sales of date
            sales = await StockMovementService.formatSales(duration , date , productId);

            //Get stocks of date
            stocks = await StockMovementService.formatStock(duration , date , productId);

            movement = sales[0].concat(stocks[0]);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });
            movement = await this.weekSalesFormat(movement , date , productId);

            openingBalance = await this.getBranchProductOpeningQuantity(startOfWeek(new Date(date), { weekStartsOn: 1 }) , productId);
            closingBalance = await this.getBranchProductClosingQuantity(endOfWeek(new Date(date), { weekStartsOn: 1 }) , productId);
        } else if (duration === 'month') {
            //Get sales of date
            sales = await StockMovementService.formatSales(duration , date , productId);

            //Get stocks of date
            stocks = await StockMovementService.formatStock(duration , date , productId);

            movement = sales[0].concat(stocks[0]);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });

            movement = await this.monthSalesFormat(movement , date , productId);

            openingBalance = await this.getBranchProductOpeningQuantity(startOfMonth(new Date(date)) , productId);
            closingBalance = await this.getBranchProductClosingQuantity(endOfMonth(new Date(date)) , productId);
        } else if (duration === 'year') {
            //Get sales of date
            sales = await StockMovementService.formatSales(duration , date , productId);

            //Get stocks of date
            stocks = await StockMovementService.formatStock(duration , date , productId);

            movement = sales[0].concat(stocks[0]);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });
            movement = await this.yearSalesFormat(movement , date , productId);

            openingBalance = await this.getBranchProductOpeningQuantity(startOfYear(new Date(date)) , productId);
            closingBalance = await this.getBranchProductClosingQuantity(endOfYear(new Date(date)) , productId);
        }

        return {
            entries: movement.reverse(),
            openingBalance: openingBalance,
            closingBalance: closingBalance,
            totalSold: sales[1],
            totalPurchased: stocks[1]
        }
    }

    static async formatSales(duration , date, productId = null){
        let sales = [];
        if(productId === null){
            sales = await SaleService.getSalesHistory(duration , date);
        }else{
            sales = await SaleService.getProductSalesHistory(duration, date, productId);
        }

        const movementData = [];
        let saleQuantity = 0;

        for(let i = 0; i < sales.length; i++){
            const product = await sales[i].product.fetch();
            saleQuantity+= sales[i].quantity;

            movementData.push({
                name: product.name,
                entryDate: sales[i].entryDate,
                purchased: 0,
                sold: sales[i].quantity,
                productId: sales[i].productId,
                openingBalance: await StockMovementService.getProductQuantity(sales[i].productId , sales[i].entryDate),
                quantity: sales[i].quantity,
                type: 'sales',
            });
        }

        return [movementData , saleQuantity];
    }

    static async formatStock(duration , date, productId = null){
        const movementData = [];
        let stockQuantity = 0;
        let stock = [];

        if(productId === null){
            stock = await PurchaseService.getPurchaseHistory(duration , date);
        }else{
            stock = await PurchaseService.getProductPurchaseHistory(duration , date, productId)
        }

        for(let i = 0; i < stock.length; i++){
            const product = await stock[i].product.fetch();

            stockQuantity += stock[i].quantity;
            movementData.push({
                name: product.name,
                entryDate: stock[i].stockDate,
                purchased: stock[i].quantity,
                sold: 0,
                productId: stock[i].productId,
                openingBalance: await StockMovementService.getProductQuantity(stock[i].productId , stock[i].stockDate),
                quantity: stock[i].quantity,
                type: 'sales',
            });
        }

        return [movementData , stockQuantity];
    }

    static async getBranchOpeningQuantity(day) {
        const date = getUnixTime(day);

        const stock = await database.collections.get(BranchProductStock.table).query(
            Q.where('stockDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const saleEntries = await database.collections.get(SaleEntries.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const stockMovement = await database.collections.get(StockMovement.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const cartEntries = await database.collections.get(CartEntry.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const stockQuantity = (stock).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const salesQuantity = (saleEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const cartQuantity = (cartEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const stockMovementQuantity = (stockMovement).reduce((a, b) => a + (b['quantity'] || 0), 0);

        return (stockQuantity - (salesQuantity + cartQuantity + stockMovementQuantity));
    }

    static async getBranchClosingQuantity(day) {
        const date = getUnixTime(day);

        const stock = await database.collections.get(BranchProductStock.table).query(
            Q.where('stockDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const saleEntries = await database.collections.get(SaleEntries.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const stockMovement = await database.collections.get(StockMovement.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const cartEntries = await database.collections.get(CartEntry.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const stockQuantity = (stock).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const salesQuantity = (saleEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const cartQuantity = (cartEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const stockMovementQuantity = (stockMovement).reduce((a, b) => a + (b['quantity'] || 0), 0);

        return (stockQuantity - (salesQuantity + cartQuantity + stockMovementQuantity));
    }

    static async getBranchProductClosingQuantity(day , productId) {
        const date = getUnixTime(day);

        const stock = await database.collections.get(BranchProductStock.table).query(
            Q.where('stockDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('productId' , productId),
        ).fetch();

        const saleEntries = await database.collections.get(SaleEntries.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('productId' , productId),
        ).fetch();

        const stockMovement = await database.collections.get(StockMovement.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('productId' , productId),
        ).fetch();

        const cartEntries = await database.collections.get(CartEntry.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('productId' , productId),
        ).fetch();

        const stockQuantity = (stock).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const salesQuantity = (saleEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const cartQuantity = (cartEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const stockMovementQuantity = (stockMovement).reduce((a, b) => a + (b['quantity'] || 0), 0);

        return (stockQuantity - (salesQuantity + cartQuantity + stockMovementQuantity));
    }

    static async getBranchProductOpeningQuantity(day , productId) {
        const date = getUnixTime(day);

        const stock = await database.collections.get(BranchProductStock.table).query(
            Q.where('stockDate' , Q.lt(date)),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('productId' , productId),
        ).fetch();

        const saleEntries = await database.collections.get(SaleEntries.table).query(
            Q.where('entryDate' , Q.lt(date)),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('productId' , productId),
        ).fetch();

        const stockMovement = await database.collections.get(StockMovement.table).query(
            Q.where('entryDate' , Q.lt(date)),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('productId' , productId),
        ).fetch();

        const cartEntries = await database.collections.get(CartEntry.table).query(
            Q.where('entryDate' , Q.lt(date)),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('productId' , productId),
        ).fetch();

        const stockQuantity = (stock).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const salesQuantity = (saleEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const cartQuantity = (cartEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const stockMovementQuantity = (stockMovement).reduce((a, b) => a + (b['quantity'] || 0), 0);

        return (stockQuantity - (salesQuantity + cartQuantity + stockMovementQuantity));
    }

    static async getProductQuantity(productId , day){
        const stock = await database.collections.get(BranchProductStock.table).query(
            Q.where('stockDate' , Q.lt(day)),
            Q.where('productId' , productId),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const saleEntries = await database.collections.get(SaleEntries.table).query(
            Q.where('entryDate' , Q.lt(day)),
            Q.where('productId' , productId),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const stockMovement = await database.collections.get(StockMovement.table).query(
            Q.where('entryDate' , Q.lt(day)),
            Q.where('productId' , productId),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const cartEntries = await database.collections.get(CartEntry.table).query(
            Q.where('entryDate' , Q.lt(day)),
            Q.where('productId' , productId),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const stockQuantity = (stock).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const salesQuantity = (saleEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const cartQuantity = (cartEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const stockMovementQuantity = (stockMovement).reduce((a, b) => a + (b['quantity'] || 0), 0);

        //console.log(stockQuantity , salesQuantity , cartQuantity , stockMovementQuantity);
        //console.log(stock , cartEntries , saleEntries , stockMovement);
        return (stockQuantity - (salesQuantity + cartQuantity + stockMovementQuantity));
    }
}
