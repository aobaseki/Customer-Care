import React , {useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {makeStyles} from "@material-ui/core";
import './styles/SellInput.scss'

const useStyles = makeStyles(theme => ({
    root: {
        width: '85%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '25px',
        border: '1px solid #e5e5e5',
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
    }
}));

const QuantitySmallInput = props => {
    const max = props.max || 0;
    const min = props.min || 0;
    const classes = useStyles();
    const [quantity , setQuantity] = useState(props.initialValue);
    const inputName = props.inputName;

    const increaseQ = () => {
        if(isNaN(quantity) || quantity.length <= 0)
        {
            setQuantity(1);
            return
        }

        if(max !== 0 && parseFloat(quantity) >= max){
            return false;
        }

        const qn = parseFloat(quantity) + 1;
        setQuantity(parseFloat(quantity) + 1);

        props.getValue(inputName , qn);
    };

    const decreaseQ = () => {
        if(isNaN(quantity) || quantity.length <= 0 || quantity === 0)
        {
            setQuantity(0);
            return;
        }

        if(min !== 0 && parseFloat(quantity) <= min){
            return false;
        }

        const qn = parseFloat(quantity) - 1;
        setQuantity(parseFloat(quantity) - 1);

        props.getValue(inputName , qn);

    };

    const setValueHandler = (event) => {
        event.persist();
        if(isNaN(event.target.value) || (event.target.value).length <= 0)
        {
            setQuantity();
            return
        }

        if(max !== 0 && parseFloat(event.target.value) >= max){
            return false;
        }
        setQuantity(parseFloat(event.target.value));
        props.getValue(inputName , parseFloat(event.target.value));

    };

    return(
        <div className={`${props.size ? 'w-75' : 'w-50'} mx-auto SellInput`}>
            <label className={`text-dark`} style={{fontSize: '15px', fontWeight: '400'}}> {props.label}</label>

            <Grid container spacing={1} className={`mb-2 my-2 py-1 px-2 rounded borderRadius10`}>
                <Grid
                    item xs={3}
                    className={`text-right py-2`}
                    style={{color: '#DAAB59'}}
                >
                    <RemoveCircleOutlineOutlinedIcon onClick={decreaseQ} className={`icon-font-small text-right`}/>
                </Grid>
                <Grid item xs={6} >
                    <Paper className={`${classes.root} text-center`} >
                        <InputBase
                            className={`${classes.input} search-box text-center`}
                            type="tel"
                            value={quantity}
                            name={props.inputName}
                            onChange={(event) => setValueHandler(event)}
                        />
                    </Paper>
                </Grid>
                <Grid
                    item xs={3}
                    className={`text-left py-2`}
                    style={{color: '#DAAB59'}}
                >
                    <AddCircleOutlineOutlinedIcon onClick={increaseQ} className={`icon-font-small`}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default QuantitySmallInput;
