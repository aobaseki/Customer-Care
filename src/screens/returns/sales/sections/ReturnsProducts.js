import React, { useState}  from "react";
import {withRouter } from "react-router-dom";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import SingleProduct from './singlePages/SingleProduct';
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import ModelAction from "../../../../services/ModelAction";

const ReturnsProducts = props => {

    const products = props.products;
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const storedCustomer = JSON.parse(localStorage.getItem("customerDetails"));

    const setView = (step) => {
        props.setView(step);
    };

    const updateSaleEntry =  async(pId, formFields) => {
        if (formFields.quantity === 0) {

            console.log('happy')
        }
        else {
            console.log('ok')
        }
    };

    const returnAll =  async(allProducts) => {

        /*
        *@todo create table for stock returns
        */
        try {
            for (let i=0; i<allProducts.length; i++) {
                await new ModelAction('SaleReturnHistories').post(allProducts[i]);

                await new ModelAction('Sales').softDelete(allProducts[i].saleId);
            }
                setSuccessMsg('Items deleted successfully');
                setSuccess(true);
                setTimeout(function () {
                    setSuccessMsg('');
                    setSuccess(false);
                    props.setView(0);
                }, 2000);

                return true;
        } catch (e) {
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function () {
                setErrorMsg('');
                setError(false);
                props.setView(0);
            }, 2000);
            return false;
        }

    };

    return (
        <div>
            <SectionNavbars
                title="Sales returns"
                leftIcon={
                    <div onClick={() => setView(0)} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={                  
                    <Button
                        variant="contained"
                        style={{'backgroundColor': 'white' , color: '#DAAB59', padding: '5px 20px', textTransform: 'none', fontSize:'17px'}}
                        onClick={returnAll.bind(this, products)} 
                    >
                        Return all
                    </Button>                  
                }
            />
            
            <SimpleSnackbar
                type="success"
                openState={success}
                message={successMsg}
            />

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            />

            <Paper style={{marginTop: '60px'}} >
                <Grid container style={{paddingTop: "7px"}} >
                    <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}  >  
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' style={{ marginLeft: '15px'}} >{storedCustomer.name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px', marginLeft: '15px'}}>{storedCustomer.date}</div>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px', marginLeft: '15px'}}> {storedCustomer.time}</div>
                        </div>
                    </Grid>

                    <Grid item xs={6} style={{ paddingTop: "10px" }} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#ffff' , padding: '5px 15px', height: '60px' , width: '80%', textTransform: 'none'}}
                        >
                            <Grid container>
                                <Grid item xs={12} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "13px"}}>
                                        Total cost :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "17px", fontWeight: "600"}}>
                                        GHC {storedCustomer.totalPrice}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>

                </Grid>
            </Paper>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {products.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No sales made
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    products.map((item) => <SingleProduct key={item.id} saleEntry={item} updateSaleEntry={updateSaleEntry.bind(this)} />)  
                }
            </Box>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '10px 50px', textTransform: 'none', fontSize: '17px'}}
                    onClick={() => setView(6)}
                >
                    Finish
                </Button>
            </Box>

        </div>
    )
}

export default withRouter(ReturnsProducts);