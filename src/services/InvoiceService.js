import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import SaleService from "./SaleService";
import database from "../models/database";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import fromUnixTime from "date-fns/fromUnixTime";
import startOfMonth from "date-fns/startOfMonth";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import getWeekOfMonth from "date-fns/getWeekOfMonth";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfYear from "date-fns/startOfYear";
import lastDayOfYear from "date-fns/lastDayOfYear";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

export default class InvoiceService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    static async getSaleFormatAsync(invoice){
        let total = 0;

        for (let step = 0; step < invoice.length; step++) {
            total += parseFloat(await SaleService.getSaleEntrySellingPriceById(invoice[step].id));
        }

        return {
            total,
            invoices: invoice
        }
    }

    /*
    * Search for an invoice
    * */
    async searchInvoice(searchValue) {
        const invoice = await new ModelAction('Sales').findByColumnNotObserve({
            name: 'receiptNumber',
            value: searchValue,
            fxn: 'like'
        });

        return  database.collections.get('sales').query(Q.where('id',
        Q.oneOf(invoice.map(i => i.id))), Q.where('branchId', LocalInfo.branchId)).fetch();
    }

    static async weekSalesFormat(invoices , date){
        let weekDaySales = [];
        const newDate = new Date(date);
        let weekFormatInvoices = [];

        const weekStart = startOfWeek(newDate , { weekStartsOn: 1 });
        const weekEnd = endOfWeek(newDate , { weekStartsOn: 1 });

        const daysInWeek = eachDayOfInterval({
            start: weekStart,
            end: weekEnd
        });

        for (let i = 0; i < daysInWeek.length; i++) {
            const day = format(daysInWeek[i] , 'dd MMMM yyyy');

            weekFormatInvoices[day] = [];
        }

        for (let index = 0; index < invoices.length; index++){

            let day = format(fromUnixTime(invoices[index].salesDate) , 'dd MMMM yyyy');

            weekFormatInvoices[day] = [...weekFormatInvoices[day] || [], invoices[index]];
        }

        /*const newInvoices = invoices.reduce((r, a) => {
            const day = new Date(fromUnixTime(a.salesDate));
            r[day] = [...r[day] || [], a];
            return r;
        }, []);*/

        for (const [key, value] of Object.entries(weekFormatInvoices)) {
            const index = format(new Date(key) , 'MM/dd/yyyy');

            if (value.length > 0) {
                weekDaySales.push({...await InvoiceService.getSaleFormatAsync(value), day: key , index: index})
            }
        }

        return weekDaySales;
    }

    static async monthSalesFormat (invoices , date){
        const newDate = new Date(date);
        let weekFormatSales = [];
        let monthWeekInvoices = [];

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

            monthWeekInvoices[week] = [];
        }

        for (let index = 0; index < invoices.length; index++){
            const day = new Date(fromUnixTime(invoices[index].salesDate));

            const startDate = format(startOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            const lastDate = format(endOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');

            let week = getWeekOfMonth(day);
            week = `Week ${week} : ${startDate} - ${lastDate}`;
            monthWeekInvoices[week] = [...monthWeekInvoices[week] || [], invoices[index]];
        }

        for (const [key, value] of Object.entries(monthWeekInvoices)) {
            const index = key.slice(9,19);

            if(value.length > 0) {
                weekFormatSales.push({...await InvoiceService.getSaleFormatAsync(value), week: key, index: index})
            }
        }

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
            const day = new Date(fromUnixTime(purchases[index].salesDate));

            let month = format(day , 'MMMM yyyy');
            const isValid = isSameYear(day , newDate);

            if(isValid) {
                yearMonthPurchases[month] = [...yearMonthPurchases[month] || [], purchases[index]];
            }
        }

        for (const [key, value] of Object.entries(yearMonthPurchases)) {
            const index = format(new Date(key) , 'MM/dd/yyyy');

            if(value.length > 0) {
                yearFormatSales.push({...await InvoiceService.getSaleFormatAsync(value), month: key , index: index})
            }
        }

        return yearFormatSales;
    }

    static async getInvoiceHistory(duration , date){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: LocalInfo.branchId,
                fxn: 'eq'
            }
        );

        const day = new Date(date);

        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(fromUnixTime(sale.salesDate) , day));
            case 'week':
                return sales.filter(sale => isSameWeek(fromUnixTime(sale.salesDate) , day));
            case 'month':
                return sales.filter(sale => isSameMonth(fromUnixTime(sale.salesDate) , day));
            case 'year':
                return sales.filter(sale => isSameYear(fromUnixTime(sale.salesDate) , day));
            default :
                return 'error';
        }
    }

    async getInvoiceDetails(duration , date) {
        let invoice = (await InvoiceService.getInvoiceHistory(duration , date));
        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;

        for (let step = 0; step < invoice.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(invoice[step].id));
        }

        if (duration === 'week') {
            invoice = await InvoiceService.weekSalesFormat(invoice , date);
        } else if (duration === 'month') {
            invoice = await InvoiceService.monthSalesFormat(invoice , date);
        } else if (duration === 'year') {
            invoice = await InvoiceService.yearSalesFormat(invoice , date);
        }

        return {
            invoices: invoice.reverse(),
            costPrice: costPrice.toFixed(2),
            profit: profit.toFixed(2),
            credit: profit.toFixed(2),
            sellingPrice: profit.toFixed(2),
            quantity
        }
    }

    static async getInvoiceHistorybyCustomer (duration , date , customerId){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'customerId',
                value: customerId,
                fxn: 'eq'
            }
        );

        const day = new Date(date);

        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(fromUnixTime(sale.salesDate) , day));
            case 'week':
                return sales.filter(sale => isSameWeek(fromUnixTime(sale.salesDate) , day));
            case 'month':
                return sales.filter(sale => isSameMonth(fromUnixTime(sale.salesDate) , day));
            case 'year':
                return sales.filter(sale => isSameYear(fromUnixTime(sale.salesDate) , day));
            default :
                return 'error';
        }
    }

    async getInvoiceDetailsbyCustomer (duration , date , customerId) {
        let invoice = (await InvoiceService.getInvoiceHistorybyCustomer(duration , date , customerId));
        console.log(invoice);
        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;

        for (let step = 0; step < invoice.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(invoice[step].id));
        }

        if (duration === 'week') {
            invoice = await InvoiceService.weekSalesFormat(invoice , date);
        } else if (duration === 'month') {
            invoice = await InvoiceService.monthSalesFormat(invoice , date);
        } else if (duration === 'year') {
            invoice = await InvoiceService.yearSalesFormat(invoice , date);
        }

        return {
            invoices: invoice,
            costPrice: costPrice.toFixed(2),
            profit: profit.toFixed(2),
            credit: credit.toFixed(2),
            sellingPrice: sellingPrice.toFixed(2),
            quantity
        }
    }

    async getCustomerHistory (customerId){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'customerId',
                value: customerId,
                fxn: 'eq'
            }
        );

        const list = sales.reverse();
        return {invoice: list[0]}
    }

    async getCashCustomerHistory (){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'customerId',
                value: "0",
                fxn: 'eq'
            }
        );

        const list = sales.reverse();
        return {invoice: list[0]}
    }

    static async getHistorybyCustomer (customerId){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'customerId',
                value: customerId,
                fxn: 'eq'
            }
        );

        return sales;
    }

    async getDetailsbyCustomer (customerId) {
        let invoice = (await InvoiceService.getHistorybyCustomer(customerId)).reverse();
        console.log(invoice);
        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;

        for (let step = 0; step < invoice.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(invoice[step].id));
        }

        return {
            invoices: invoice,
            costPrice: costPrice.toFixed(2),
            profit: profit.toFixed(2),
            credit: credit.toFixed(2),
            sellingPrice: sellingPrice.toFixed(2),
            quantity: quantity
        }
    }
}
