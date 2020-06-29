import React, {useEffect , useState} from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import UndoIcon from '@material-ui/icons/Undo';
import Button from "@material-ui/core/Button/Button";
import MainDialog from '../../../../../components/Dialog/MainDialog';
import QuantityInput from "../../../../Components/Input/QuantityInput";
import LocalInfo from "../../../../../services/LocalInfo";
import Avatar from "@material-ui/core/Avatar/Avatar";

import format from "date-fns/format";
import BranchStockService from '../../../../../services/BranchStockService';
import ProductServiceHandler from "../../../../../services/ProductServiceHandler";

const SingleProduct = props => {

    const purchase = props.purchase;
    const [mainDialog, setMainDialog] = React.useState(false);
    const [quantity , setQuantity] = useState(false);
    const [costPrice , setCostPrice] = useState(false);
    const [productName , setName] = useState('');
    const [image , setImage] = useState(false);
    const [product, setProduct] = useState(false);
    const [formFields , setFormFields] = useState({
        branchId: LocalInfo.branchId,
        branchProductId: purchase.branchProductId,
        createdBy: LocalInfo.userId,
        productId: purchase.productId,
        quantity: '',
        id: purchase.id,
        name: '',
        image: '',
        costPrice: '',
        initialQuantity: '',
        altCostPrice: ''
    });

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!quantity) {
            getProduct();
        }
    });

    const getProduct = async () => {
        /*
        * @todo get entries via query on model
        * */
        const newProduct = await purchase.product.fetch();
        setProduct(newProduct);
        localStorage.removeItem('data');
        setImage(new ProductServiceHandler(product).getProductImage());
        setName((newProduct.name).length > 20 ? (newProduct.name).slice(0 , 20) + '...' : newProduct.name);
        const costP = await BranchStockService.getStockEntryCostPriceById(purchase.id);
        const quant = await BranchStockService.getStockProductQuantity(purchase.id);
        setCostPrice(costP);
        setQuantity(quant);

    };

    const setInputValue = (name, value) => {
        const {...oldFormFields} = formFields;
        const qty = purchase.quantity - value;
        if (qty < 0){
        setCostPrice(0);
        setQuantity(0);
        oldFormFields['quantity'] = (purchase.quantity);
        oldFormFields['costPrice'] = ((purchase.quantity) * purchase.costPrice);
        oldFormFields['image'] = image;
        oldFormFields['name'] = productName;
        oldFormFields['initialQuantity'] = purchase.quantity;
        setFormFields(oldFormFields);
        }else {
            setCostPrice(((purchase.quantity - value) * purchase.costPrice));
            setQuantity(purchase.quantity - value);
            oldFormFields['quantity'] = (value);
            oldFormFields['costPrice'] = (( value) * purchase.costPrice);
            oldFormFields['image'] = image;
            oldFormFields['name'] = productName;
            oldFormFields['initialQuantity'] = purchase.quantity;
            setFormFields(oldFormFields);
        }
    };

    const updateStockEntry = () => {
        let data = JSON.parse(localStorage.getItem('data')) || [];
        
        console.log(formFields)
        const response = props.updateStockEntry(purchase.id, formFields);
        data.push(formFields);
        localStorage.setItem('data', JSON.stringify(data));
        if(response){
            setMainDialog(false);
        }
    };
    

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={3}>
                    <Avatar
                        alt={image}
                        src={image}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            margin: '10px auto',
                            textAlign: 'center',
                        }}
                    />
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{productName}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>Quantity: {quantity}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>Cost: GHC {costPrice}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}  >
                    <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{format(new Date(purchase.createdAt) , "h:mm a")}</div>
                    <Button
                        variant="outlined"
                        style={{color: '#DAAB59', textTransform: 'none', fontSize: '10px', padding: '0px 0px'}}
                        onClick={openDialogHandler.bind(this)}
                    >
                        <UndoIcon style={{fontSize: '20px'}} />
                            <br/>
                        Return
                    </Button>
                </Grid>
            </Grid>

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                        <Grid item xs={3}>
                            <Avatar
                                alt={image}
                                src={image}
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    margin: '10px auto',
                                    textAlign: 'center',
                                }}
                            />
                        </Grid>
                        <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' >{productName}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {quantity}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Cost: GHC {costPrice}</div>
                            </div>
                        </Grid>
                    </Grid>

                    <QuantityInput style={{width: '100%', margin: '50px', paddingBottom: '30px'}} label={`Quantity to return`} inputName="quantity" getValue={setInputValue.bind(this)} />

                    <Grid container spacing={1} style={{marginTop: '50px'}}>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 40px', textTransform: 'none', fontSize:'15px'}}
                                onClick={closeDialogHandler.bind(this)}
                            >
                                Cancel
                            </Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'15px'}}
                                onClick={updateStockEntry.bind(this)}
                            >
                                Return
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </MainDialog>
                    

        </div>

    );
};

export default SingleProduct;
