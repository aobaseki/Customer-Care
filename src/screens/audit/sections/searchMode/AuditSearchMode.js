import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import ProductCard from "../../../../components/Cards/ProductCard";
import Typography from "@material-ui/core/Typography/Typography";
import SearchInput from "../../../Components/Input/SearchInput";
import BranchProductService from "../../../../services/BranchProductService";
import AuditService from "../../../../services/AuditService";

const AuditSearchMode = props => {
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const branchProducts = props.branchProducts;

    const addProductHandler = (id) => {
        props.productAdd(id);
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchHandler(value);
    };

    return (
        <div>
            <div className={`borderRadius10 bg-white px-2 py-2 mt-2`}>
                <Grid container spacing={1} className={`my-1 mx-auto`}>
                    <Grid item xs={8} style={{padding: '4px 8px'}} className={`mx-auto`}>
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '400', fontSize: '18px' , textAlign: 'left', margin: '3px 0px', paddingTop: '5px'}}
                        >
                            Select a product to audit
                        </Typography>
                    </Grid>

                    <Grid item xs={4} style={{padding: '4px 8px'}} className={`mx-auto`}>
                        {/*<SystemDate/>*/}
                        <Typography
                            component="h6"
                            variant="h6"
                            style={{fontWeight: '400', textAlign: 'right', fontSize: '18px' , margin: '3px 0px', paddingTop: '5px'}}
                        >
                            Total: {branchProducts.length}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={1} className={`my-1 mx-auto`}>
                    <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto`}>
                        <SearchInput
                            styles={{border: '1px solid #e5e5e5'}}
                            inputName="search"
                            getValue={setInputValue.bind(this)}
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
                        branchProducts.map((branchProduct) => {
                            return (
                                <Grid key={branchProduct.productId} item xs={4} style={{padding: '4px 8px' , position: 'relative'}} className={`mx-0 px-1`}>
                                    {/*<div style={{display: 'none'}}>{checkProduct(branchProduct.productId) ? 0 : 1}</div>*/}
                                    {/*{ prodState === true ?
                                        <div>
                                            <CheckCircleIcon
                                                styles={{
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                    top: '-2px',
                                                    float: 'right',
                                                    position: 'absolute',
                                                    right: '-2px',
                                                    color: '#53BF77',
                                                }}
                                            />
                                        </div>:
                                        <div>
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
                                                }}
                                            />
                                        </div>
                                    }*/}
                                    <div
                                        onClick={addProductHandler.bind(this, branchProduct.productId)}
                                    >
                                        <ProductCard audit={true} appCounted={new AuditService().getAuditProductDetails(branchProduct.productId)} storeCounted={new BranchProductService(branchProduct).getProductQuantity()} product={branchProduct.product.fetch()}>
                                        </ProductCard>
                                    </div>
                                </Grid>
                            )
                        })
                    }

                </Grid>
            </div>
        </div>
    )
};

export default AuditSearchMode;
