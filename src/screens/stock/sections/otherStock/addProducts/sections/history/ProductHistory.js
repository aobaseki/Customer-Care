import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import {confirmAlert} from "react-confirm-alert";
import format from 'date-fns/format'
import fromUnixTime from 'date-fns/fromUnixTime';

const productHistory = props => {
    const history = props.item;
    console.log(history);
    //console.log(history);

    const deleteHistoryHandler = (event) => {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this item.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.deleteHistory(history.id)
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

    return(
        <div className={`rounded mx-1 my-2 p-2 bordered`}>
            <Grid container spacing={1} className={`mb-2`}>
                <Grid
                    item xs={9}
                    className={`text-left pl-2`}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '18px'}}
                        className={`text-left text-dark font-weight-bold`}
                    >
                        {`${history.quantity} packs added`}
                    </Typography>

                    <div>{format(new Date(fromUnixTime(history.created_at / 1000)) , "eeee, MMMM do, yyyy")}</div>
                    <div>{format(new Date(fromUnixTime(history.created_at / 1000)) , "HH:mm a")}</div>
                </Grid>

                <Grid
                    item xs={3}
                    className={`pl-2 pt-3 mx-auto`}
                >
                    <div className={`deleteIcon`}
                         onClick={deleteHistoryHandler}
                    >
                        <DeleteIcon
                            style={{fontSize: '30px', color: '#DAAB59'}}
                        /><br/>
                        Delete
                    </div>

                </Grid>
            </Grid>
        </div>
    )
};

export default productHistory;
