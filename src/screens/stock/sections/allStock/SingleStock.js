import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
import Divider from '@material-ui/core/Divider';
import BranchProductService from "../../../../services/BranchProductService";


const ViewSingleProduct = props => {
    const branchProduct = props.product;
    const [quantity , setQuantity] = useState('');
    const [costPrice , setCostPrice] = useState('');
    const [product , setProduct] = useState('');
    const [sellingPrice , setSellingPrice] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    //const product = props.item;

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!product) {
            getProduct();
        }
    });

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        setProduct(newProduct);
        const productHandler = new BranchProductService(branchProduct);
        setQuantity(await productHandler.getProductQuantity());
        setCostPrice(await productHandler.getCostPrice());
        setSellingPrice( productHandler.getSellingPrice());
        setImage(new ProductServiceHandler(product).getProductImage());
        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);
    };


    return(
        <Grid container spacing={1} className={`bordered-sm shadow2 mb-3 borderRadius5`}>
            <Grid item xs={12}>
                <Grid container >
                    <Grid item xs={3}>
                        <Card
                            className="shadow1"
                            style={{
                                margin: '5px auto',
                                backgroundImage: `url(${image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                width: '60px',
                                borderRadius: '50%',
                                height: '60px',
                                padding: '0px'
                            }}
                        />
                    </Grid>

                    <Grid item xs={9} style={{display: 'table', height: '60px', margin: '4px 0px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold'>{name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{`Items remaining: ${quantity}`}</div>
                        </div>
                    </Grid>

                </Grid>
            </Grid>

            <Divider variant={`fullWidth`} style={{width: '100%', color: '#e5e5e5'}}/>

            <Grid item xs={12}>
                <Grid container >

                    <Grid item xs={6} style={{display: 'table', margin: '8px 0px'}}>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{`Cost price: ${costPrice}`}</div>
                    </Grid>

                    <Divider variant={`fullWidth`} orientation="vertical" flexItem/>

                    <Grid item xs={6} style={{display: 'table',  margin: '8px 0px', marginLeft: '-1px'}}>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{`Selling price: ${sellingPrice}`}</div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewSingleProduct;

