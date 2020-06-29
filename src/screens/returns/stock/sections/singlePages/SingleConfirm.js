import React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Grid from "@material-ui/core/Grid/Grid";
import DeleteIcon from '@material-ui/icons/Delete';

const ViewSingleProduct = props => {
    const product = props.item;

    const image = product.image;

    const deleteHistoryHandler = (pId , event) => {
        props.deleteReturnEntry(pId , event);
    };

    return(
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
            <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold'>{product.name}</span>
                    <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>GHC {product.costPrice}</div>
                </div>
            </Grid>
            <Grid item xs={2} style={{height: '60px', margin: '25px 0px 0px 0px'}}>
                <input type="number" min="1" style={{width: '50px'}} value={product.quantity} />
            </Grid>
            <Grid item xs={2} style={{height: '60px', margin: '20px 0px 0px 0px'}}>                       
                <DeleteIcon
                    onClick={deleteHistoryHandler.bind(this , product.id)}
                    style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                /> 
            </Grid>
        </Grid>
    );
};

export default ViewSingleProduct;