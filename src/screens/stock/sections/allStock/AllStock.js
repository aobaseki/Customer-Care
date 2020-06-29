import React, {useState} from "react";
import {withRouter } from "react-router-dom";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import SearchInput from "../../../Components/Input/SearchInput";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import SingleStock from './SingleStock';

const AllStock = props => {
    const { history } = props;
    const branchProducts = props.branchProducts;

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchProduct(value);
    };

    return (
        <div>
            <SectionNavbars
                title="All Stock"
                leftIcon={
                    <div onClick={() => props.setView(2)} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Paper style={{marginTop: '60px', marginBottom: '10px'}} >
                <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                    <Grid item xs={12} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                        <Typography className={`text-center mx-auto text-dark font-weight-bold`}  style={{ fontSize: '15px'}} >
                            All stock available in your store
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Paper>
                <Grid container spacing={2} style={{marginTop: '13px'}} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '10px 8px 15px 8px'}} className={`mx-auto mt-7`}>
                        <SearchInput
                            inputName="search"
                            styles={{
                                border: '1px solid #e5e5e5',
                                padding: '4px 0px'
                            }}
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Box style={{marginTop: '5px' , margin: '2px 5px', paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {branchProducts.length === 0
                    ?
                    <Grid
                        item xs={12}
                        className={`text-left pl-2`}
                    >
                        <div className={`rounded mx-1 my-2 p-2 bordered`}>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontSize: '16px'}}
                                className={`text-center text-dark w-100`}
                            >
                                No product found
                            </Typography>
                        </div>
                    </Grid>
                    :
                    <div style={{marginBottom: '4rem'}}>
                        {
                            branchProducts.map((branchProduct) =>
                                
                                <SingleStock key={branchProduct.id}  product={branchProduct} />   
                
                            )
                        }
                    </div>
                }
            </Box>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'Capitalize'}}
                    onClick={() => props.setView(2)}
                >
                    Back
                </Button>
            </Box>

        </div>
    )
}

export default withRouter(AllStock);
