import React , { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
//import AddIcon from "../../../../../components/ClickableIcons/AddIcon";
import ProductCard from "../../../../../components/Cards/ProductCard";
//import WarningIcon from "../../../../../components/ClickableIcons/WarningIcon";
import Typography from "@material-ui/core/Typography/Typography";
import SearchInput from "../../../../Components/Input/SearchInput";
import BranchProductService from "../../../../../services/BranchProductService";
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import SingleProductMainCard from "../singleProductMainCard";
import Empty from '../../../../../assets/img/employee.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../../../utilities/paths";
import Box from "@material-ui/core/Box/Box";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        fontSize: '0.7rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    cart: {
        width: '95%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '6px',
        height: '35px',
        fontSize: '0.8rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: '0.9rem',
    },
    iconButton: {
        padding: 10,
    }
}));

const SellSearchMode = props => {
    const [searchValue, setSearchValue] = useState({
        search: ''
    });
    const { history } = props;
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [productAdded, setProductAdded] = useState(false);

    const branchProducts = props.branchProducts;

    const classes = useStyles();

    const addProductHandler = (id) => {
        props.productAdd(id, 1);
    };

    /*
    * @todo resolve isProductSellable...
    * */

    const addProductOneHandler = async (productId, branchProductId, sellingPrice, branchProduct) => {
        const quantity = await new BranchProductService(branchProduct).getProductQuantity();

        if (quantity < 1) {
            setErrorMsg('Product is out of stock. Please refill');
            setError(true);
            setTimeout(function () {
                setError(false);
            }, 3000);
            return false;
        }

        const formFields = {
            quantity: 1,
            sellingPrice: sellingPrice,
            costPrice: parseFloat(await new BranchProductService(branchProduct).getCostPrice()),
            productId: productId,
            branchProductId: branchProductId,
            discount: 0,
        };

        const status = props.addToCart(formFields);

        if (status) {
            await setProductAdded(true);

            setTimeout(function () {
                setProductAdded(false);
            }, 2000)

        } else {
            setErrorMsg('OOPS Something went wrong. Please try again');
            setError(true);
            setTimeout(function () {
                setError(false);
            }, 3000);
            return false;
        }
    };

    const removeProductHandler = (name) => {
        alert(`${name} is out of stock or has no cost price. Please add stock`);
    };

    const setInputValue = (name, value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchHandler(value);
    };

    return (
        <div>
            <Grid container spacing={1} className={`my-1`}>
                <Grid item xs={7} style={{padding: '4px 8px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>

                <SimpleSnackbar
                    type="success"
                    openState={productAdded}
                    message={`New product added successfully`}
                >
                    {/*<Button color="secondary" size="small" onClick={props.undoProductAdd}>
                        UNDO
                    </Button>*/}
                </SimpleSnackbar>

                <SimpleSnackbar
                    type="warning"
                    openState={error}
                    message={errorMsg}
                >
                </SimpleSnackbar>

                <Grid item xs={5} style={{padding: '4px 8px'}} onClick={() => props.setView(2)}>
                    <Paper className={`${classes.cart} text-center`}>
                        <span className={`mx-auto italize font-weight-light`}
                              style={{fontSize: '15px', lineHeight: '1.5rem'}}
                        >
                            <ShoppingCartOutlinedIcon style={{fontSize: '16px'}}/>
                            Saved Cart
                            <span style={{
                                fontSize: '12px',
                                color: '#000000',
                                position: 'absolute',
                                top: 0,
                                right: '5%',
                                backgroundColor: '#daab59',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                fontWeight: '500'
                            }}
                            >
                                {props.savedCartCount}
                            </span>
                        </span>
                    </Paper>
                </Grid>
            </Grid>

            <div className={`borderRadius10 bg-white px-2 py-2 mt-2`}>
                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontWeight: '500', fontSize: '18px', margin: '3px 0px', paddingTop: '5px'}}
                >
                    Quick add
                </Typography>

                <Grid container spacing={1} className='mt-3'>
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
                            <Grid key={branchProduct.productId} item xs={4}
                                  style={{padding: '4px 8px', position: 'relative'}} className={`mx-0 px-1`}>
                                <SingleProductMainCard
                                    branchProduct={branchProduct}
                                    posFunc={addProductOneHandler}
                                    negFunc={removeProductHandler}
                                />

                                {/*<div
                                    onClick={
                                        new BranchProductService(branchProduct).isProductSellable() === false ?
                                            removeProductHandler.bind(this, branchProduct.productId)
                                            :
                                            addProductHandler.bind(this, branchProduct.productId)
                                    }
                                >*/}
                                <ProductCard notTruncate={true} branchProduct={branchProduct} removeProductHandler={removeProductHandler.bind(this)} addProductHandler={addProductHandler.bind(this)} isSell={true} product={branchProduct.product.fetch()}>
                                    {/*{new BranchProductService(branchProduct).getSellingPrice() ? `GHC ${new BranchProductService(branchProduct).getSellingPrice()}` : `No cost price`}*/}
                                </ProductCard>
                                {/*</div>*/}
                            </Grid>
                        )
                    }
                </Grid>
            </div>
        </div>
    )
};

export default SellSearchMode;
