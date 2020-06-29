import React , { useState, useEffect } from 'react';
import BranchProductService from "../../../../services/BranchProductService";
import WarningIcon from "../../../../components/ClickableIcons/WarningIcon";
//import AddIcon from "../../../../components/ClickableIcons/AddIcon";

const SingleProductMainCard = (props) => {
    const branchProduct = props.branchProduct;
    const [itemFetched , setItemFetched] = useState(false);
    const [isSellable , setIsSellable] = useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!itemFetched) {
            getProduct();
        }
    }, []);

    const productHandler = new BranchProductService(branchProduct);
    const getProduct = async () => {
        setIsSellable(await productHandler.isProductSellable())
        setItemFetched(true);
    };

    /*const addProductOneHandler = () => {
        props.posFunc(branchProduct.productId, branchProduct.id , new BranchProductService(branchProduct).getSellingPrice(), branchProduct)
    }*/

    const removeProductHandler = () => {
        props.negFunc(branchProduct.productId);
    };

    return (
        isSellable === false ?
            <div
               onClick={removeProductHandler}
            >
                <WarningIcon
                    styles={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        top: '-2px',
                        float: 'right',
                        position: 'absolute',
                        right: '-2px',
                        color: '#DA5959',
                    }}
                />
            </div>
            :
            ''
    )
};

{/*<div
    onClick={addProductOneHandler}
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
        }}
    />
</div>*/}
export default SingleProductMainCard;
