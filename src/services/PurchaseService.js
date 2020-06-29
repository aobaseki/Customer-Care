import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import BranchStockService from './BranchStockService';
import fromUnixTime from "date-fns/fromUnixTime";
import startOfMonth from 'date-fns/startOfMonth';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import getWeekOfMonth from 'date-fns/getWeekOfMonth';
import format from "date-fns/format";
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfYear from "date-fns/startOfYear";
import lastDayOfYear from 'date-fns/lastDayOfYear';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import database from "../models/database";
import BranchProductStock from "../models/branchesProductsStocks/BranchProductStock";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

export default class PurchaseService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    static async getProductPurchaseHistory(duration , date , productId){
        const purchases = await new ModelAction('BranchProductStock').findByColumnNotObserve(
            {
                name: 'productId',
                value: productId,
                fxn: 'eq'
            }
        );
        const day = new Date(date);

        switch (duration) {
            case 'day':
                return purchases.filter(purchase => isSameDay(fromUnixTime(purchase.stockDate) , day));
            case 'week':
                return purchases.filter(purchase => isSameWeek(fromUnixTime(purchase.stockDate), day));
            case 'month':
                return purchases.filter(purchase => isSameMonth(fromUnixTime(purchase.stockDate), day));
            case 'year':
                return purchases.filter(purchase => isSameYear(fromUnixTime(purchase.stockDate), day));
            default :
                return 'error';
        }
    }

    static async getPurchaseHistory(duration , date){
        const purchases = await new ModelAction('BranchProductStock').findByColumnNotObserve(
            {
                name: 'branchId',
                value: LocalInfo.branchId,
                fxn: 'eq'
            }
        );
        const day = new Date(date);

        switch (duration) {
            case 'day':
                return purchases.filter(purchase => isSameDay(fromUnixTime(purchase.stockDate) , day));
            case 'week':
                return purchases.filter(purchase => isSameWeek(fromUnixTime(purchase.stockDate), day));
            case 'month':
                return purchases.filter(purchase => isSameMonth(fromUnixTime(purchase.stockDate), day));
            case 'year':
                return purchases.filter(purchase => isSameYear(fromUnixTime(purchase.stockDate), day));
            default :
                return 'error';
        }
    }

    static async getPuchasesInDuration(branchId , startDate , endDate){
        return database.collections.get(BranchProductStock.table).query(
            Q.where('stockDate' , Q.between(startDate , endDate)),
            Q.where('branchId' , branchId)
        ).fetch();
    }

    static async getSaleFormatAsync(purchase){
        let costPrice = 0;
        let quantity = 0;

        for (let step = 0; step < purchase.length; step++) {
            costPrice += parseFloat(purchase[step].costPrice) * parseFloat(purchase[step].quantity);
        }

        for (let step = 0; step < purchase.length; step++) {
            quantity += parseFloat(purchase[step].quantity);
        }

        return {
            costPrice,
            quantity
        }
    }

    static async weekSalesFormat(purchases , date){
        let weekDayPurchases = [];
        const newDate = new Date(date);
        let weekFormatPurchases = [];

        const weekStart = startOfWeek(newDate , { weekStartsOn: 1 });
        const weekEnd = endOfWeek(newDate , { weekStartsOn: 1 });

        const daysInWeek = eachDayOfInterval({
            start: weekStart,
            end: weekEnd
        });

        for (let i = 0; i < daysInWeek.length; i++) {
            const day = format(daysInWeek[i] , 'dd MMMM yyyy');

            weekFormatPurchases[day] = [];
        }

        for (let index = 0; index < purchases.length; index++){

            let day = format(fromUnixTime(purchases[index].stockDate) , 'dd MMMM yyyy');

            weekFormatPurchases[day] = [...weekFormatPurchases[day] || [], purchases[index]];
        }

        for (const [key, value] of Object.entries(weekFormatPurchases)) {
            const index = format(new Date(key) , 'MM/dd/yyyy');

            if(value.length > 0) {
                weekDayPurchases.push({...await PurchaseService.getSaleFormatAsync(value), day: key, index: index})
            }
        }

        return weekDayPurchases;
    }

    static async monthSalesFormat (purchases , date){
        const newDate = new Date(date);
        let weekFormatSales = [];
        let monthWeekPurchases = [];

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
            let lastDate = format(endOfWeek(weeksInMonth[i] , { weekStartsOn: 1 }), 'MM/dd/yyyy');

            let week = getWeekOfMonth(weeksInMonth[i]);

            week = `Week ${week} : ${startDate} - ${lastDate}`;

            monthWeekPurchases[week] = [];
        }

        for (let index = 0; index < purchases.length; index++){
            const day = fromUnixTime(purchases[index].stockDate);

            const startDate = format(startOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            const lastDate = format(endOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');

            let week = getWeekOfMonth(day, { weekStartsOn: 1 });

            week = `Week ${week} : ${startDate} - ${lastDate}`;
            monthWeekPurchases[week] = [...monthWeekPurchases[week] || [], purchases[index]];
        }

        for (const [key, value] of Object.entries(monthWeekPurchases)) {
            const index = key.slice(9,19);

            if(value.length > 0){
                weekFormatSales.push({...await PurchaseService.getSaleFormatAsync(value) , week: key, index: index})
            }
        }
        console.log(weekFormatSales)
        return weekFormatSales;
    }

    static async yearSalesFormat (purchases , date){
        const newDate = new Date(date);
        let yearFormatSales = [];
        let yearMonthPurchases = [];

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

            yearMonthPurchases[month] = [];
        }

        for (let index = 0; index < purchases.length; index++){
            const day = new Date(fromUnixTime(purchases[index].stockDate));

            let month = format(day , 'MMMM yyyy');
            const isValid = isSameYear(day , newDate);

            if(isValid) {
                yearMonthPurchases[month] = [...yearMonthPurchases[month] || [], purchases[index]];
            }
        }


        for (const [key, value] of Object.entries(yearMonthPurchases)) {
            const index = format(new Date(key) , 'MM/dd/yyyy');

            if(value.length > 0){
                yearFormatSales.push({...await PurchaseService.getSaleFormatAsync(value) , month: key , index: index})
            }
        }

        return yearFormatSales;
    }

    async getPurchaseDetails(duration , date) {
        let purchase = (await PurchaseService.getPurchaseHistory(duration , date));

        let costPrice = 0;
        let quantity = 0;
        let profit = 0;
        let sellingPrice = 0;

        for (let step = 0; step < purchase.length; step++) {
            costPrice += parseFloat(await BranchStockService.getStockEntryCostPriceById(purchase[step].id));
        }

        for (let step = 0; step < purchase.length; step++) {
            quantity += parseFloat(await BranchStockService.getStockProductQuantity(purchase[step].id));

            const branchProduct = await new ModelAction('BranchProduct').findByColumnNotObserve({
                name: 'productId',
                value: purchase[step].productId,
                fxn: 'eq'
            });

            if(branchProduct.length !== 0){
                const sell = quantity * branchProduct[0].sellingPrice;

                sellingPrice = parseFloat(sell);
            }
        }

        profit = parseFloat(sellingPrice - costPrice).toFixed(2);

        if (duration === 'week') {
            purchase = await PurchaseService.weekSalesFormat(purchase , date);
        } else if (duration === 'month') {
            purchase = await PurchaseService.monthSalesFormat(purchase , date);
        } else if (duration === 'year') {
            purchase = await PurchaseService.yearSalesFormat(purchase , date);
        }

        return {
            purchases: purchase.reverse(),
            costPrice: costPrice.toFixed(2),
            quantity: quantity.toFixed(2),
            profit: profit,
            sellingPrice: sellingPrice.toFixed(2)
        }
    }

    async getProductPurchaseDetails(duration , date , productId) {
        let purchase = (await PurchaseService.getProductPurchaseHistory(duration , date , productId));
        let costPrice = 0;
        let quantity = 0;
        let profit = 0;
        let sellingPrice = 0;

        for (let step = 0; step < purchase.length; step++) {
            costPrice += parseFloat(await BranchStockService.getStockEntryCostPriceById(purchase[step].id));
        }

        for (let step = 0; step < purchase.length; step++) {
            quantity += parseFloat(await BranchStockService.getStockProductQuantity(purchase[step].id));

            const branchProduct = await new ModelAction('BranchProduct').findByColumnNotObserve({
                name: 'productId',
                value: purchase[step].productId,
                fxn: 'eq'
            });

            if(branchProduct.length !== 0){
                const sell = quantity * branchProduct[0].sellingPrice;

                sellingPrice = parseFloat(sell);
            }
        }

        for (let step = 0; step < purchase.length; step++) {
            profit += parseFloat(await BranchStockService.getStockEntryProfitById(purchase[step].id));
        }

        profit = parseFloat(sellingPrice - costPrice);

        if (duration === 'week') {
            purchase = await PurchaseService.weekSalesFormat(purchase , date);
        } else if (duration === 'month') {
            purchase = await PurchaseService.monthSalesFormat(purchase , date);
        } else if (duration === 'year') {
            purchase = await PurchaseService.yearSalesFormat(purchase , date);
        }

        return {
            purchases: purchase.reverse(),
            costPrice: costPrice.toFixed(2),
            quantity: quantity.toFixed(2),
            profit: profit,
            sellingPrice: sellingPrice.toFixed(2)
        }
    }
}
