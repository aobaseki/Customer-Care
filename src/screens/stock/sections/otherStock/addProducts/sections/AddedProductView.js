import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {makeStyles} from "@material-ui/core";
import AddedProductSingle from "./addedView/AddedSingleView";
import MainDialog from "../../../../components/Dialog/MainDialog";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const AddedProductView = props => {
    const [mainDialog, setMainDialog] = React.useState(false);
    const quantity = props.pro_quantity;
    const [type, setType] = useState(10);

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    const handleTypeChange = event => {
        setType(event.target.value);
    };

    const backHandler = (event) => {
        props.setView(0);
    };

    const finsihHandler = (event) => {
        props.setView(4);
    };

    const deleteProductHandler = (event) => {
        props.deleteProduct(event);
    };

    const editProductHandler = (pId , event) => {
        props.productEdit(pId , 3);
    };

    const classes = useStyles();

    return(
        <div>
            <div style={{width: '95%', padding: '0px 2%' , paddingTop: '60px', paddingBottom: '60px'}}>
                <div className="row p-0 pt-0 mx-0 text-center">
                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontSize: '18px' , margin: '0px 0px', padding: '5px'}}
                        className={`text-center mx-auto w-100 text-dark font-weight-bold`}
                    >
                        {`Added products (${props.products.length})` }
                    </Typography>
                </div>

                <Grid container spacing={1}>
                    <Grid item xs={6} style={{padding: '4px 8px'}}>
                        <Paper className={classes.root} >
                            <InputBase
                                className={`${classes.input} search-box`}
                                placeholder="Search for a product"
                                inputProps={{ 'aria-label': 'Search for a product' }}
                            />
                            <IconButton className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>

                    <Grid item xs={6} style={{padding: '4px 8px'}}>
                        <Paper className={classes.root} >
                            <Select
                                value={type}
                                onChange={handleTypeChange}
                                style={{width: '100%' , backgroundColor: 'rgba(255, 255, 255, 0)' , border: 'none'}}
                            >
                                <MenuItem value={10}>All products</MenuItem>
                                <MenuItem value={30}>Incomplete products</MenuItem>
                                <MenuItem value={20}>Stocked products</MenuItem>
                                <MenuItem value={40}>Unstocked products</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>
                </Grid>

                <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                    {props.products.map((item) => <AddedProductSingle deleteStoreProduct={deleteProductHandler.bind(this)} editStoreProduct={editProductHandler.bind(this)} key={item.pro_id} item={item}/>)}
                </Box>
            </div>
            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog}>
                <div className="row p-3 pt-0 mx-auto text-center w-100">

                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontSize: '16px' , margin: '0px 0px', padding: '16px'}}
                        className={`text-center mb-2 mx-auto w-75 text-dark font-weight-bold`}
                    >
                        You have not stocked up all the products in the list.
                    </Typography>

                    <div className="text-center mx-auto">
                        <label>I want to complete stock info.</label>
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px'}}
                            onClick={closeDialogHandler.bind(this)}
                        >
                            Go back
                        </Button>
                    </div>

                    <div className="text-center mx-auto my-3">
                        <label>I have finished adding products.</label>
                        <Button
                            variant="outlined"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 58px'}}
                            onClick={finsihHandler.bind(this)}
                        >
                            Finish
                        </Button>
                    </div>
                    {/*<div className="text-center mx-auto w-75">
                        <span className="mx-auto mb-2 font-weight-bold text-dark" style="font-size: 14px;">You have not stocked up all the products in the list.</span>

                        <div className="row text-center mx-auto w-100 mt-2 mb-4 py-3 px-1">
                            <span className="mx-auto w-100 font-weight-bold" style="font-size: 14px;">I want to complete stock info.</span>
                            <button type="button"
                                style="color: #DAAB59;font-size: 16px;border-color: #DAAB59;border-radius: 2px;"
                                className="w-100 bg-white btn btn-warning font-weight-bold px-0 mx-1"
                                onClick={closeDialogHandler.bind(this)}
                            >Go back
                            </button>
                        </div>

                        <div className="row text-center mx-auto w-100 mt-2 py-3 px-1 rounded-pill">
                            <span className="mx-auto w-100 font-weight-bold">I have finished adding products.</span>
                            <a style="background-color: #DAAB59;color: #333; font-size: 16px; border-radius: 2px;"
                               className="mx-auto font-weight-bold w-100 py-2 btnDone">Finish</a>
                        </div>
                    </div>*/}
                </div>
            </MainDialog>
            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                            onClick={backHandler.bind(this)}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                            onClick={openDialogHandler.bind(this)}
                        >
                            Finish
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default withRouter(AddedProductView);