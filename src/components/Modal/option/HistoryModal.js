import React from 'react';
import MainDialog from '../../Dialog/ProductDialog';
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import paths from "../../../utilities/paths";

const HistoryModal = props => {

    const { history } = props;
    const openState = props.openState;

    return(
        <div>
            <MainDialog handleDialogClose={props.handleClose} states={openState} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Typography
                        component="h2"
                        variant="h5"
                        style={{fontSize: '18px' , padding: '20px 0px'}}
                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-bold`}
                    >
                        What history would you like to view?
                    </Typography>

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '30px, 0px', textTransform: 'none', fontSize:'17px', marginBottom: '20px', width: '240px'}}
                        onClick={() => history.push(paths.sales_history)}
                    >
                        Sales history
                    </Button>

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '30px, 0px', textTransform: 'none', fontSize:'17px', marginBottom: '20px', width: '240px'}}
                        onClick={() => history.push(paths.purchase_history)}
                    >
                        Purchase history
                    </Button>

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '10px, 0px', textTransform: 'none', fontSize:'17px', marginBottom: '20px', width: '240px'}}
                        onClick={() => history.push(paths.stock_movement)}
                    >
                        Stock movement
                    </Button>

                </div>
            </MainDialog>

        </div>
    )

}

export default withRouter(HistoryModal);
