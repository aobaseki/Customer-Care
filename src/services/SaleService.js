import CartService from "./CartService";
import database from "../models/database";
import Carts from "../models/carts/Carts";
import {v4 as uuid} from 'uuid';
import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import BranchService from "./BranchService";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import fromUnixTime from 'date-fns/fromUnixTime';
import startOfMonth from "date-fns/startOfMonth";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import getWeekOfMonth from "date-fns/getWeekOfMonth";
import startOfYear from "date-fns/startOfYear";
import lastDayOfYear from "date-fns/lastDayOfYear";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import SaleEntries from "../models/saleEntry/SaleEntries";
import CustomerService from "./CustomerService";
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

export default class SaleService {
    async makeSell(data , paymentType){
        console.log(paymentType)
        const cartId = await new CartService().cartId();

        try {
            const cartCollection = await database.collections.get(Carts.table);
            const cart = await cartCollection.find(cartId);

            const salesColumn = {
                type: data.salesType || 'sales',
                paymentType: SaleService.getPaymentType(paymentType),
                customerId: cart.customerId,
                discount: cart.discount,
                branchId: cart.branchId,
                salesDate: cart.cartDate,
                receiptNumber: uuid(),
                createdBy: LocalInfo.userId,
            };

            await new ModelAction('Sales').post(salesColumn);
            const sale = await SaleService.getLastSale();
            await database.adapter.setLocal("saleId" , sale.id);

            try {
                await SaleService.importCartToSales(cartId , sale);

                await SaleService.makePayment(sale , data);
                await new ModelAction('Carts').destroy(cartId);

                const activeCustomer = (await CustomerService.getCashCustomer())[0];

                await database.adapter.setLocal("activeCustomer" , activeCustomer.id);
                await database.adapter.removeLocal("cartId");
                localStorage.removeItem("cartId");

                //await new CartService().cartId();
            }catch (e) {
                return false
            }

            return false;
        } catch (e) {
            return e;
        }
    }

    /*
    * @todo clear after testing
    * */
    static async makeSellLegit(){
        const sales = await new ModelAction('Sales').indexNotObserve();
        const customerId = (await CustomerService.getCashCustomer())[0].id;

        for (let i = 0; i < sales.length; i++){
            if(sales[i].customerId == "0"){
                await new ModelAction('Sales').update(sales[i].id , {
                    customerId: customerId
                })
            }
        }
    }

    static getPaymentType(paymentType){
        console.log(paymentType)
        switch (paymentType) {
            case 0:
                return 'cash';
            case 1:
                return 'MoMo';
            case 2:
                return 'credit';
            case 3:
                return 'cheque';
            case 4:
                return 'card';
            case 5:
                return 'audit';
            case 6:
                return 'gift';
            case 7:
                return 'family';
            case 8:
                return 'damaged';
            case 9:
                return 'expired';
            default:
                return 'cash';
        }
    }

    static async makePayment(sales , data){
        localStorage.setItem('amountPaid' , data.amountPaid);
        const salePaymentColumns = {
            saleId: sales.id,
            customerId: sales.customerId,
            branchId: LocalInfo.branchId,
            createdBy: LocalInfo.userId,
            type: SaleService.getPaymentType(data.type),
            amount: data.changeDue >= 0 ? parseFloat(data.amountPaid - data.changeDue) : parseFloat(data.amountPaid),
        };

        try {
            await new ModelAction('SaleInstallment').post(salePaymentColumns);
        } catch (e) {
            return false;
        }
    }

    static async getLastSale(){
        const sales = await new ModelAction('Sales').findByColumnNotObserve({
            name: 'branchId',
            value: LocalInfo.branchId,
            fxn: 'eq',
        });

        return sales[sales.length - 1];
    }

    static async importCartToSales(cartId , sale){
        const cartEntries = await new ModelAction('CartEntry').findByColumnNotObserve({
            name: 'cartId',
            value: cartId,
            fxn: 'eq',
        });

        cartEntries.forEach(async entry => {
            const entryColumns = {
                productId: entry.productId,
                customerId: entry.customerId,
                sellingPrice: entry.sellingPrice,
                quantity: entry.quantity,
                saleId: sale.id,
                discount: entry.discount,
                entryDate: entry.entryDate,
                costPrice: entry.costPrice,
                branchId: entry.branchId,
                branchProductId: entry.branchProductId,
            };

            await new ModelAction('SaleEntry').post(entryColumns);
            await new ModelAction('CartEntry').destroy(entry.id);
        });
    }

    static async updateSaleEntryQuantity(formFields){
        await new ModelAction('SaleEntry').update(formFields.saleId,{
            quantity: parseFloat(formFields.quantity)
        })
    }

    /*
    *
    * Get cart individual items total
    * */
    getSaleEntryTotal(product){
        return parseFloat(((product.sellingPrice * product.quantity) - (product.discount * product.quantity))).toFixed(2);
    }

    /*
    *
    * Get cart individual items total
    * */
    getSaleEntryProfit(product){
        return parseFloat(((product.sellingPrice * product.quantity) - ((product.costPrice * product.quantity) + (product.discount * product.quantity)))).toFixed(2);
    }

    /*
    *
    * Get sale individual items cost price
    * */
    getSaleEntryCostPrice(product){
        return parseFloat(product.costPrice * product.quantity).toFixed(2);
    }

    /*
    *
    * Get sale individual items selling price
    * */
    getSaleEntrySellingPrice(product){
        return parseFloat((product.sellingPrice * product.quantity) - (product.discount * product.quantity)).toFixed(2);
    }

    /*
    * Get Sale products by Id
    */
    async getSaleProductsById(saleId){
        try {
            const saleCollection = await new ModelAction('SaleEntry').findByColumnNotObserve({
                name: 'saleId',
                value: saleId,
                fxn: 'eq',
            });

            return saleCollection;
        }catch (e) {
            return e;
        }
    }

    /*
    * Get Sale payment by Id
    * @todo hwy does it return only the first product...?
    */
    async getSalePaymentById(saleId){
        try {
            let paymentCollection = new ModelAction('SaleInstallment').findByColumnNotObserve({
                name: 'saleId',
                value: saleId,
                fxn: 'eq'
            });
            paymentCollection = await paymentCollection;

            return paymentCollection;
        }catch (e) {
            return e;
        }
    }

    /*
    * Get sale total amount by Id
    * */
    static async getSaleEntryAmountById(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new SaleService().getSaleEntryTotal(b) || 0), 0).toFixed(2);
    }

    static async getCartEntryAmount(){
        return ((await new CartService().getCartProducts())).reduce((a, b) => parseFloat(a) + parseFloat(new CartService().getCartEntryTotal(b) || 0), 0).toFixed(2);
    }

    static async getSaleProductQuantity(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + (parseFloat(b['quantity']) || 0), 0);
    }

    /*
    * Get sale total profit by Id
    * */
    static async getSaleEntryProfitById(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new SaleService().getSaleEntryProfit(b) || 0), 0);
    }

    /*
    * Get sale total cost price by Id
    * */
    static async getSaleEntryCostPriceById(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new SaleService().getSaleEntryCostPrice(b) || 0), 0);
    }

    /*
    * Get sale total cost price by Id
    * */
    static async getSaleEntrySellingPriceById(saleId){
        return ((await new SaleService().getSaleProductsById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(new SaleService().getSaleEntrySellingPrice(b) || 0), 0);
    }

    /*
    * Get sale total amountPaid by Id
    * */
    static async getSaleEntryAmountPaidById(saleId){
        return ((await new SaleService().getSalePaymentById(saleId))).reduce((a, b) => parseFloat(a) + parseFloat(b.amount || 0), 0);
    }

    /*
    * Get sale credit left
    * */
    static async getSaleEntryCreditById(saleId){
        return ((await this.getSaleEntryAmountById(saleId)) - (await this.getSaleEntryAmountPaidById(saleId)))
    }

    /*
    * Get today sales total amount
    * @return number - promise
    * */
    async getTodaySalesDetails() {
        const todaySales = await new BranchService().getTodaySales();

        let total = 0;
        let profit = 0;
        for (let step = 0; step < todaySales.length; step++) {
            total += parseFloat(await SaleService.getSaleEntryAmountById(todaySales[step].id));
        }

        for (let step = 0; step < todaySales.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(todaySales[step].id));
        }

        return {
            total,profit
        };
    }

    /*
    * Get today sales total amount
    * @return number - promise
    * */
    async getDaySalesDetails(date) {
        let sale = (await SaleService.getSalesHistory('day' , date));

        let total = 0;
        let profit = 0;

        for (let step = 0; step < sale.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            total += parseFloat(await SaleService.getSaleEntrySellingPriceById(sale[step].saleId));
        }

        return {
            total,profit
        }
    }

    /*
    * Get sale payment status
    * */

    static async getSalePaymentStatus(saleId){
        const saleAmount = await SaleService.getSaleEntryAmountById(saleId);
        const saleAmountPaid = await SaleService.getSaleEntryAmountPaidById(saleId);

        if(saleAmountPaid >= saleAmount){
            return 'Full payment';
        }else{
            return `Owes GHC ${saleAmount - saleAmountPaid}`;
        }
    }

    static async getAllSalesQuantity(){
        const branchId = LocalInfo.branchId;

        const sales = new ModelAction('Sales').findByColumnNotObserve({
            name: 'branchId',
            value: branchId,
            fxn: 'eq'
        });

        return sales;
    }

    static async getSalesHistoryInDuration(branchId , startDate , endDate){
        return database.collections.get(SaleEntries.table).query(
            Q.where('entryDate' , Q.between(startDate , endDate)),
            Q.where('branchId' , branchId)
        ).fetch();
    }

    static async getSalesHistory(duration , date){
        const sales = await new ModelAction('SaleEntry').findByColumnNotObserve(
            {
                name: 'branchId',
                value: LocalInfo.branchId,
                fxn: 'eq'
            }
        );

        const day = new Date(date);

        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(new Date(fromUnixTime(sale.entryDate)), day));
            case 'week':
                return sales.filter(sale => isSameWeek(new Date(fromUnixTime(sale.entryDate)), day , {
                    weekStartsOn: 1
                }));
            case 'month':
                return sales.filter(sale => isSameMonth(new Date(fromUnixTime(sale.entryDate)), day));
            case 'year':
                return sales.filter(sale => isSameYear(new Date(fromUnixTime(sale.entryDate)), day));
        }
    }

    static async getProductSalesHistory(duration , date , branchProductId){
        const sales = await new ModelAction('SaleEntry').findByColumnNotObserve(
            {
                name: 'branchProductId',
                value: branchProductId,
                fxn: 'eq'
            }
        );

        const day = new Date(date);

        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(fromUnixTime(sale.entryDate), day));
            case 'week':
                return sales.filter(sale => isSameWeek(fromUnixTime(sale.entryDate), day , {
                    weekStartsOn: 1
                }));
            case 'month':
                return sales.filter(sale => isSameMonth(fromUnixTime(sale.entryDate), day));
            case 'year':
                return sales.filter(sale => isSameYear(fromUnixTime(sale.entryDate), day));
        }
    }

    static async getSaleFormatAsync(sale){
        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;

        for (let step = 0; step < sale.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(sale[step].saleId));
        }

        return {
            costPrice,
            profit,
            credit,
            sellingPrice,
            quantity
        }
    }

    static async weekSalesFormat(sales , date){
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
                weekDaySales.push({...await SaleService.getSaleFormatAsync(value), day: key, index: index})
            }
        }

        return weekDaySales;
    }

    static async monthSalesFormat (sales , date){
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
                weekFormatSales.push({...await SaleService.getSaleFormatAsync(value), week: key, index: index})
            }
        }

        return weekFormatSales;
    }

    static async yearSalesFormat (sales , date){
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

            if(value.length > 0){
                yearFormatSales.push({...await SaleService.getSaleFormatAsync(value) , month: key , index: index})
            }
        }

        return yearFormatSales;
    }

    async getSalesDetails(duration , date) {
        let sale = (await SaleService.getSalesHistory(duration , date));

        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;
console.log(sale.length , 'saleLength')
        for (let step = 0; step < sale.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(sale[step].saleId));
            console.log(costPrice, 'costPrice')
            console.log(step, 'step')

        }

        for (let step = 0; step < sale.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(sale[step].saleId));
            console.log(profit, 'profit')

        }

        for (let step = 0; step < sale.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(sale[step].saleId));
            console.log(credit, 'credit')

        }

        for (let step = 0; step < sale.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(sale[step].saleId));
            console.log(sellingPrice, 'sellingPrice')

        }

        for (let step = 0; step < sale.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(sale[step].saleId));
            console.log(quantity, 'quantity')

        }

        console.log(costPrice , profit,credit,sellingPrice,quantity)

        if (duration === 'week') {
            sale = await SaleService.weekSalesFormat(sale , date);
        } else if (duration === 'month') {
            sale = await SaleService.monthSalesFormat(sale , date);
        } else if (duration === 'year') {
            sale = await SaleService.yearSalesFormat(sale , date);
        }

        console.log(sale)
        console.log(costPrice , profit,credit,sellingPrice,quantity)
        return {
            sales: sale.reverse(),
            costPrice: costPrice.toFixed(2),
            profit: profit.toFixed(2),
            credit: credit.toFixed(2),
            sellingPrice: sellingPrice.toFixed(2),
            quantity
        }
    }

    async getProductSalesDetails(duration , date , branchProductId) {
        let sale = (await SaleService.getProductSalesHistory(duration , date , branchProductId));

        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;

        for (let step = 0; step < sale.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(sale[step].saleId));
        }

        for (let step = 0; step < sale.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(sale[step].saleId));
        }

        if (duration === 'week') {
            sale = await SaleService.weekSalesFormat(sale , date);
        } else if (duration === 'month') {
            sale = await SaleService.monthSalesFormat(sale , date);
        } else if (duration === 'year') {
            sale = await SaleService.yearSalesFormat(sale , date);
        }

        return {
            sales: sale.reverse(),
            costPrice: costPrice.toFixed(2),
            profit: profit.toFixed(2),
            credit: credit.toFixed(2),
            sellingPrice: sellingPrice.toFixed(2),
            quantity
        }
    }

    async getAllSales (){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: LocalInfo.branchId,
                fxn: 'eq'
            }
        );

        return sales;

    }

    static async getHistorybyCustomer (id){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'id',
                value: id,
                fxn: 'eq'
            }
        );

        return sales;

    }

    async getAllCreditSales (id) {
        let invoice = await SaleService.getHistorybyCustomer(id);
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
