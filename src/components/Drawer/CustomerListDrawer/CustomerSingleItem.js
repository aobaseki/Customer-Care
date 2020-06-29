import {useEffect, useState} from "react";
import React from "react";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const CustomerSingleItem = props => {
    const branchCustomer = props.customer;
    const [customer , setCustomer] = useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer) {
            getCustomer();
        }
    }, []);

    const getCustomer = async () => {
        const newCustomer = await branchCustomer.customer.fetch();
        setCustomer(newCustomer);
    };

    return (
        <ListItemText primary={`${customer.firstName} ${customer.otherNames}`} />
    )
};

export default CustomerSingleItem;
