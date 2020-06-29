import React from 'react';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withRouter } from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import LocalInfo from "../../../services/LocalInfo";
import HourglassEmptyRoundedIcon from "@material-ui/core/SvgIcon/SvgIcon";

const SingleCollectionView = props => {

    const collection = props.collection;

    const approveCollection = async() => {
        await confirmAlert({
            title: 'Confirm to approve',
            message: 'Are you sure you want to approve this collection.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async() => {
                        await props.approveCollection(collection.id)
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        })
    };

    const disapproveCollection = async() => {
        await confirmAlert({
            title: 'Confirm to disapprove collection',
            message: 'Are you sure you want to dissapprove this collection.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async() => {
                        await props.disapproveCollection(collection.id)
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        })
    };
    return (
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <div className='text-dark font-weight-bold'  style={{ paddingBottom: '5px', marginLeft: '10px'}}>{format(new Date(fromUnixTime(collection.dateAdded)) , "eeee, MMMM do, yyyy")}</div>
                        <div className="mt-1" style={{ fontSize: '16px', paddingBottom: '5px', marginLeft: '10px'}}>{collection.username}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px', marginLeft: '10px'}}>Collected: GHC {collection.amount}</div>
                    </div>
                </Grid>

                {
                    localStorage.getItem('employees') > 1 && LocalInfo.branchRole === 'owner' ?
                        <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '14px' }} >
                            {
                                collection.status === 'pending' ?
                                    <>
                                        <CheckCircleRoundedIcon
                                            onClick={approveCollection}
                                            style={{fontSize: '30px', color: '#DAAB59'}}
                                        />
                                        <br/>
                                        Approve
                                    </>
                                    :
                                    <>
                                        <CheckCircleIcon
                                            onClick={disapproveCollection}
                                            style={{fontSize: '30px', color: '#2B8870'}}
                                        />
                                        <br/>
                                        Approved
                                    </>
                            }
                        </Grid>
                        : ''
                }

                {
                    (!localStorage.getItem('employees')) && LocalInfo.branchRole === 'owner' ?
                        <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '14px' }} >
                            <CheckCircleIcon
                                onClick={disapproveCollection}
                                style={{fontSize: '30px', color: '#2B8870'}}
                            />
                            <br/>
                            Approved
                        </Grid>
                        : ''
                }

                {
                    LocalInfo.branchRole === 'attendant' ?
                        <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '14px' }} >
                            {
                                collection.status === 'pending' ?
                                    <>
                                        <HourglassEmptyRoundedIcon
                                            style={{fontSize: '30px', color: '#DAAB59'}}
                                        />
                                        <br/>
                                        Pending
                                    </>
                                    :
                                    <>
                                        <CheckCircleIcon
                                            style={{fontSize: '30px', color: '#2B8870'}}
                                        />
                                        <br/>
                                        Approved
                                    </>
                            }
                        </Grid>
                        : ''
                }
            </Grid>

        </div>
    )
}

export default withRouter(SingleCollectionView);
