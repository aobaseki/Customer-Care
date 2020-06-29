import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import MainDialog from "../../Dialog/MainDialog";
import React from "react";
import CustomerOption from "../option/CustomerOption";

const CustomersModal = props => {
    const customers = props.customers;
    const openState = props.openState;

    const [selectedCustomer , setSelectedCustomer] = React.useState(0);

    const changeCustomerHandler = (event) => {
        setSelectedCustomer(event.target.value);
        props.setCustomer(event.target.value);
    };

    return (
        <div>
            <MainDialog handleDialogClose={props.handleClose} states={openState} >
                <div className="row pt-0 mx-auto text-center w-100" >

                    <Typography
                        component="h2"
                        variant="h5"
                        style={{fontSize: '18px' , padding: '20px 0px'}}
                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-bold`}
                    >
                        Assign customer to cart
                    </Typography>

                    <div className="text-center mx-auto">

                        <TextField
                            select
                            label="Select customer"
                            defaultValue={selectedCustomer}
                            style={{width: '250px', marginBottom: '15px'}}
                            onChange={changeCustomerHandler.bind(this)}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            <option value={0}>Cash Customer</option>
                            {customers.map(option =>
                                <CustomerOption key={option.id} customer={option}/>
                            )}
                        </TextField>
                    </div>

                    <div className="text-center mx-auto my-3">
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', marginBottom: '15px', textTransform: 'none', fontSize:'18px'}}
                            onClick={props.openAddCustomerModal}
                        >
                            Add new customer
                        </Button>
                    </div>

                    <div className="text-center mx-auto my-3">
                        <Button
                            variant="outlined"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 58px', textTransform: 'none', fontSize:'17px'}}
                            onClick={props.handleClose}
                        >
                            Finish
                        </Button>
                    </div>

                </div>
            </MainDialog>
        </div>
    )
};

export default CustomersModal;