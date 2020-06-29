import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SectionNavbars from "../../../../../../components/Sections/SectionNavbars";
import Typography from "@material-ui/core/Typography/Typography";
import Container from "@material-ui/core/Container/Container";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import ItemsImage from '../../../../../../assets/img/items.png';
import ProfitImage from '../../../../../../assets/img/cost_price.png';
import SellingImage from '../../../../../../assets/img/expected_profit.png';
import CostImage from '../../../../../../assets/img/total_cost.png';
import SecondaryButton from "../../../../../../components/Buttons/SecondaryButton";
import Box from "@material-ui/core/Box/Box";

const StockSummaryPage = props => {
    const backHandler = () => {
        props.setView(0);
    };

    return (
        <div className={`mt-6`}>
            <SectionNavbars title="Stock"
                leftIcon= {
                    <ArrowBackIcon
                        onClick={backHandler.bind(this)}
                        style={{fontSize: '2.5rem'}}
                    />
                }
            />

            <div className="row p-0 pt-0 mx-0 text-center shadow1 mb-3">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '8px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    Stock summary
                </Typography>
            </div>

            <Container
                maxWidth="sm"
                style={{width: '100%'}}
            >
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                    <Grid item xs={4}>
                        <Card
                            className="shadow1 bordered"
                            style={{margin: '5px auto' ,backgroundImage: `url(${ItemsImage})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '70px' ,borderRadius: '50%', height: '70px', padding: '4px'}}
                        />
                    </Grid>
                    <Grid item xs={8}
                          className={`pt-2`}
                          style={{fontSize: '20px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
                    >
                        <div
                            className={`italize`}
                        >
                            Items in store
                        </div>
                        <div className="font-weight-bold mt-1">{props.storeDetails.itemsInStore} items</div>
                    </Grid>
                </Grid>

                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                    <Grid item xs={4}>
                        <Card
                            className="shadow1 bordered"
                            style={{margin: '5px auto' ,backgroundImage: `url(${CostImage})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '70px' ,borderRadius: '50%', height: '70px', padding: '4px'}}
                        />
                    </Grid>
                    <Grid item xs={8}
                          className={`pt-2`}
                          style={{fontSize: '20px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
                    >
                        <div
                            className={`italize`}
                        >
                            Total cost price
                        </div>
                        <div className="font-weight-bold mt-1">GHC {props.storeDetails.totalCostPrice}</div>
                    </Grid>
                </Grid>

                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                    <Grid item xs={4}>
                        <Card
                            className="shadow1 bordered"
                            style={{margin: '5px auto' ,backgroundImage: `url(${SellingImage})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '70px' ,borderRadius: '50%', height: '70px', padding: '4px'}}
                        />
                    </Grid>
                    <Grid item xs={8}
                          className={`pt-2`}
                          style={{fontSize: '20px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
                    >
                        <div
                            className={`italize`}
                        >
                            Total selling price
                        </div>
                        <div className="font-weight-bold mt-1">GHC {props.storeDetails.totalSellingPrice}</div>
                    </Grid>
                </Grid>

                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                    <Grid item xs={4}>
                        <Card
                            className="shadow1 bordered"
                            style={{margin: '5px auto' ,backgroundImage: `url(${ProfitImage})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '70px' ,borderRadius: '50%', height: '70px', padding: '4px'}}
                        />
                    </Grid>
                    <Grid item xs={8}
                          className={`pt-2`}
                          style={{fontSize: '20px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
                    >
                        <div
                            className={`italize`}
                        >
                            Expected profit
                        </div>
                        <div className="font-weight-bold mt-1">GHC {props.storeDetails.totalExpectedProfit}</div>
                    </Grid>
                </Grid>
            </Container>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <div
                    onClick={backHandler.bind(this)}
                >
                    <SecondaryButton
                        classes={`py-1 px-5`}
                    >
                        Back
                    </SecondaryButton>
                </div>

            </Box>
        </div>
    );
};

export default StockSummaryPage;
