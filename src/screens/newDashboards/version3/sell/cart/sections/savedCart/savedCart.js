import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import SearchInput from "../../../../../../Components/Input/SearchInput";
import Box from "@material-ui/core/Box";
import SecondaryButton from "../../../../../../../components/Buttons/SecondaryButton";
import SectionNavbars from "../../../../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Container from "@material-ui/core/Container";
import SingleSavedCart from "./singleSavedCart";
import { withRouter } from "react-router-dom";

const SavedCart = props => {
    const [searchValue , setSearchValue] = useState({
        search: '',
    });

    const backHandler = () => {
        props.setView(0);
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchSavedCart(value);
    };

    const carts = props.carts;

    return (
        <div className={`mt-6`}>
            <SectionNavbars title="Sales" >
                <div onClick={() => backHandler()}>
                    <ArrowBackIcon
                        style={{fontSize: '2.5rem'}}
                    />
                </div>
            </SectionNavbars>

            <Box className={`mt-5 shadow1 pb-2`} p={1}>
                <p  style={{fontSize: '18px', fontWeight: '600', color: '#333333'}} className={`my-2`}>Saved carts</p>

                <Grid container spacing={1}>
                    <Grid item xs={10} style={{padding: '4px 8px 14px'}} className={`mx-auto`}>
                        <SearchInput
                            inputName="search"
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Container
                maxWidth="sm"
                style={{width: '100%'}}
            >
                {carts.map((cart) => <SingleSavedCart key={cart.id} cartDetails={cart} cartCustomer={cart.customer.fetch()} continueSavedCartHandler={props.continueSavedCartHandler}/>)}
            </Container>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <div
                    onClick={backHandler.bind(this)}
                >
                    <SecondaryButton
                        classes={`py-1 px-5`}
                    >
                        Close
                    </SecondaryButton>
                </div>
            </Box>
        </div>
    );
};

export default withRouter(SavedCart);
