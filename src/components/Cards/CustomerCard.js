import React , { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    primaryColor: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: '#FFFFFF',
        backgroundColor: '#DAAB59',
    }
}));

const CustomerCard = (props) => {
    const classes = useStyles();
    const [customer , setCustomer] = useState('');
    const [name , setName] = useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const newCustomer = await props.customer;
        setCustomer(newCustomer);
        setName(newCustomer.firstName + ' ' + newCustomer.otherNames);
    };

    return(
        
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>

                    <Grid item xs={3} sm>
                        <Avatar
                            alt={name ? `${name}` : 'Cash Customer'}
                            //src={Woman}
                            className={classes.primaryColor}
                            style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "50%",
                                margin: '10px auto',
                                textAlign: 'center'
                            }}
                        >
                            {name ? (name).charAt(0).toUpperCase() : 'C'}
                        </Avatar>
                    </Grid>

                    <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' style={{ fontSize: '16px'}}>{name ? `${name}` : 'Cash Customer'}</span>
                        </div>
                    </Grid>
                    
                </Grid>
           
    );
};

export default CustomerCard;
