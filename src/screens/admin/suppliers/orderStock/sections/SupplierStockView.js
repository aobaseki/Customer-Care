import React, {useEffect, useState} from "react";

import Grid from '@material-ui/core/Grid';
import paths from "../../../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";

import AddedIcon from "../../../../../components/ClickableIcons/AddedIcon";
import AddIcon from "../../../../../components/ClickableIcons/AddIcon";

import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../../../components/Sections/SectionNavbars";

import Box from "@material-ui/core/Box/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SupplierService from "../../../../../services/SupplierService";
import BranchService from "../../../../../services/BranchService";
import LocalInfo from "../../../../../services/LocalInfo";
import SecondaryButton from "../../../../../components/Buttons/SecondaryButton";
import ProductCard from "../../../../../components/Cards/ProductCard";
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import SearchInput from "../../../../Components/Input/SearchInput";
import SystemDate from "../../../../../components/Date/SystemDate";
import SingleProductBox from "../../../../../components/Product/SingleProductBox";

const useStyles = makeStyles(theme => ({
    root: {
        width: '60%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    search: {
        width: '800%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    button: {
        minWidth: '40px !important',
        width: '40px !important',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    shadow1: {
        '-webkit-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        '-moz-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        'box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
    },
    shadow2: {
        'box-shadow': '0 0 1rem 2px #dcc7a4',
    },
    margin1: {
        margin: '20px auto',
    },
    padding1: {
        'padding-bottom': '20px',
    },
    boxRadius: {
        'border-radius': '10px',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));


const SupplierStockView = props => {
    console.log(props.productsAdded)
    const classes = useStyles();
    const branchProducts = props.branchSupplierProducts;
    console.log(branchProducts)
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [renderedProductsView , setRenderedProductsView] = useState('');
    const [successMsg , setSuccessMsg] = useState('');
    //const [branchProducts , setBranchProducts] = useState([]);
    const [loading , setLoading] = useState(false);
    const [quantityAdded , setQuantityAdded] = useState(0);

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    /*useEffect(() => {
        if(branchProducts.length === 0 ){
            getBranchProducts();
        }
    }, []);

    const getBranchProducts = async () => {
        const products = await new SupplierService().getBranchSupplierProducts();
        //await getBranchProductsRendered(products);
        setQuantityAdded(await SupplierService.getSupplierProductsCount());
        setBranchProducts(products);
    };*/

    const { history } = props;

    if (!localStorage.getItem("supplierId") && !localStorage.getItem("supplierName")) {
        history.push(paths.suppliers);
    }

    /*const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        try {
            const products = await new SupplierService().searchBranchSupplierProduct(value);

            //await getBranchProductsRendered(products);
            setBranchProducts(products);
        }catch (e) {
            return false
        }
        //props.searchHandler(value);
    };*/

    const addProductHandler = (id) => {
        console.log(id);
        props.addProductStockView(id);
    };

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        //const products = await BranchProductService.searchProduct(value);
        //console.log(products);
        props.searchProduct(value);
    };

    /*const removeProductHandler = async (product) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async() => {
                        const supplierProduct = await new SupplierService().removeProductFromSupplier(product);

                        if(supplierProduct){
                            setSuccessMsg('Product removed successfully');
                            setSuccess(true);
                            const products = await new BranchService(LocalInfo.branchId).getProducts();
                            await getBranchProductsRendered(products);
                            setBranchProducts(await new BranchService(LocalInfo.branchId).getProducts());
                            setQuantityAdded(await SupplierService.getSupplierProductsCount());

                            setTimeout(function(){
                                setSuccessMsg('');
                                setSuccess(false);
                            }, 2000);
                        }else{
                            setErrorMsg('OOPS. Something went wrong. Please try again');
                            setError(true);
                            setTimeout(function(){
                                setErrorMsg('');
                                setError(false);
                            }, 2000);
                        }
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

        setLoading(false);
    };
*/

    /*const getBranchProductsRendered = async (branchProducts) => {
        let items = [];

        for(let i = 0; i < branchProducts.length; i++){
            const owned = await SupplierService.productExistInBranch(branchProducts[i].id);

            items.push(
                <Grid key={i} item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>

                    <div>
                        {owned ?
                            <div
                                onClick={removeProductHandler.bind(this, branchProducts[i])}
                            >
                                <AddedIcon
                                    styles={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        top: '-2px',
                                        float: 'right',
                                        position: 'absolute',
                                        right: '-2px',
                                        color: '#28a745',
                                        zIndex: '1500',
                                    }}
                                />
                            </div> :
                            <div
                                onClick={addProductHandler.bind(this, branchProducts[i])}
                            >
                                <AddIcon
                                    styles={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        top: '-2px',
                                        float: 'right',
                                        position: 'absolute',
                                        right: '-2px',
                                        color: '#DAAB59',
                                        zIndex: '1500',
                                    }}
                                />
                            </div>
                        }
                        <div
                            onClick={
                                owned ?
                                    removeProductHandler.bind(this , branchProducts[i])
                                    :
                                    addProductHandler.bind(this, branchProducts[i])

                            }
                        >
                            <ProductCard product={(branchProducts[i].product).fetch()}/>
                        </div>
                    </div>
                </Grid>
            )
        }

        setRenderedProductsView(items);
    };
*/
    return (
        <div style={{height: '100vh' , backgroundColor: 'rgba(229, 229, 229, 0.16)'}}>
            <React.Fragment>
                <CssBaseline />

                <SectionNavbars
                    title="Suppliers"
                    leftIcon={
                        <div onClick={() => history.push(paths.suppliers)}>
                            <ArrowBackIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                />
                <div style={{ position: "fixed", top:"70px", width:"100%" , zIndex: '1000'}}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <SystemDate/>
                                        <Typography
                                            component="p"
                                            variant="h6"
                                            style={{fontSize: "1.2rem" , fontWeight: "400", padding: '7px 0px'}}>
                                            Items sold by {localStorage.getItem("supplierName")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>

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

                <Grid container spacing={1} style={{marginTop: '170px'}} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto mt-7`}>
                        <SearchInput
                            inputName="search"
                            styles={{
                                border: '1px solid #e5e5e5',
                                padding: '10px 0px'
                            }}
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
                        branchProducts.map((branchProduct) =>
                            <SingleProductBox product={branchProduct} key={branchProduct.id} addProductHandler={addProductHandler.bind(this, branchProduct.id)}/>
                        )
                    }

                </Grid>

                <Box
                    className={`shadow1 bg-white`}
                    p={1}
                    style={{ height: '3.5rem', position: "fixed", bottom:"0", width:"100%" }}
                >
                    <div
                        onClick={() => props.setView(2)}
                    >
                        <SecondaryButton
                            classes={`capitalization font-weight-bold text-dark`}
                        >
                            <div>
                                View added stock

                                <span
                                    style={{
                                        fontSize: '12px',
                                        color: '#000000',
                                        position: 'absolute',
                                        top: -10,
                                        right: '5%',
                                        backgroundColor: '#FFFFFF',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        fontWeight: '500'
                                    }}
                                >
                                    {props.productsAdded}
                                </span>
                            </div>
                        </SecondaryButton>
                    </div>
                </Box>
            </React.Fragment>
        </div>
    );
};

export default withRouter(SupplierStockView);
