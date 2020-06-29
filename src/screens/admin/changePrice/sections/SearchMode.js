import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import './ChangePrice.scss';
import Grid from "@material-ui/core/Grid/Grid";
import SearchInput from "../../../Components/Input/SearchInput";
import ProductCardHorizontal from "../../../../components/Cards/ProductCardHorizontal";
import BranchProductService from "../../../../services/BranchProductService";

const SearchMode = props => {

    const addProductHandler = (id) => {
        console.log(id);
        props.productAdd(id, 1);
    };

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const branchProducts = props.branchProducts;


    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchHandler(value);
    };

    return(
        <div className="shadow1 boxMain" style={{minHeight: '400px' , width: '96%', padding: '0px 2% 20px' , marginBottom: '60px'}}>

            <Grid container spacing={1}>
                <Grid item xs={12} style={{marginTop: '5px', padding: '4px 4px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                        styles={{width: '95%'}}
                    />
                </Grid>


            </Grid>

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
                    <Grid key={branchProduct.productId} item xs={12} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                        <div
                            onClick={addProductHandler.bind(this, branchProduct.productId)}
                        >
                            <ProductCardHorizontal product={branchProduct.product.fetch()}>
                                {new BranchProductService(branchProduct).getSellingPrice() ? `Selling price: GHC ${new BranchProductService(branchProduct).getSellingPrice()}` : `No selling price`}
                            </ProductCardHorizontal>

                        </div>
                    </Grid>
                )}
                
                {/* {products.map((item) =>
                    <Grid key={item.pro_id} item xs={12} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                        <div onClick={addProductHandler.bind(this, item.pro_id)}>
                        <ProductCardHorizontal product={item} />
                        </div>

                    </Grid>
                )} */}
            </Grid>
        </div>
    );
};

export default SearchMode;