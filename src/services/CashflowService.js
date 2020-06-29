import categories from "../config/cashflowCategories";
import ModelAction from "./ModelAction";
import LocalInfo from "./LocalInfo";
import getUnixTime from 'date-fns/getUnixTime';
import format from "date-fns/format";
import database from "../models/database";
import Cashflow from "../models/cashflow/Cashflow";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import BranchProductStock from "../models/branchesProductsStocks/BranchProductStock";
import BranchProductStockHistory from "../models/branchesProductsStocksHistories/BranchProductStockHistory";
import SaleService from "./SaleService";
import PurchaseService from "./PurchaseService";

export default class CashflowService {
    static async exportDefaultCashflowCategories() {
        const entities = categories.categories;
        for (let i = 0; i < entities.length; i++){
            const category = entities[i];

            await new ModelAction('CashflowCategory').post(category);
        }

        const items = await new ModelAction('CashflowCategory').indexNotObserve();

        console.log(items)
        return items;
    }

    static async addCollection(formFields) {
        const category = await new ModelAction('CashflowCategory').findByColumnNotObserve({
            name: 'name',
            value: formFields.category,
            fxn: 'eq'
        });

        return await new ModelAction('Cashflow').post({
            amount: parseFloat(formFields.amount),
            type: formFields.type,
            categoryId: category[0].id,
            branchId: LocalInfo.branchId,
            username: LocalInfo.userFullName,
            status: formFields.status || 'pending',
            createdBy: LocalInfo.userId,
            dateAdded: getUnixTime(new Date(LocalInfo.workingDate)),
        });
    }

    static async getTodayCollections(){
        const day = format(new Date() , 'MM/dd/yyyy');
        const dataCollection = await database.collections.get(Cashflow.table);

        return await dataCollection.query(
            //Q.where('status' , 'pending'),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , getUnixTime(new Date(day)))
        ).fetch();
    }

    static async getTodayPendingCollections(){
        const day = format(new Date() , 'MM/dd/yyyy');
        const dataCollection = await database.collections.get(Cashflow.table);

        return await dataCollection.query(
            Q.where('status' , 'pending'),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , getUnixTime(new Date(day)))
        ).fetch();
    }

    static async approveCollection(id){
        console.log(id)
        return await new ModelAction('Cashflow').update(id , {
            status: 'approved',
            statusChangedBy: LocalInfo.userId
        });
    }

    static async disapproveCollection(id){
        console.log(id)
        return await new ModelAction('Cashflow').update(id , {
            status: 'pending'
        });
    }

    static async changeCollectionDate(value) {
        const day = format(new Date(value) , 'MM/dd/yyyy');
        const dataCollection = await database.collections.get(Cashflow.table);

        return await dataCollection.query(
            Q.where('status' , 'pending'),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , getUnixTime(new Date(day)))
        ).fetch();
    }

    static makeStockLegit = async () => {
        const branchProductStock = await database.collections.get(BranchProductStock.table).query().fetch();
        const branchProductStockHistory = await database.collections.get(BranchProductStockHistory.table).query().fetch();

        for (let i = 0; i < branchProductStock.length; i++){
            const branchP = branchProductStock[i];
            const stockDate = branchP._raw.updated_at / 1000;

            await new ModelAction('BranchProductStock').update(branchP.id , {
                stockDate: stockDate
            });
        }

        for (let i = 0; i < branchProductStockHistory.length; i++){
            const branchC = branchProductStockHistory[i];
            const stockDate = branchC._raw.updated_at / 1000;
            await new ModelAction('BranchProductStockHistory').update(branchC.id , {
                stockDate: stockDate
            });
        }
    }

    async getDateSalesDetails(duration , day) {
        const sales = await new SaleService().getSalesDetails(duration , day);
        const purchases = await new PurchaseService().getPurchaseDetails(duration , day);

        return {
            total: sales.sellingPrice,
            profit: sales.profit,
            credit: sales.credit,
            purchases: purchases.costPrice
        };
    }
}
