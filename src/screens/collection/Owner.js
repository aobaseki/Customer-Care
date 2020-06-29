import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import OwnerMainPage from './owner/OwnerMainPage';
import CollectionHistory from './owner/CollectionHistory';
import AddCollection from "./owner/addCollection";
import CashflowService from "../../services/CashflowService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import LocalInfo from "../../services/LocalInfo";
import Cashflow from "../../models/cashflow/Cashflow";
import getUnixTime from 'date-fns/getUnixTime';
import database from "../../models/database";
import format from "date-fns/format";
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import AddCollectionOwner from "./owner/addCollectionOwner";
import AttendantMainPage from "./owner/AttendantMainPage";
const day = format(new Date() , 'MM/dd/yyyy');

const selectedDay = format(new Date(localStorage.getItem('collectionDate')) , 'MM/dd/yyyy');

class Owner extends Component {
    state={
        activeStep: LocalInfo.branchRole === 'owner' ? 0 : 4,
        todayCollection:[],
        pendingCollection:[],
        collections: [],
        branchDetails: {
            total: 0,
            profit: 0,
            credit: 0,
            purchases: 0,
        },
        selectedDate: day,
        dateCollections: [],
        approvedCollections: [],
    };

    async componentDidMount() {
        const {  myDateCollections , myTodayCollection, todayCollection , approvedCollections, pendingCollection , collections , dateCollections} = this.props;

        await this.setState({
            todayCollection: LocalInfo.branchRole === 'owner' ? todayCollection.reverse() : myTodayCollection.reverse(),
            pendingCollection: pendingCollection.reverse(),
            collections: collections.reverse(),
            branchDetails: await new CashflowService().getDateSalesDetails('day' , LocalInfo.workingDate),
            dateCollections: LocalInfo.branchRole === 'owner' ? myDateCollections.reverse() : dateCollections.reverse(),
            approvedCollections: approvedCollections.reverse()
        });
    }

    async componentDidUpdate(prevProps) {
        const {  myDateCollections , myTodayCollection , todayCollection , approvedCollections, pendingCollection , collections , dateCollections} = this.props;
        console.log('#######################')
        console.log(todayCollection)
        console.log('#######################')
        if(collections.length !== prevProps.collections.length || todayCollection.length !== prevProps.todayCollection.length || pendingCollection.length !== prevProps.pendingCollection.length || approvedCollections.length !== prevProps.approvedCollections.length){
            await this.setState({
                todayCollection: LocalInfo.branchRole === 'owner' ? todayCollection.reverse() : myTodayCollection.reverse(),
                pendingCollection: pendingCollection.reverse(),
                collections: collections.reverse(),
                branchDetails: await new CashflowService().getDateSalesDetails('day' , LocalInfo.workingDate),
                dateCollections: LocalInfo.branchRole === 'owner' ? myDateCollections.reverse() : dateCollections.reverse(),
                approvedCollections: approvedCollections.reverse()
            });
        }
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <OwnerMainPage branchDetails={this.state.branchDetails} disapproveCollection={this.disapproveCollection.bind(this)} approveCollection={this.approveCollection.bind(this)} setView={this.setStepContentView.bind(this)} pendingCollection={this.state.pendingCollection} collection={this.state.approvedCollections} />;
            case 1:
                return <CollectionHistory changeCollectionDate={this.changeCollectionDateHistory.bind(this)} disapproveCollection={this.disapproveCollection.bind(this)} approveCollection={this.approveCollection.bind(this)} setView={this.setStepContentView.bind(this)} collection={this.state.dateCollections} />;
            case 2:
                return <AddCollection branchDetails={this.state.branchDetails} addNewCollection={this.addNewCollection.bind(this)} setView={this.setStepContentView.bind(this)} collection={this.state.todayCollection} />;
            case 3:
                return <AddCollectionOwner changeCollectionDate={this.changeCollectionDate.bind(this)} branchDetails={this.state.branchDetails} addNewCollection={this.addNewCollection.bind(this)} setView={this.setStepContentView.bind(this)} collection={this.state.todayCollection} />;
            case 4:
                return <AttendantMainPage addNewCollection={this.addNewCollection.bind(this)} branchDetails={this.state.branchDetails} disapproveCollection={this.disapproveCollection.bind(this)} approveCollection={this.approveCollection.bind(this)} setView={this.setStepContentView.bind(this)} collection={this.state.todayCollection} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async changeCollectionDate(day){
        localStorage.setItem('collectionDate' , format(new Date(day), 'MM/dd/yyyy'));

        this.setState({
            selectedDate: format(new Date(day), 'MM/dd/yyyy')
        });
    }

    async changeCollectionDateHistory(day){
        let col = [];

        if(LocalInfo.branchRole === 'owner'){
            col = await database.collections.get(Cashflow.table).query(
                Q.where('branchId' , LocalInfo.branchId),
                Q.where('dateAdded' , Q.between(getUnixTime(startOfDay(new Date(day))) , getUnixTime(endOfDay(new Date(day)))))
            ).fetch();
        }else {
            col = await database.collections.get(Cashflow.table).query(
                Q.where('branchId' , LocalInfo.branchId),
                Q.where('createdBy' , LocalInfo.userId),
                Q.where('dateAdded' , Q.between(getUnixTime(startOfDay(new Date(day))) , getUnixTime(endOfDay(new Date(day)))))
            ).fetch()
        }
        console.log(col)
        this.setState({
            selectedDate: format(new Date(day), 'MM/dd/yyyy'),
            dateCollections: col
        });
    }

    async addNewCollection(formFields){
        try {
            const response = await CashflowService.addCollection(formFields);
            if(response){
                /*let col = [];

                if(LocalInfo.branchRole === 'owner'){
                    col = await database.collections.get(Cashflow.table).query(
                        Q.where('branchId' , LocalInfo.branchId),
                        Q.where('dateAdded' , Q.between(getUnixTime(startOfDay(new Date(day))) , getUnixTime(endOfDay(new Date(day)))))
                    ).fetch();
                }else {
                    col = await database.collections.get(Cashflow.table).query(
                        Q.where('branchId' , LocalInfo.branchId),
                        Q.where('createdBy' , LocalInfo.userId),
                        Q.where('dateAdded' , Q.between(getUnixTime(startOfDay(new Date(day))) , getUnixTime(endOfDay(new Date(day)))))
                    ).fetch()
                }
                console.log(col)
                this.setState({
                    todayCollection: col.reverse()
                });*/
                return response;
            }else {
                return false;
            }
        }catch (e) {
            console.log(e)
        }
    }

    async approveCollection(id){
        try {
            const response = await CashflowService.approveCollection(id);

            if(response){
                return response;
            }else {
                return false;
            }
        }catch (e) {
            console.log(e)
        }
    }

    async disapproveCollection(id){
        try {
            const response = await CashflowService.disapproveCollection(id);

            if(response){
                /*await this.setState({
                    todayCollection: await CashflowService.getTodayCollections(),
                    pendingCollection: await CashflowService.getTodayPendingCollections()
                });*/
                return response;
            }else {
                return false;
            }
        }catch (e) {
            console.log(e)
        }
    }

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

const EnhancedOwner = withDatabase(
    withObservables(['todayCollection' ,'myDateCollections' , 'myTodayCollection' , 'pendingCollection' , 'approvedCollections', 'collections' , 'dateCollections'], ({ database , todayCollection, myDateCollections , myTodayCollection, pendingCollection ,approvedCollections, collections , dateCollections }) => ({
        todayCollection: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('dateAdded' , Q.between(getUnixTime(startOfDay(new Date(LocalInfo.workingDate))) , getUnixTime(endOfDay(new Date(LocalInfo.workingDate)))))
        ).observe(),
        myTodayCollection: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('createdBy' , LocalInfo.userId),
            Q.where('dateAdded' , Q.between(getUnixTime(startOfDay(new Date(LocalInfo.workingDate))) , getUnixTime(endOfDay(new Date(LocalInfo.workingDate)))))
        ).observe(),
        pendingCollection: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('status' , 'pending'),
            Q.where('dateAdded' , Q.between(getUnixTime(startOfDay(new Date(selectedDay))) , getUnixTime(endOfDay(new Date(selectedDay)))))
        ).observe(),
        collections: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
        ).observe(),
        dateCollections: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
        ).observe(),
        myDateCollections: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('createdBy' , LocalInfo.userId),
        ).observe(),
        approvedCollections: database.collections.get(Cashflow.table).query(
            Q.where('branchId' , LocalInfo.branchId),
            Q.where('status' , 'approved')
        ).observe(),
    }))(withRouter(Owner))
);

export default withRouter(EnhancedOwner);
