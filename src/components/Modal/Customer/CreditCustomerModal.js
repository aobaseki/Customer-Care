import React from "react";
import MainDialog from "../../Dialog/MainDialog";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Grid from '@material-ui/core/Grid';

const CreditCustomerModal = props => {
    
    const openState = props.openCustomerAddState;

    return (
        <div>
            <MainDialog handleDialogClose={props.handleClose} states={openState} >
                <div className="row p-3 pt-0 mx-auto text-center w-100" >
                    
                    <Grid container style={{paddingTop: "15px", textAlign: "center", marginBottom: "7px"}} direction="column" spacing={2} >
                        <Typography style={{fontSize: "1rem" , fontWeight: "600" }}>
                            Credit
                        </Typography>
                    </Grid>
                   
                    <Grid container style={{paddingTop: "15px", textAlign: "center", marginBottom: "7px"}} direction="column" spacing={2} >
                        <Typography style={{fontSize: "1rem" , fontWeight: "600" , color : "#DAAB59" }}>
                            GHC {props.debt} owned
                        </Typography>
                    </Grid>

                    <Grid container style={{paddingTop: "15px", textAlign: "center", marginBottom: "7px"}} direction="column" spacing={2} >
                        <Typography style={{fontSize: "1rem" , fontWeight: "600" }}>
                            Has the amount been paid?
                        </Typography>
                    </Grid>

                    <Grid container style={{paddingTop: "15px" , paddingBottom : "20px"}}>
                        <Grid item xs={6} sm container style={{padding: "0px 10px"}}>

                            <Button
                                variant="contained"
                                style={{
                                    width: '100%',
                                    'backgroundColor': '#ffff',
                                    borderRadius: '5px',
                                    color: '#DAAB59',
                                    border: '1px solid #DAAB59',
                                    padding: '5px 5px',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    marginTop: '8px',
                                    textTransform: 'none'
                                }}
                                
                            >
                                No
                            </Button>

                        </Grid>
                        <Grid item xs={6} sm container style={{padding: "0px 10px"}}>

                            <Button
                                variant="contained"
                                style={{
                                    width: '100%',
                                    'backgroundColor': '#DAAB59',
                                    borderRadius: '5px',
                                    color: '#ffff',
                                    border: '1px solid #DAAB59',
                                    padding: '5px 5px',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    marginTop: '8px',
                                    textTransform: 'none'
                                }}
                                
                            >
                                Yes
                            </Button>

                        </Grid>
                    </Grid>

                </div>
            </MainDialog>
        </div>
    )
};

export default CreditCustomerModal;
