import React from 'react';
import MainDialog from '../../Dialog/ProductDialog';
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import paths from "../../../utilities/paths";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";

const DeleteProductModal = props => {
    
    const { history } = props;
    const openState = props.openState;

    return(
        <div>
            <MainDialog handleDialogClose={props.handleClose} states={openState} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Typography
                        component="h2"
                        variant="h5"
                        style={{fontSize: '15px' , padding: '40px 0px'}}
                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-light`}
                    >
                        Are you sure you want to delete this product from your store? This action cannot be reversed.
                    </Typography>

                    <Grid container >
                        <Grid item xs={6} >
                            <Button
                                variant="outlined"
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none'}}
                                onClick={props.handleClose.bind(this)}
                            >
                                No, keep
                            </Button>
                        </Grid>
                        <Grid item xs={6} >
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px', textTransform: 'none'}}
                                onClick={props.onClick}
                                //disabled={loading}
                            >
                                Yes, delete
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </MainDialog>

        </div>
    )

}

export default withRouter(DeleteProductModal);