import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EditIcon from '@material-ui/icons/Edit';

const SingleDayView = props => {
    const suppliers = props.suppDetails;

    const openSupplier = (event) => {
         props.setView(1);
    };

    const image = `https://elparah.store/admin/upload/${suppliers.image}`;

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
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
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{suppliers.name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total business: GHC {suppliers.worth}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}>  
                    <span className='text-dark font-weight-bold' >7:00 pm</span>                     
                    <EditIcon
                        onClick={openSupplier.bind(this)}
                        style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                    /> 
                </Grid>
            </Grid>


        </div>

    );
};

export default SingleDayView;