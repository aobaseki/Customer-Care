import React from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import BoxDefault from '../../../../../components/Box/BoxDefault';
import Card from "@material-ui/core/Card/Card";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const SingleViewSupplier= props => {

    const supplier = props.supplier;

    return(

        <div>

            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
            >
                <Grid container spacing={1} >
                    <Grid item xs={3}>
                        <Card
                            className="shadow1"
                            style={{
                                margin: '10px auto',  
                                backgroundPosition: 'center', 
                                backgroundSize: 'cover', 
                                width: '50px', 
                                borderRadius: '50%', 
                                height: '50px', 
                                padding: '0px'
                            }}
                        >
                            <AccountCircleIcon style={{position: 'center', marginTop: '8px', fontSize: '2rem'}} />
                        </Card>
                    </Grid>

                    <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' >{supplier.name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px', marginTop: '5px'}}>Last purchase: {supplier.date}</div>
                        </div>
                    </Grid>
                    
                </Grid>
            </BoxDefault>
            
        </div>
        
    )

}
export default withRouter(SingleViewSupplier);