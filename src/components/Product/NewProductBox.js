import React, {useEffect, useState} from 'react';
import ProductCard from "../Cards/ProductCard";
import BranchProductService from "../../services/BranchProductService";

const SingleProductBox = props => {
    const [quantity , setQuantity] = useState('');
    const [sellingPrice , setSellingPrice] = useState('');
    const branchProduct = props.product;

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!quantity || !sellingPrice) {
            getProduct();
        }
    });

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        setQuantity(await productHandler.getProductQuantity());
        setSellingPrice( productHandler.getSellingPrice());
    };

    return (
       
            <ProductCard product={branchProduct.product.fetch()}>
                GHC {sellingPrice} | {quantity} left
            </ProductCard>
            
            
    );
};

export default SingleProductBox;
