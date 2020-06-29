import models from "../models/models";
import { Q } from '@nozbe/watermelondb'
import database from '../models/database';
import {v4 as uuid} from 'uuid';
import LocalInfo from "./LocalInfo";

export default class ModelAction {
    constructor(modelName) {
        this.model = models[modelName];
        this.table = models[modelName].table;
        this.database = database;
        this.columns = models[modelName].columns;
    }

    /*
    * @var
    * @return array of items
    * */
    index(){
        return this.database.collections.get(this.table).query().observe();
    }

    /*
    * @var
    * @return array of items
    * */
    indexNotObserve(){
        return this.database.collections.get(this.table).query().fetch();
    }

    /*
    * @var
    * @return object
    * */
    findByIdNotObserve(id){
        const dataCollection = this.database.collections.get(this.table);

        return dataCollection.find(id);
    }

    /*
    * @var
    * @return object
    * */
    findById(id){
        const dataCollection = this.database.collections.get(this.table);

        return dataCollection.findAndObserve(id);
    }

    findByColumn(column){
        const dataCollection = this.database.collections.get(this.table);

        return dataCollection.query(
            this.queryType(column)
        ).observe();
    }

    findByColumnNotObserve(column){
        const dataCollection = this.database.collections.get(this.table);

        return dataCollection.query(
            this.queryType(column)
        ).fetch();
    }

    /*
    * @var
    * @return array
    * */
    findByColumns(columns){
        const dataCollection = this.database.collections.get(this.table);

        //columns.map(column => console.log(column));
        return dataCollection.query(
            columns.map(column => this.queryType(column))
            //this.queryType(columns[0])
            //columns.map(column => this.queryType(column))
        ).observe();
    }

    /*
    *Create an item
    * @var
    * @return object
    * */
    async post(columns){
        const dataCollection = this.database.collections.get(this.table);
        let postItem = '';
        await this.database.action(async () => {
            postItem = await dataCollection.create(item => {
                item._raw.id = uuid();
                item.createdBy = LocalInfo.userId;
                this.columns.map((column) => item[column] = columns[column])
            });
        });

        return postItem;
    }

    /*
    *Create an item
    * @var
    * @return object
    * */
    async update(id , columns){
        const dataCollection = await this.database.collections.get(this.table).find(id);
console.log(columns)
        let postItem = '';

        await this.database.action(async () => {
            postItem = await dataCollection.update(item => {
                this.columns.map((column) => {
                    if(columns.hasOwnProperty(column)){
                        item[column] = columns[column]
                    }
                })
            });
        });

        return postItem;
    }

    /*
    *Delete an item
    * @var
    * @return object
    * */
    async softDelete(id){
        const dataCollection = await this.database.collections.get(this.table).find(id);

        await this.database.action(async () => {
            await dataCollection.markAsDeleted() // syncable
        })
    }

    async softDeleteByColumn(column){
        const dataCollection = await this.database.collections.get(this.table).query(
            this.queryType(column)
        ).fetch();

        dataCollection.map(item => {
            this.database.action(async () => {
                await item.destroyPermanently() // syncable
            })
        })
    }

    /*
    *Delete an item
    * @var
    * @return object
    * */
    async destroy(id){
        const dataCollection = await this.database.collections.get(this.table).find(id);

        await this.database.action(async () => {
            await dataCollection.destroyPermanently() // permanent
        })
    }

    /*
    * @todo query like the available query parameters
    * */
    queryType(column) {
        switch (column.fxn) {
            case 'eq':
                return Q.where(column.name , Q.eq(column.value));
            case 'notEq':
                return Q.where(column.name , Q.notEq(column.value));
            case 'gt':
                return Q.where(column.name , Q.gt(column.value));
            case 'weakGt':
                return Q.where(column.name , Q.weakGt(column.value));
            case 'gte':
                return Q.where(column.name , Q.gte(column.value));
            case 'lt':
                return Q.where(column.name , Q.lt(column.value));
            case 'lte':
                return Q.where(column.name , Q.lte(column.value));
            case 'between':
                return Q.where(column.name , Q.between(column.min , column.max));
            case 'oneOf':
                return Q.where(column.name , Q.oneOf(column.value));
            case 'notIn':
                return Q.where(column.name , Q.notIn(column.value));
            case 'like':
                return Q.where(column.name , Q.like(`%${Q.sanitizeLikeString(column.value)}%`));
            case 'notLike':
                return Q.where(column.name , Q.notLike(`%${Q.sanitizeLikeString(column.value)}%`));
            default:
                return Q.where(column.name , Q.eq(column.value));

        }
    }
}
