import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: 'center',
    },
    iconButton: {
        padding: 10,
    },
    center: {
        textAlign: 'center'
    }
}));

const PriceInput = props => {
    console.log(props.initialValue)
    const classes = useStyles();
    const initialValue = parseFloat(props.initialValue) ? parseFloat(props.initialValue).toFixed(2) : '';
    const inputName = props.inputName;
    const [quantity , setQuantity] = useState(initialValue);

    const setValueHandler = (event) => {
        event.persist();
        if(isNaN(event.target.value) || (event.target.value).length <= 0)
        {
            setQuantity();
            return
        }

        setQuantity(event.target.value);
        props.getValue(inputName , event.target.value);
    };

    return(
        <div>
            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600'}}> {props.label}</label>

            <Grid container spacing={1} className={`mb-2`}>
                <Grid item xs={6} className={`mx-auto`}>
                    <Paper className={classes.root} >
                        <InputBase
                            className={`${classes.input} search-box text-center`}
                            type="tel"
                            value={quantity}
                            classes={{
                                input: classes.center
                            }}
                            name={inputName}
                            onChange={(event) => setValueHandler(event)}
                        />

                    </Paper>
                    {props.children}
                </Grid>
            </Grid>
        </div>
    );
};

export default PriceInput;
