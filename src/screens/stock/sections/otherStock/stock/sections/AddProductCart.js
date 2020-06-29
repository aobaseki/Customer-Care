import React, {useEffect, useState} from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Typography from "@material-ui/core/Typography";
import SellQuantityInput from "../../../../../Components/Input/SellQuantityInput";
import SimpleSnackbar from "../../../../../../components/Snackbar/SimpleSnackbar";
import ProductServiceHandler from "../../../../../../services/ProductServiceHandler";
import {withRouter} from 'react-router-dom';
import BranchProductService from "../../../../../../services/BranchProductService";


const AddProductCart = props => {
    const branchProduct = props.product[0];
    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [productAdded , setProductAdded] = useState(false);
    const [quantityProduct , setQuantityProduct] = useState(0);
    const [sellingPrice , setSellingPrice] = useState(branchProduct.sellingPrice);
    const [costPrice , setCostPrice] = useState(0);
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');

    const [formFields , setFormFields] = useState({
        quantity: 1,
        sellingPrice: branchProduct.sellingPrice,
        costPrice: 0,
        productId: branchProduct.productId,
        branchProductId: branchProduct.id,
        discount: 0,
    });

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    });

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        setProduct(newProduct);
        setQuantityProduct(await productHandler.getProductQuantity());
        setImage(new ProductServiceHandler(product).getProductImage());
        setName(newProduct.name);
        setSellingPrice(await productHandler.getSellingPrice());
        setCostPrice(await productHandler.getCostPrice());

        setInputValue('costPrice' , parseFloat(await productHandler.getCostPrice()));
    };

    const [quantity , setQuantity] = useState(1);

    const setInputValue = (name , value) => {
        if(name === 'quantity'){
            setQuantity(value);
        }

        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;

        setFormFields(oldFormFields);
    };

    const addProduct = async() => {
        await setInputValue('costPrice' , costPrice);

        if (sellingPrice * quantity < costPrice * quantity) {
            setErrorMsg('Selling price can not be less than cost price');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
            return false;
        }

        const status = props.addToCart(formFields);

        if(status){
            await setProductAdded(true);

            setTimeout(function(){
                setProductAdded(false);
                props.setView(0);
            }, 1000)

        }else{
            setErrorMsg('OOPS Something went wrong. Please try again');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
            return false;
        }
    };


    return (
        <div>
            <SimpleSnackbar
                type="success"
                openState={productAdded}
                message={`New product added successfully`}
            >
            </SimpleSnackbar>

            <SimpleSnackbar
                type="success"
                openState={success}
                message={successMsg}
            />

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            >
            </SimpleSnackbar>


            <div className={`p-3 bg-white mx-0 shadow`}>
                <span
                    className={`back-icon`}
                    onClick={() => props.setView(0)}
                >
                    <KeyboardBackspaceIcon style={{fontWeight: '700'}}/>
                </span>

                
                <div className={`w-100 m-2 my-5`}>
                    <img className={`img-fluid mx-auto w-50 h-75`} src={image} alt={`${name}`}/>
                </div>
            </div>

            <div className={`p-3 mx-0`}>
                <div
                    className={`w-75 mx-auto bg-white shadow-ng`}
                    style={{minHeight: '300px' , borderRadius: '30px', marginTop: '-70px'}}
                >
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '18px' , margin: '3px 0px', paddingTop: '5px'}}
                        className={`font-weight-bold text-center text-dark`}
                    >
                        { name }
                    </Typography>

                    <SellQuantityInput label={`Quantity`} inputName="quantity" max={quantityProduct} min={1} getValue={setInputValue.bind(this)}/>

                    <div
                        className={`text-center mt-3 text-dark font-weight-bold`}
                        style={{fontSize: '13px'}}
                    >
                        <span
                            className={`text-center mx-auto`}
                        >
                            Total : GHC {`${(sellingPrice * quantity).toFixed(2)}`}
                            <span
                                className={`mx-2`}
                                style={{fontSize: '18px'}}
                            >|</span> {`${quantityProduct - quantity} left in stock`}
                        </span>
                    </div>

                </div>

                <div
                    className={`text-center text-dark w-75 mx-0 font-weight-bold mx-auto`}
                    style={{backgroundColor: '#DAAB59' , height: '40px' , marginTop: '-50px' , borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', paddingTop: '10px' }}
                >
                        <span
                            className={`w-100 text-center mx-auto`}
                            style={{fontSize: '20px'}}
                            onClick={addProduct}
                        >
                            Add to cart
                        </span>
                </div>
            </div>

            
        </div>
    );
};

export default withRouter(AddProductCart);
