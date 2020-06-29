import React , { useState, useEffect } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import ProductServiceHandler from "../../services/ProductServiceHandler";
import BranchProductService from "../../services/BranchProductService";

const ProductCard = (props) => {
    let branchProduct = '';
    if(props.isSell){
        branchProduct = props.branchProduct;
    }
    const [product , setProduct] = useState('');
    const [isSellable , setIsSellable] = useState(false);
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [quantityProduct , setQuantityProduct] = useState(0);
    const [productAuditDetials , setProductAuditDetials] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        //if (!product) {
            getProduct();
        //}
    });

    const getProduct = async () => {
        if(props.isSell){
            setIsSellable(await new BranchProductService(branchProduct).isProductSellable());
        }

        const newProduct = await props.product;

        setProduct(newProduct);
        setQuantityProduct(await props.storeCounted);
        setProductAuditDetials(await props.appCounted);
        setImage(new ProductServiceHandler(newProduct).getProductImage());
        if(props.notTruncate){
            setName(newProduct.name);
        }else{
            setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 26) + '...' : newProduct.name);
        }
    };

    const addProductHandler = () => {
        props.addProductHandler(branchProduct.productId);
    };

    const removeProductHandler = () => {
        props.removeProductHandler(name);
    };

    return(
            props.isSell ?
                <Paper onClick={props.isSell && isSellable ? addProductHandler.bind(this) : removeProductHandler.bind(this)} className={`shadow mb-2 bg-white pro-item`} >
                    <img className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${name}`}/>

                    <Typography
                        component="p"
                        variant="h6"
                        className={`px-1 mt-1 py-1 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
                    >
                        {name}
                    </Typography>

                    {props.audit ?
                        <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                        App: {quantityProduct ? `${quantityProduct}` : 0} | Count: {productAuditDetials ? `${productAuditDetials.quantityCounted}` : 0}
                    </span> :
                        <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                        {props.children}
                    </span>
                    }

                </Paper>
            :
                <Paper className={`shadow mb-2 bg-white pro-item`} >
                    <img className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${name}`}/>

                    <Typography
                        component="p"
                        variant="h6"
                        className={`px-1 mt-1 py-1 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
                    >
                        {name}
                    </Typography>

                    {props.audit ?
                        <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                        App: {quantityProduct ? `${quantityProduct}` : 0} | Count: {productAuditDetials ? `${productAuditDetials.quantityCounted}` : 0}
                    </span> :
                        <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                        {props.children}
                    </span>
                    }

                </Paper>

        /*<Paper onClick={props.isSell && isSellable ? addProductHandler.bind(this) : ''} className={`shadow mb-2 bg-white pro-item`} >
            <img className={`img-fluid w-75 rounded mx-auto d-block pt-2`} src={image} alt={`${name}`}/>

            <Typography
                component="p"
                variant="h6"
                className={`px-1 mt-1 py-1 pro-item-name text-center text-capitalize font-weight-bold text-dark`}
            >
                {name}
            </Typography>

            {props.audit ?
                <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                    App: {quantityProduct ? `${quantityProduct}` : 0} | Count: {productAuditDetials ? `${productAuditDetials.quantityCounted}` : 0}
                </span> :
                <span className={`text-center font-weight-lighter text-dark`} style={{fontSize: '12px'}}>
                    {props.children}
                </span>
            }

        </Paper>*/
    );
};

export default ProductCard;
