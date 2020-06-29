import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import SearchInput from "../../../Components/Input/SearchInput";
import SingleProductBox from "../../../../components/Product/SingleProductBox";
import Typography from "@material-ui/core/Typography/Typography";
import Empty from '../../../../assets/img/employee.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../../utilities/paths";
import Box from "@material-ui/core/Box/Box";

const StockSearchMode = props => {
    const branchProducts = props.branchProducts;
    const { history } = props;
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchProduct(value);
    };

    const addProductHandler = (id) => {
        console.log(id);
        props.addProductStockView(id);
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto`}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={1}
                className={`shadow1 boxMain mx-auto rounded mt-2`}
                style={{width: '100%', padding: '10px 2% 20px' , marginBottom: '60px'}}
            >
                {branchProducts.length === 0
                    ?
                    // <Grid
                    //     item xs={12}
                    //     className={`text-left pl-2`}
                    // >
                    //     <div className={`rounded mx-1 my-2 p-2 bordered`}>
                    //         <Typography
                    //             component="h6"
                    //             variant="h6"
                    //             style={{fontSize: '16px'}}
                    //             className={`text-center text-dark w-100`}
                    //         >
                    //             No product found
                    //         </Typography>
                    //     </div>
                    // </Grid>
                    <div>
                        <Box component="div" m={2} style={{marginTop: '-1rem'}} >
                            <img className="img100" src={Empty} alt={'payment'}/>
                        </Box>

                        
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '17px', padding: '0px 10px 10px 10px' }} >
                            Seems you don't have any stock
                        </Typography>
                        

                        <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginBottom: '20px' }} >
                                Click Add Stock to add products you sell to your store
                        </Typography>

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                            onClick={() => history.push(paths.add_products)}
                        >
                            Add stock
                        </Button>
                    </div>
                    :
                    branchProducts.map((branchProduct) =>
                        <SingleProductBox product={branchProduct} key={branchProduct.id} addProductHandler={addProductHandler.bind(this, branchProduct.id)}/>
                    )
                }
            </Grid>
        </div>
    );
};

export default StockSearchMode;
