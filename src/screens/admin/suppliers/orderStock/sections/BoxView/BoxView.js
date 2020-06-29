import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import ProductServiceHandler from "../../../../../../services/ProductServiceHandler";

const ViewSingleProduct = props => {
    const cartEntry = props.item;
    const entryTotal = parseFloat(cartEntry.costPrice * cartEntry.quantity);

    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [quantity , setQuantity] = useState(cartEntry.quantity);
    //const product = props.item;

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!product) {
            getProduct();
        }
    }, []);

    const getProduct = async () => {
        const newProduct = await props.item.product.fetch();
        setProduct(newProduct);
        setImage(new ProductServiceHandler(product).getProductImage());
        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);
    };

    const deleteHistoryHandler = (pId , event) => {
        props.deleteStoreProduct(pId , event);
    };

    const changeQuantityHandler = (cartEntry , event) => {
        props.changeQuantity(cartEntry , event);
    };

    return(
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10 px-3`}>
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
            <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold'>{name}</span>
                    <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{`GHC ${entryTotal}`}</div>
                </div>
            </Grid>
            <Grid item xs={2} style={{height: '60px', margin: '25px 0px 0px 0px'}}>
                <input type="number" defaultValue={quantity} onChange={changeQuantityHandler.bind(this , cartEntry)} min="1" style={{width: '50px'}} />
            </Grid>
            <Grid item xs={2} style={{height: '60px', margin: '20px 0px 0px 0px'}}>
                <DeleteIcon
                    onClick={deleteHistoryHandler.bind(this , cartEntry.id)}
                    style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                />
            </Grid>
        </Grid>
    );
};

export default ViewSingleProduct;
