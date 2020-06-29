import LocalInfo from "./LocalInfo";
import getUnixTime from 'date-fns/getUnixTime';
import PurchaseService from "./PurchaseService";
import BranchStockService from "./BranchStockService";
import OrderService from "./OrderService";
import SaleService from "./SaleService";
import database from "../models/database";
import BranchProductStock from "../models/branchesProductsStocks/BranchProductStock";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import SupplierService from "./SupplierService";
import CashflowCategory from "../models/cashflowCategories/CashflowCategory";
import Cashflow from "../models/cashflow/Cashflow";

export default class ReconcilationService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    static async daySalesFormat(purchases, orders, sales, expenses, collections){

    }

    static async getExpenses(branchId, startDate , endDate) {
        return database.collections.get(BranchProductStock.table).query(
            Q.where('dateAdded' , Q.between(startDate , endDate)),
            Q.where('branchId' , branchId),
            Q.where('status' , 'cash-out')
        ).fetch();
    }

    static async getCollections(branchId, startDate , endDate){
        const collectionCategories = await database.collections.get(CashflowCategory.table).query(
            Q.where('name' , 'Sales')
        ).fetch();

        return await database.collections.get(Cashflow.table).query(
            Q.where('dateAdded' , Q.between(startDate , endDate)),
            Q.where('status' , 'approved'),
            Q.where('categoryId' , collectionCategories[0].id),
            Q.where('branchId' , branchId),
        ).fetch();
    }

    async getBranchReconcilationDetails(duration , startDate , endDate){
        const sDate = getUnixTime(new Date(startDate));
        const eDate = getUnixTime(new Date(endDate));
        let allPurchasesTotal = 0;
        let letOrdersTotal = 0;
        let letCreditSalesTotal = 0;
        let letSalesTotal = 0;
        let expensesTotal = 0;
        let ordersTotalPaid = 0;
        let collectionsTotal = 0;
        let reconciliationData = [];

        console.log(duration , sDate , eDate);

        const purchases = await PurchaseService.getPuchasesInDuration(this.branchId , sDate , eDate);
        const orders = await OrderService.getOrdersInDuration(this.branchId , sDate , eDate);
        const sales = await SaleService.getSalesHistoryInDuration(this.branchId , sDate , eDate);
        const expenses = await ReconcilationService.getExpenses(this.branchId , sDate , eDate);
        const collections = await ReconcilationService.getCollections(this.branchId , sDate , eDate);

        for (let step = 0; step < purchases.length; step++) {
            allPurchasesTotal += parseFloat(await BranchStockService.getStockEntryCostPriceById(purchases[step].id));
        }

        for (let step = 0; step < collections.length; step++) {
            collectionsTotal += parseFloat(collections[step].amount);
        }

        for (let step = 0; step < sales.length; step++) {
            letCreditSalesTotal += parseFloat(await SaleService.getSaleEntryCreditById(sales[step].saleId));
        }

        for (let step = 0; step < sales.length; step++) {
            letSalesTotal += parseFloat(await SaleService.getSaleEntrySellingPriceById(sales[step].saleId));
        }

        for (let step = 0; step < expenses.length; step++) {
            expensesTotal += parseFloat(expenses[step].amount);
        }

        for (let step = 0; step < orders.length; step++) {
            letOrdersTotal += parseFloat(await SupplierService.getOrderEntityTotal(orders[step]));
        }

        for (let step = 0; step < orders.length; step++) {
            ordersTotalPaid += parseFloat(await SupplierService.getOrderEntityPaymentsTotal(orders[step]));
        }

        /*if (duration === 'day'){
            reconciliationData = await ReconcilationService.daySalesFormat(purchases, orders, sales, expenses, collections);
        } else if (duration === 'week') {
            reconciliationData = await SaleService.weekSalesFormat(sale);
        } else if (duration === 'month') {
            reconciliationData = await SaleService.monthSalesFormat(sale , date);
        } else if (duration === 'year') {
            reconciliationData = await SaleService.yearSalesFormat(sale , date);
        }*/

        return {
            data: reconciliationData,
            salesTotal: letSalesTotal,
            expensesTotal: expensesTotal,
            creditTotal: letCreditSalesTotal,
            purchasesTotal: allPurchasesTotal - (letOrdersTotal - ordersTotalPaid),
            collections: collectionsTotal
        }
    }
}
