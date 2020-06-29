import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const AddedProductSingle = props => {
    const product = props.item;
    const counted = product.pro_quantity ? `${product.pro_quantity} packs counted` : '';

    const image = `https://elparah.store/admin/upload/${product.image}`;
    console.log(image);
    const deleteHistoryHandler = (pId , event) => {
        props.deleteStoreProduct(pId , event);
    };

    const editProductHandler = (pId , event) => {
        props.editStoreProduct(pId , event);
    };

    return(
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={3}>
                <Card
                    className="shadow1"
                    style={{margin: '5px auto' ,backgroundImage: `url(${image})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '60px' ,borderRadius: '50%', height: '60px', padding: '0px'}}
                />
            </Grid>
            <Grid item xs={4} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    {product.pro_name}
                    <div className="font-weight-light mt-1" style={{color: '#53BF77', fontSize: '14px'}}>{counted}</div>
                </div>
            </Grid>
            <Grid item xs={5} style={{height: '60px', margin: '13px 0px'}}>
                <div style={{textAlign: 'right' , width:'100%'}}>
                    <div className={`deleteIcon rounded-circle shadow1 text-center`} style={{display: 'inline-block' , marginRight:'5px'}}>
                        <EditIcon onClick={editProductHandler.bind(this , product.pro_id)}
                                    style={{fontSize: '30px', color: '#DAAB59'}}
                        /><br/>
                        Edit
                    </div>
                    <div className={`deleteIcon rounded-circle shadow1 text-center`} style={{display: 'inline-block' , marginRight:'5px'}}>
                        <DeleteIcon
                            onClick={deleteHistoryHandler.bind(this , product.pro_id)}
                            style={{fontSize: '30px', color: '#DAAB59'}}
                        /><br/>
                        Delete
                    </div>
                </div>
            </Grid>

        </Grid>
    );
};

export default AddedProductSingle;