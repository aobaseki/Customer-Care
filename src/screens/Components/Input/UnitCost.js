import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {makeStyles} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import '../../../components/Input/styles/SellInput.scss';
import CostCalculator from "../../../components/Calculator/CostCalculator";

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

const CostInput = props => {
    let value = props.initialValue;
    const classes = useStyles();
    const inputName = props.inputName;
    const [quantity , setQuantity] = useState(value);
    const [calculatorDialog, setCalculatorDialog] = useState(false);

    const setValueHandler = (event) => {
        event.persist();
        /*if(isNaN(event.target.value) || (event.target.value).length <= 0)
        {
            setQuantity();
            return
        }*/

        setQuantity(event.target.value);
        props.getValue(inputName , event.target.value);
    };

    const openCalculator = () => {
        setCalculatorDialog(true);
    };

    const getCalculatorModalState = (value) => {
        setCalculatorDialog(value);
    };

    const getCalculatorValue = (value) => {
        if(isNaN(value) || (value).length <= 0)
        {
            setQuantity();
            return
        }

        setQuantity(value);
        props.getValue(inputName , value);
    };

    return(
        <div>
            <label className={`text-dark py-2 text-center`} style={{fontSize: '18px', fontWeight: '600'}}> {props.label}</label>

            <Paper className={classes.root} id={props.id} >
                <InputBase
                    className={`${classes.input} search-box text-center`}
                    type="tel"
                    value={value}
                    name={inputName}
                    classes={{
                        input: classes.center
                    }}
                    onChange={(event) => setValueHandler(event)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={openCalculator}
                            >
                                {/* <FontAwesomeIcon onClick={openCalculator.bind(this)} icon={faCalculator} fixedWidth /> */}
                                {props.children}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Paper>


            <CostCalculator product={props.product} calculatedPrice={getCalculatorValue.bind(this)} closeModal={getCalculatorModalState.bind(this)} calculatorDialog={calculatorDialog}/>
        </div>
    );
};

export default CostInput;
