import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import { withRouter } from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";

const SingleCollectionView = props => {
    const pendingCollection = props.pendingCollection;

    const approveCollection = async() => {
        await confirmAlert({
            title: 'Confirm to approve',
            message: 'Are you sure you want to approve this collection.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async() => {
                        await props.approveCollection(pendingCollection.id)
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

            <Paper variant="outlined" style={{marginBottom: '30px', textAlign: 'center', width: '90%',marginLeft: '15px'}}>

                <Typography  style={{ fontSize: '18px', fontweight: '600',  marginBottom: '10px', marginTop: '10px'}} >
                    Collection from {pendingCollection.username}
                </Typography>

                <Typography className={`w-50 text-center`} style={{ fontSize: '18px', margin: '15px auto' , border: '1px solid #e5e5e5', borderRadius: '5px' , padding: '5px 10px'}} >
                    GHC {pendingCollection.amount}
                </Typography>

                <Button
                    type="submit"
                    variant="outlined"
                    style={{
                        border: '2px solid',
                        color: '#DAAB59',
                        padding: '4px 50px',
                        marginBottom: '15px',
                        textTransform: 'none',
                        fontSize:'15px',
                        fontWeight: '700'
                    }}
                    onClick={approveCollection}
                >
                        Approve
                </Button>
            </Paper>

        </div>
    )
}

export default withRouter(SingleCollectionView);
