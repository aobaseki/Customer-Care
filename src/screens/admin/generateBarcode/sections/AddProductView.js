import React , {useState} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import {makeStyles} from "@material-ui/core";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SuccessDialog from "../../../Components/Dialog/SuccessDialog";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ChangePriceInput from "../../../Components/Input/ChangePriceInput";


const useStyles = makeStyles(theme => ({
    root: {
        width: '92%',
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
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddProductView = props => {
    const [history , setHistory] = useState([{"st_id":"20766","st_date":"2020-02-18","st_quantity":"3","st_product":"32","st_store_id":"1","timestamps":"2020-02-18 11:27:05"},{"st_id":"17451","st_date":"2020-01-09","st_quantity":"1","st_product":"32","st_store_id":"1","timestamps":"2020-01-09 13:40:05"}]);
    const [successDialog, setSuccessDialog] = React.useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [formFields , setFormFields] = React.useState({
        quantity: '',
        sellingPrice: '',
        costPrice: '',
        pro_id: props.product[0].pro_id,
    });

    const classes = useStyles();

    const product = props.product[0];
    const image = `https://elparah.store/admin/upload/${product.image}`;

    const deleteHistory = (historyId , event) => {
        console.log(historyId);

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this item.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let old_list = [...history];

                        const result = old_list.filter(item => item.st_id !== historyId);

                        setHistory([...result]);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        })
    };

    const saveStock = (event) => {
        if((formFields.costPrice !== "" || parseFloat(formFields.costPrice !== 0)) && (formFields.sellingPrice !== "" || parseFloat(formFields.sellingPrice !== 0))){
            if(parseFloat(formFields.costPrice) >= parseFloat(formFields.sellingPrice)){
                setErrorDialog(true);
                setTimeout(function(){
                    setErrorDialog(false);
                }, 3000);
                return false;
            }

        }

        props.addNewProduct(formFields);

        setSuccessDialog(true);

        setTimeout(function(){
            setSuccessDialog(false);
            props.setView(0, event)
        }, 2000);
    };

    const backHandler = (event) => {
        confirmAlert({
            title: 'Confirm to cancel',
            message: 'You risk losing the details entered for this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.setView(0);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        });
    };

    const setInputValue = (name , value) => {
        console.log(name , value)
        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;
        console.log(oldFormFields)

        setFormFields(oldFormFields);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
    };


    return(
        <div style={{paddingTop: '60px'}}>
            <SuccessDialog states={successDialog}/>

            <div className="row p-0 pt-0 mx-0 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '16px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    {product.pro_name}
                </Typography>
            </div>
            <div>
                <img className={`img-fluid imageProduct mx-auto d-block pt-2`} src={image} alt={`${product.pro_name}`}/>
            </div>

            <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    Cost price can not be more than selling more
                </Alert>
            </Snackbar>
            <br />
            <div
                className={`row shadow1 pb-3`}
                style={{'borderTopLeftRadius': '15px', 'borderTopRightRadius': '15px', marginBottom: '60px' , paddingLeft: '50px'}}
            >

                <div className={`rounded mb-3 mx-3 px-3 py-3`}>
                    <Typography
                        component="p"
                        style={{fontSize: '15px' , margin: '0px 0px', paddingBottom: '7px'}}
                        className={`text-left text-dark`}
                    >
                        Current cost price : Ghc {product.Cost_Price}
                    </Typography>
                    <ChangePriceInput label={`New cost price`} inputName="costPrice" getValue={setInputValue.bind(this)} style={{width:'80%'}}/>

                    <Typography
                        component="p"
                        style={{fontSize: '15px' , margin: '0px 0px' , paddingBottom: '7px' , paddingTop: '20px'}}
                        className={`text-left text-dark`}
                    >
                        Current selling price : Ghc {product.Selling_Price}
                    </Typography>
                    <ChangePriceInput label={`New selling price`} inputName="sellingPrice" getValue={setInputValue.bind(this)}/>
                </div>


            </div>


            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                    onClick={backHandler.bind(this)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                    onClick={saveStock.bind(this)}
                >
                    Save
                </Button>
            </Box>
        </div>
    )
};

export default AddProductView;