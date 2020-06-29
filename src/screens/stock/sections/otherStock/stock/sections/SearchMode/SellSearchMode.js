import React , { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import ProductCard from "../../../../../../../components/Cards/ProductCard";
import Typography from "@material-ui/core/Typography/Typography";
import SearchInput from "../../../../../../Components/Input/SearchInput";
import BranchProductService from "../../../../../../../services/BranchProductService";
import SimpleSnackbar from "../../../../../../../components/Snackbar/SimpleSnackbar";
import SingleProductMainCard from "../singleProductMainCard";

const SellSearchMode = props => {
    const [searchValue, setSearchValue] = useState({
        search: ''
    });
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [productAdded, setProductAdded] = useState(false);

    const branchProducts = props.branchProducts;

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

    const removeProductHandler = (id) => {
        console.log(id);
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
                <Grid item xs={12} style={{padding: '4px 8px'}}>
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
                </SimpleSnackbar>

                <SimpleSnackbar
                    type="warning"
                    openState={error}
                    message={errorMsg}
                >
                </SimpleSnackbar>

            </Grid>

            <div className={`borderRadius10 bg-white px-2 py-2 mt-2`}>

                <Grid container spacing={1} className='mt-3'>
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
                            <Grid key={branchProduct.productId} item xs={4}
                                  style={{padding: '4px 8px', position: 'relative'}} className={`mx-0 px-1`}>
                                <SingleProductMainCard branchProduct={branchProduct} posFunc={addProductOneHandler}
                                                       negFunc={removeProductHandler}/>

                                <div
                                    onClick={
                                        new BranchProductService(branchProduct).isProductSellable() === false ?
                                            removeProductHandler.bind(this, branchProduct.productId)
                                            :
                                            addProductHandler.bind(this, branchProduct.productId)

                                    }
                                >
                                    <ProductCard product={branchProduct.product.fetch()}>
                                        {/* {new BranchProductService(branchProduct).getSellingPrice() ? `GHC ${new BranchProductService(branchProduct).getSellingPrice()}` : `No cost price`} */}
                                    </ProductCard>
                                </div>
                            </Grid>
                        )
                    }
                </Grid>
            </div>
        </div>
    )
};

export default SellSearchMode;
