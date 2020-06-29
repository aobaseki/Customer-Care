import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Box from "@material-ui/core/Box/Box";

import CustomerCard from "../../../../components/Cards/CustomerCard";
import SearchInput from "../../../Components/Input/SearchInput";

const CustomerView = props => {

    const addCustomerHandler = (id) => {
        console.log(id);
        props.customerAdd(id, 0);
    };

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const branchCustomers = props.branchCustomers;


    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchCustomer(value);
    };

    return(
        <div>
            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', margin: '5px 0px' }} >
                Search for a customer to view history
            </Typography>

            <Grid container spacing={1}>
                <Grid item xs={12} style={{marginTop: '5px', padding: '4px 4px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                        styles={{width: '95%'}}
                    />
                </Grid>
            </Grid>
                
            <Box style={{marginTop: '5px' , paddingBottom: '20px'}} p={1} className={`mt-3 mb-5`}>
                {branchCustomers.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No customer found
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    branchCustomers.map((branchCustomer) =>
                    <div
                        key={branchCustomer.customerId}
                        onClick={addCustomerHandler.bind(this, branchCustomer.customerId)}
                    >
                        <CustomerCard customer={branchCustomer.customer.fetch()}>
                            
                        </CustomerCard>
                    </div>
                    )
                }

            </Box>

                {/* <Button
                    variant="outlined"
                    style={{
                        border: '1px solid #DAAB59', 
                        color: '#DAAB59', 
                        padding: '5px 30px', 
                        textTransform: 'none', 
                        fontSize:'17px',
                        marginTop: '20px', 
                        marginBottom: '20px', 
                        textAlign: 'center'
                    }}
                >
                    Scan Barcode   
                </Button> */}

        </div>
    );
};

export default CustomerView;