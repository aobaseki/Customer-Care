import React from "react";
import {withRouter } from "react-router-dom";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button/Button";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import SingleProduct from './singlePages/SingleProduct';

const ReturnsProducts = props => {

    const supplier = props.supplier;
    const products = props.products;

    const setView = (step) => {
        props.setView(step);
    };

    return (
        <div>
            <SectionNavbars
                title="Return Purchases"
                leftIcon={
                    <div onClick={() => setView(0)} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={
                    <div>
                        <Button
                            variant="contained"
                            style={{'backgroundColor': 'white' , color: '#DAAB59', padding: '5px 20px', textTransform: 'none', fontSize:'17px'}}
                        >
                            Return all
                        </Button>
                    </div>
                }
            />

            <Paper style={{marginTop: '60px'}} >
                <Grid container style={{paddingTop: "7px"}}>
                    <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}} direction="column" >  
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' style={{ marginLeft: '15px'}} >{supplier.name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px', marginLeft: '15px'}}>{supplier.date}</div>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px', marginLeft: '15px'}}> {supplier.time}</div>
                        </div>
                    </Grid>

                    <Grid item xs={6} style={{ paddingTop: "10px" }} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#ffff' , padding: '5px 15px', height: '60px' , width: '80%', textTransform: 'none'}}
                        >
                            <Grid container>
                                <Grid item xs={12} spacing={2} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "13px"}}>
                                        Total cost :
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} spacing={2} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "17px", fontWeight: "600"}}>
                                        GHC {supplier.cost}
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
                                    No purchases made
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    products.map((item) => <SingleProduct key={item.id} product={item} />)  
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