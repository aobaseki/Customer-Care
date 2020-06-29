import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
import Avatar from "@material-ui/core/Avatar/Avatar";

const AddedProductSingle = props => {
    const auditEntry = props.item;

    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const quantityCounted = auditEntry.quantityCounted;
    const storeQuantity = auditEntry.storeQuantity;
    //const product = props.item;

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!product) {
            getProduct();
        }
    });

    const getProduct = async () => {
        const newProduct = await props.product;
        setProduct(newProduct);
        setImage(new ProductServiceHandler(product).getProductImage());
        setName(newProduct.name);
    };

    const deleteHistoryHandler = (pId) => {
        console.log(pId)
        props.deleteAuditProductEntry(pId);
    };

    const editProductHandler = (pId) => {
        props.editAuditProductEntry(pId);
    };

    return(
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={2}>
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
            </Grid>
            <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', fontWeight: '600', display: 'table-cell', verticalAlign: 'middle'}}>
                    {name}
                    <div className="font-weight-light mt-1" style={{fontSize: '12px'}}>App: {storeQuantity} | Count: {quantityCounted} | Diff: {quantityCounted - storeQuantity}</div>
                </div>
            </Grid>
            <Grid item xs={5} style={{height: '60px', margin: '13px 0px'}}>
                <div style={{textAlign: 'right' , width:'100%'}}>
                    <div className={`deleteIcon2 shadow1 text-center`} style={{display: 'inline-block' , marginRight:'5px'}}>
                        <EditIcon onClick={editProductHandler.bind(this , auditEntry.productId)}
                                    style={{fontSize: '20px', color: '#DAAB59', marginTop: '5px'}}
                        /><br/>
                        Edit
                    </div>
                    <div className={`deleteIcon2 shadow1 text-center`} style={{display: 'inline-block' , marginRight:'5px'}}>
                        <DeleteIcon
                            onClick={deleteHistoryHandler.bind(this , auditEntry.id)}
                            style={{fontSize: '20px', color: '#DAAB59', marginTop: '5px'}}
                        /><br/>
                        Delete
                    </div>
                </div>
            </Grid>

        </Grid>
    );
};

export default AddedProductSingle;
