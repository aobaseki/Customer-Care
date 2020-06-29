import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { withRouter } from "react-router-dom";
import paths from "../../../utilities/paths";
import LocalInfo from "../../../services/LocalInfo";
import Button from "@material-ui/core/Button/Button";
import Container from "@material-ui/core/Container/Container";
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Modal from "../../../components/Modal/Modal";
import {makeStyles} from "@material-ui/core";
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import BranchStockService from "../../../services/BranchStockService";

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
    }
}));

const BottomMenu = props => {
    const classes = useStyles();
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');

    const { history } = props;
    const [sellingPriceDialog, setSellingPriceDialog] = useState(false);
    const [changePriceFields , setChangePriceFields] = useState({
        sellingPrice: "",
        branchProductId: props.branchProduct.id,
    });
    const [newLoading , setNewLoading] = useState(true);

    const setView = (step) => {
        props.setView(step);
    };

    const changeSellingPriceModalState = () => {
        setSellingPriceDialog(!sellingPriceDialog);
    };

    const saveChangePrice = async() => {
        setNewLoading(true)

        const response = await new BranchStockService().changeProductSellingPrice(changePriceFields);

        if(response){
            props.setSP(parseFloat(changePriceFields.sellingPrice))
            setSuccessMsg('Selling price was changed successfully');
            setSuccess(true);
            setTimeout(function(){
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);
            setChangePriceFields({
                sellingPrice: "",
                branchProductId: props.branchProduct.id,
            });
        }else{
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function(){
                setErrorMsg('');
                setError(false);
            }, 2000);
        }

        changeSellingPriceModalState();

        setNewLoading(false)
    };

    const changePriceFieldsHandler = (event) => {
        const {...oldFormFields} = changePriceFields;
        setNewLoading(false)

        oldFormFields[event.target.name] = event.target.value;

        setChangePriceFields(oldFormFields);
    };

    return (
        <Grid
            container
            spacing={1}
            className={`py-1`}
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <SimpleSnackbar
                direction="bottom"
                type="success"
                openState={success}
                message={successMsg}
            />

            <SimpleSnackbar
                direction="bottom"
                type="warning"
                openState={error}
                message={errorMsg}
            />

            <Modal
                states={sellingPriceDialog}
                handleClose={changeSellingPriceModalState.bind(this)}
                title={`Change price`}
                footer={
                    <div>
                        <Button
                            style={{'backgroundColor': '#FFFFFF', border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 40px' , marginRight: '5px'}}
                            onClick={changeSellingPriceModalState.bind(this)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px'}}
                            onClick={saveChangePrice}
                            disabled={newLoading}
                        >
                            Save
                        </Button>
                    </div>
                }
            >
                <Container className={`mx-3 my-3`} style={{width: '100%'}}>
                    <Grid item xs={12}>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '300', fontSize: '17px' , margin: '0px 0px 20px', padding: '4px'}}
                            className={`text-center mx-auto`}
                        >
                            New cost price: GHC {parseFloat(props.costPrice).toFixed(2) || 0}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} >
                        <label className={`text-dark py-2 text-left`} style={{fontSize: '18px'}}> New selling price</label>

                        <Paper className={classes.root} >
                            <InputBase
                                className={`${classes.input} search-box text-center`}
                                type="tel"
                                initialValue=""
                                value={changePriceFields.sellingPrice}
                                name="sellingPrice"
                                onChange={(event) => changePriceFieldsHandler(event)}
                            />
                        </Paper>
                    </Grid>
                </Container>
            </Modal>
            <div
                className={`text-center icon-color`}
                style={{
                    flex: 1,
                }}
                onClick={() => setView(5)}
            >
                <AddShoppingCartOutlinedIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                    
                >
                    Add stock
                </Typography>
            </div>

            {LocalInfo.branches.length > 1 ?
                <div
                    style={{flex: 1}}
                    onClick={setView.bind(this, 6)}
                    className={`text-center icon-color`}
                >
                    <SwapHorizOutlinedIcon
                        style={{fontSize: '25px'}}
                    />
                    <Typography
                        component="h6"
                        variant="h6"
                        style={{fontSize: '12px'}}
                        onClick={() => setView(6)}
                    >
                        Move stock
                    </Typography>
                </div>
                : ''}
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
                onClick={() => history.push(paths.purchase_history, {pageName: true, product: props.branchProduct.productId})}
                //onClick={addProductHandler.bind(this, branchProduct.productId)}

            >
                <AccessTimeIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    History
                </Typography>
            </div>
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
                onClick={() => setSellingPriceDialog(true)}
            >
                <CreateOutlinedIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    Change price
                </Typography>
            </div>
        </Grid>
    );
};

export default withRouter(BottomMenu);

