import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import ProductServiceHandler from "../../../../../services/ProductServiceHandler";
import CartService from "../../../../../services/CartService";
import Divider from '@material-ui/core/Divider';
import QuantitySmallInput from "../../../../../components/Input/QuantitySmallInput";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {makeStyles} from "@material-ui/core";
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import BranchProductService from "../../../../../services/BranchProductService";
import Typography from "@material-ui/core/Typography/Typography";
import Avatar from "@material-ui/core/Avatar/Avatar";

const useStyles = makeStyles(theme => ({
    root: {
        width: '70%',
        display: 'flex',
        padding: '2px 10px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '30px',
        border: '1px solid #ced4da',
        fontSize: '0.7rem',
        lineHeight: '1.5',
        float: 'right',
        textAlign: `center !important`,
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: `center !important`,
    },
    textCenter: {
        textAlign: `center !important`,
    },
    error: {
        border: '1px solid #D34343',
    },
    iconButton: {
        padding: 10,
    }
}));

const ViewSingleProduct = props => {
    const classes = useStyles();
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const cartEntry = props.item;
    const entryTotal = parseFloat(new CartService().getCartEntryTotal(cartEntry));
    const quantity = cartEntry.quantity;
    const [product , setProduct] = useState('');
    const [branchQuantity , setBranchQuantity] = useState(0);
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
        const newProduct = await props.item.product.fetch();
        const bProduct = await props.item.branchProduct.fetch();
        setProduct(newProduct);
        const productHandler = new BranchProductService(bProduct);
        setBranchQuantity(await productHandler.getProductQuantity());

        setImage(new ProductServiceHandler(newProduct).getProductImage());
        //setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);
        setName(newProduct.name);
    };

    const deleteHistoryHandler = (pId , event) => {
        props.deleteStoreProduct(pId , event);
    };

    const changeQuantityHandler = (name , value) => {
        const quan = parseFloat(value);

        if (quan > branchQuantity) {
            setErrorMsg('Invalid quantity');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);

            return false
        }
        props.changeQuantity(cartEntry , value);
    };

    const setTotalPriceHandler = (event) => {
        const sp = (event.target.value)  / quantity;

        if (sp < cartEntry.costPrice) {
            setErrorMsg('Selling price can not be less than cost price');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);

            //return false
        }

        props.changePrice(cartEntry , sp);
    };

    return(
        <Grid container spacing={1} className={`bordered-sm shadow2 mb-3 borderRadius5`}>
            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            />
            <Grid item xs={12}>
                <Grid container >
                    <Grid item xs={3}>
                        <Avatar
                            alt={image}
                            src={image}
                            //className={classes.primaryColor}
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                margin: '10px auto',
                                textAlign: 'center',
                            }}
                        />
                        {/*<Card
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
                        />*/}
                    </Grid>

                    <Grid item xs={6} style={{display: 'table', height: '60px', margin: '4px 0px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold'>{name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{`Quantity: ${quantity}`}</div>
                        </div>
                    </Grid>

                    <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}>
                        <InputBase
                            className={`${classes.input} search-box text-center`}
                            type="tel"
                            classes={{
                                root: classes.root,
                                input: classes.textCenter, // class name, e.g. `classes-nesting-label-x`
                                error: classes.error
                            }}
                            error={entryTotal / quantity < cartEntry.costPrice}
                            value={entryTotal || ''}
                            onChange={(event) => setTotalPriceHandler(event)}
                            style={{fontSize: '16px' , textAlign: `center !important`}}
                        />

                        <Typography
                            component="p"
                            variant="h6"
                            style={{fontSize: '10px' , margin: '3px 0px', paddingTop: '5px' , color: '#D34343' , float: 'right'}}
                            className={`font-weight-bold`}
                        >
                            { entryTotal / quantity < cartEntry.costPrice ? 'Invalid amount' : ''}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider variant={`fullWidth`} style={{width: '100%', color: '#e5e5e5'}}/>
            <Grid item xs={12}>
                <Grid container >
                    <Grid item xs={6} style={{float: 'left' , height: '45px'}}>
                        <QuantitySmallInput size={`full`} initialValue={quantity} inputName="quantity" max={branchQuantity} min={1} getValue={changeQuantityHandler.bind(this)} />
                    </Grid>

                    <Grid item xs={6} style={{display: 'table', margin: '8px 0px' , float: 'right'}}>
                        <DeleteIcon
                            onClick={deleteHistoryHandler.bind(this , cartEntry.id)}
                            style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right', float: 'right'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewSingleProduct;

