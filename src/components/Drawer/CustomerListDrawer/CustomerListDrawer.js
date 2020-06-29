import React , {useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from "@material-ui/core/Grid/Grid";
import SearchInput from "../../../screens/Components/Input/SearchInput";
import Divider from "@material-ui/core/Divider/Divider";
import ListItem from "@material-ui/core/ListItem/ListItem";
import CustomerSingleItem from "./CustomerSingleItem";
import SecondaryButton from "../../Buttons/SecondaryButton";
import AddCustomerModal from "../../Modal/Customer/AddCustomerModal";
import CustomerService from "../../../services/CustomerService";
import SimpleSnackbar from "../../Snackbar/SimpleSnackbar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const useStyles = makeStyles({
    list: {
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    paper: {
        maxHeight: `90% !important`
    },
    fullList: {
        width: 'auto',
        backgroundColor: '#FFFFFF',
    },
    root: {
        backgroundColor: `#FFFFFF !important`,
    }
});

export default function CustomerListDrawer(props) {
    const [addDialog, setAddDialog] = useState(false);

    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState({
        search: ''
    });

    const changeCustomerHandler = (customerId) => {
        props.setCustomer(customerId);
    };

    const setAddCustomerHandler = async() => {
        const lastCustomer = await new CustomerService().getLastCustomer();
        props.setCustomer(lastCustomer.id);

        setSuccessMsg('Customer successfully set.');
        setSuccess(true);

        setTimeout(function(){
            setSuccessMsg('');
            setSuccess(false);
        }, 2000);

        setAddDialog(false);
    };

    const setInputValue = async (name, value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchCustomerHandler(value);
    };

    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
        >
            <div className="row px-2 mx-0 py-3 shadow1 w-100" style={{height: '30px'}}>
                <div
                    onClick={props.handleClose}
                    style={{float: 'left'}}
                >
                    <ArrowBackIosIcon style={{fontSize: '1.8rem', marginRight: '5px'}} />
                </div>

                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '20px' , margin: '0px 0px', float: 'left'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    Assign customer to cart
                </Typography>
            </div>
            <Box component="div" style={{margin: '5px 0px 0px 0px'}}>
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px'}}
                    className={`text-center mx-auto text-dark`}
                >
                    Select a customer to assign to cart
                </Typography>

                <Grid container spacing={1} className={`my-1`}>
                    <Grid item xs={12} style={{padding: '4px 8px'}} className={`mx-auto`}>
                        <SearchInput
                            styles={{border: '1px solid #e5e5e5'}}
                            inputName="search"
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Divider variant={`fullWidth`} style={{width: '100%', color: '#e5e5e5'}} className={`mt-2`}/>

            <List style={{marginBottom: '55px', color: '#000000' , backgroundColor: '#ffffff'}}>

                {/*{
                    searchValue.search === '' ?
                        <>
                            <ListItem key={0} onClick={changeCustomerHandler.bind(this, 0)}>
                                <ListItemText primary={`Cash Customer`} />
                            </ListItem>
                            <Divider variant={`fullWidth`} style={{width: '100%', color: '#e5e5e5'}} className={`mb-1`}/>
                        </>
                        :
                        ''
                }*/}

                {
                    (props.customers).map((customer) => (
                        <div key={customer.id}>
                            <ListItem key={customer.id} onClick={changeCustomerHandler.bind(this , customer.customerId)}>
                                <CustomerSingleItem customer={customer}/>
                            </ListItem>
                            <Divider variant={`fullWidth`} style={{width: '100%', color: '#e5e5e5'}} className={`mb-1`}/>
                        </div>

                    ))
                }
            </List>
            <Box
                className={`shadow1 mx-auto`}
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <div onClick={() => setAddDialog(true)} className={`mx-auto text-center`}>
                    <SecondaryButton>
                        Add new customer
                    </SecondaryButton>
                </div>
            </Box>
        </div>
    );

    return (
        <div>
            <React.Fragment key={`bottom`}>
                <AddCustomerModal
                    openCustomerAddState={addDialog}
                    setCustomer={setAddCustomerHandler.bind(this)}
                    handleClose={() => setAddDialog(false)}
                />

                <SimpleSnackbar
                    type="success"
                    openState={success}
                    message={successMsg}
                />

                <Drawer
                    anchor={`bottom`}
                    open={props.isShow}
                    classes={{
                        //root: classes.root,
                        paper: classes.paper
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
