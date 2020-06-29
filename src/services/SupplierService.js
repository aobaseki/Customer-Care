import entities from "../config/supplierEntities";
import ModelAction from "./ModelAction";
import LocalInfo from "./LocalInfo";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import database from "../models/database";
import BranchSupplierProducts from "../models/branchSupplierProducts/BranchSupplierProducts";
import {v4 as uuid} from "uuid";
import BranchSupplierOrder from "../models/branchSupplierOrder/BranchSupplierOrder";
import BranchSuppliers from "../models/branchSuppliers/BranchSuppliers";

export default class SupplierService {
    static async stockOrderId() {
        if(!await database.adapter.getLocal("stockOrderId")){
            const supplierId = localStorage.getItem("supplierId");

            const dataCollection = database.collections.get(BranchSupplierOrder.table);
            // const workingDate = await database.adapter.getLocal("workingDate");

            await database.action(async () => {
                const newOrder = await dataCollection.create(order => {
                    order.branchSupplierId = supplierId;
                    order.branchId = LocalInfo.branchId;
                    order.orderDate = LocalInfo.workingDate;
                    order.createdBy = LocalInfo.userId;
                    order._raw.id = uuid()
                });
                /*
                * @todo why 2 carts are created
                * */
                await database.adapter.setLocal("stockOrderId" , await newOrder.id);
            });
        }

        const stockOrderId = await database.adapter.getLocal("stockOrderId");
        localStorage.setItem('stockOrderId' , stockOrderId);

        return stockOrderId;
    }

    static async stockOrderProducts() {
        const stockOrderId = await SupplierService.stockOrderId();

        let orderProducts = new ModelAction('BranchProductStock').findByColumnNotObserve({
            name: 'branchSupplierOrderId',
            value: stockOrderId,
            fxn: 'eq',
        });

        return orderProducts;
    }

    static async supplierAggregator(){
        let dataset = [];
        const entityTypes = entities.entities;

        for(let i = 0; i < entityTypes.length; i++){
            const results = await new ModelAction(entityTypes[i].entity).indexNotObserve();

            const formattedResults = results.map((row) => {
                return (entityTypes[i].fields).map((field) => {
                    return {
                        field: row[field],
                    }
                })
            });

            dataset = dataset.concat(formattedResults);
        }

        return dataset;
    }

    static async getSuppliers(entity){
        const results = await new ModelAction(entity).indexNotObserve();

        const entityItem = ((entities.entities).filter((item) => item.entity === entity))[0];

        return Array.from(results , (row) => {
            let name = "";

            name = (entityItem.nameFields).map(field =>
                `${name} ${row[field]}`
            );

            return {
                id: row.id,
                name: (name.join('')).trim(),
                entity: entityItem.entity,
                entityName: entityItem.name,
                contact: entityItem.contact ? row[entityItem.contact] : ""
            }
        });
    }

    async searchSupplier(value){
        try {
            const suppliers = await database.collections.get(BranchSuppliers.table).query(
                Q.where('branchId' , LocalInfo.branchId),
                Q.or(
                    Q.where('name' , Q.like(`${Q.sanitizeLikeString(value)}%`)),
                    Q.and(
                        Q.where('contact' , Q.like(`${Q.sanitizeLikeString(value)}%`))
                    )
                )
                ).fetch();

            return suppliers;
        }catch (e) {
            console.log(e)
        }
    }
    /*
    * @todo
    * 1. check if there is an entity,
    * 2. if entity
    *   a. Create supplier
    * 3. else entity
    *   a. create entity
    *   b. create supplier
    * 4. If salesperson create salesperson
    *
    * */
    async addSupplier(data){
        let supplier = "";
        let salesperson = "";

        if(data.entityId === ""){
            let entity = "";

            try {
                switch(data.entityType){
                    case 'SuppliersCompany':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name,
                            contact: data.contact,
                            isTemporary: true,
                            createdBy: LocalInfo.userId
                        });
                    break;
                    case 'Customer':
                        const nameSplit = (data.name).split(' ');

                        entity = await new ModelAction(data.entityType).post({
                            firstName: nameSplit[0],
                            otherNames: nameSplit.slice(1 , nameSplit.length).join(' '),
                            phone: data.contact,
                            isTemporary: true,
                            createdBy: LocalInfo.userId
                        });

                        const branchCustomerColumns = {
                            branchId: LocalInfo.branchId,
                            createdBy: LocalInfo.userId,
                            customerId: entity.id,
                        };

                        try {
                            await new ModelAction('BranchCustomer').post(branchCustomerColumns);
                        }catch (e) {
                            console.log(e);
                            return false;
                        }
                    break;

                    case 'Brand':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name
                        });
                    break;
                    case 'Manufacturer':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name
                        });
                    break;
                }
            }catch (e){
                console.log(e);
            }

            console.log(entity);
            data.entityId = entity.id;
        }

        try {
            supplier = await new ModelAction('BranchSuppliers').post({
                entityId: data.entityId,
                entityType: data.entityType,
                name: data.name,
                contact: data.contact,
                branchId: LocalInfo.branchId,
                createdBy: LocalInfo.userId,
                deliveryDays: JSON.stringify(data.deliveryDays),
            });
        }catch (e){
            console.log(e);
        }

        if(supplier){
            if(data.salespersonName){
                try {
                    salesperson = await new ModelAction('BranchSupplierSalespersons').post({
                        branchSupplierId: supplier.id,
                        name: data.salespersonName,
                        contact: data.salespersonContact,
                        branchId: LocalInfo.branchId,
                        createdBy: LocalInfo.userId,
                    });
                }catch (e){
                    console.log(e);
                }
            }

            localStorage.setItem("supplierId" , supplier.id);
            localStorage.setItem("supplierName" , supplier.name);
            return supplier;
        }


        return false;
    }

    async editSupplier(data){
        const branchSuppliers = await SupplierService.getBranchSuppliers();
        const branchSupplier = ((branchSuppliers).filter((item) => item.id === (localStorage.getItem("supplierId"))))[0];

        let supplier = "";
        let salesperson = "";

        if(data.entityId === ""){
            let entity = "";

            try {
                switch(data.entityType){
                    case 'SuppliersCompany':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name,
                            contact: data.contact,
                            isTemporary: true,
                            createdBy: LocalInfo.userId
                        });
                        break;
                    case 'Customer':
                        const nameSplit = (data.name).split(' ');

                        entity = await new ModelAction(data.entityType).post({
                            firstName: nameSplit[0],
                            otherNames: nameSplit.slice(1 , nameSplit.length).join(' '),
                            phone: data.contact,
                            isTemporary: true,
                            createdBy: LocalInfo.userId
                        });

                        const branchCustomerColumns = {
                            branchId: LocalInfo.branchId,
                            createdBy: LocalInfo.userId,
                            customerId: entity.id,
                        };

                        try {
                            await new ModelAction('BranchCustomer').post(branchCustomerColumns);
                        }catch (e) {
                            console.log(e);
                            return false;
                        }
                        break;

                    case 'Brand':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name
                        });
                        break;
                    case 'Manufacturer':
                        entity = await new ModelAction(data.entityType).post({
                            name: data.name
                        });
                        break;
                }
            }catch (e){
                console.log(e);
            }

            console.log(entity);
            data.entityId = entity.id;
        }

        const columns = {
            entityId: data.entityId,
            entityType: data.entityType,
            name: data.name,
            contact: data.contact,
            branchId: branchSupplier.branchId,
            createdBy: branchSupplier.createdBy,
            deliveryDays: JSON.stringify(data.deliveryDays),
        };

        try {
            return await new ModelAction('BranchSuppliers').update(branchSupplier.id, columns);
        }catch (e){
            console.log(e);
        }

        return false;
    }

    static async productExistInBranch(productId){
        const dataCollection = await database.collections.get(BranchSupplierProducts.table);
        const supplierId = localStorage.getItem("supplierId");

        const product = await dataCollection.query(
            Q.where('branchSupplierId' , supplierId),
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('branchProductId' , productId),
        ).fetch();

        //console.log(product)

        if(product.length > 0){
            return true
        }else {
            return false
        }
        //return (product.length > 0)();
    }

    static getSupplierDays(deliveryDays){
        let days = '';

        for (let [key, value] of Object.entries(JSON.parse(deliveryDays))) {
            if(key !== 'Everyday'){
                days = value ? `${days} ${key},` : '';
            }

            console.log(`${key}: ${value}`);
        }

        return days.trim();
    }

    async addProductToSupplier(product){
        try {
            return await new ModelAction('BranchSupplierProducts').post({
                branchProductId: product.id,
                branchSupplierId: localStorage.getItem("supplierId"),
                productId: product.productId,
                branchId: LocalInfo.branchId,
                createdBy: LocalInfo.userId
            });
        }catch (e) {
            console.log(e)
        }
    }

    async removeProductFromSupplier(product){
        console.log(product)
        const dataCollection = await database.collections.get(BranchSupplierProducts.table);
        const supplierId = localStorage.getItem("supplierId");

        try {
            const items = await dataCollection.query(
                Q.where('branchSupplierId' , supplierId),
                Q.where('branchProductId' , product.id),
            ).fetch();

            await database.action(async () => {
                await items[0].markAsDeleted();
            })

            return true;
        }catch (e) {
            console.log(e)
        }
    }

    static async getSupplierProductsCount(){
        const dataCollection = await database.collections.get(BranchSupplierProducts.table);
        const supplierId = localStorage.getItem("supplierId");

        try {
            const count = await dataCollection.query(
                Q.where('branchSupplierId' , supplierId),
                Q.where('branchId' , LocalInfo.branchId),
            ).fetchCount();

            return count;
        }catch (e) {
            console.log(e)
        }
    }

    static async getBranchSuppliers(branchId = LocalInfo.branchId){
        return await new ModelAction('BranchSuppliers').findByColumnNotObserve({
            name: 'branchId',
            value: branchId,
            fxn: 'eq'
        });
    }

    async makePaymentInstallments(formFields){
        try{
            const response = await new ModelAction('BranchSupplierOrderPaymentInstallment').post({
                branchSupplierOrderId: await SupplierService.stockOrderId(),
                branchSupplierId: localStorage.getItem("supplierId"),
                branchSupplierSalespersonId: formFields.salesperson,
                branchId: LocalInfo.branchId,
                amount: parseFloat(formFields.amountPaid),
                createdBy: LocalInfo.userId
            });

            if(response){
                await database.adapter.removeLocal("stockOrderId");
                localStorage.removeItem("stockOrderId");

                return true;
            }
        }catch (e) {
            console.log(e);
        }
    }

    static async getOrderEntityTotal(stock){
        return ((await stock).reduce((a, b) => parseFloat(a) + parseFloat((b.quantity * b.costPrice) || 0), 0)).toFixed(2);
    }

    static async getOrderEntityPaymentsTotal(order){
        console.log(await order.payments())
        return ((await order.payments()).reduce((a, b) => parseFloat(a) + parseFloat((b.amount) || 0), 0)).toFixed(2);
    }

    static async getSuppliedAmountOwed(orders , payments){
        const branchOrders = await orders;
        const branchPayments = await payments;

        let branchOrdersTotal = 0;
        const branchOrdersTotalPayments = ((branchPayments).reduce((a, b) => parseFloat(a) + parseFloat((b.amount) || 0), 0)).toFixed(2);

        for (let i = 0; i < branchOrders.length; i++){
            branchOrdersTotal += parseFloat(await SupplierService.getOrderEntityTotal(branchOrders[i].stocks()));
        }

        console.log(branchOrdersTotal , branchOrdersTotalPayments , branchPayments)
        return parseFloat(branchOrdersTotal - branchOrdersTotalPayments);
    }

    async getBranchSupplierProducts(supplierId = localStorage.getItem("supplierId") , branchId = LocalInfo.branchId){
        //const products = await new ModelAction('BranchSupplierProducts').findByColumn();

        const dataCollection = await database.collections.get(BranchSupplierProducts.table);

        try {
            const products = await dataCollection.query(
                Q.where('branchSupplierId' , supplierId),
                Q.where('branchId' , LocalInfo.branchId),
            ).fetch();

            const ids = products.map(product => {
                return product.branchProductId;
            });

            const branchSupplierProducts = await new ModelAction('BranchProduct').findByColumnNotObserve({
                name: 'id',
                value: ids,
                fxn: 'oneOf'
            });

            console.log(branchSupplierProducts)
            return branchSupplierProducts;
        }catch (e) {
            console.log(e)
        }
    }

    /*
    * Search for a branch product
    * */
    async searchBranchSupplierProduct(searchValue) {
        const products = await new ModelAction('Product').findByColumnNotObserve({
            name: 'name',
            value: searchValue,
            fxn: 'like'
        });

        const ids = products.map(product => {
            return product.id;
        });

        const branchSupplierProducts = await new ModelAction('BranchSupplierProducts').findByColumnNotObserve({
            name: 'productId',
            value: ids,
            fxn: 'oneOf'
        });

        return database.collections.get('branches_products').query(Q.where('productId',
            Q.oneOf(branchSupplierProducts.map(p => p.productId))), Q.where('branchId', LocalInfo.branchId)).fetch();
    }
}
