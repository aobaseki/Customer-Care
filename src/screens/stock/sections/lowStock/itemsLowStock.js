import React from 'react';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import SecondaryButton from "../../../../components/Buttons/SecondaryButton";
import LowStockProductSingle from "./lowStockProductSingle";

const ItemsLowStock = (props) => {
    const products = props.stock;

    const backHandler = () => {
        props.setView(0);
    };

    return (
        <div className={`mt-6`}>
            <SectionNavbars title="Stock"
                leftIcon= {
                    <ArrowBackIcon
                        onClick={backHandler.bind(this)}
                        style={{fontSize: '2.5rem'}}
                    />
                }
            />


            <div className="row p-0 pt-0 mx-0 text-center shadow1 mb-3">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '8px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    Items with stock less than 10
                </Typography>
            </div>

            <Box style={{marginTop: '5px' , margin: '2px 5px', paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>

                {products.map((product) => <LowStockProductSingle addNewProductStockView={props.addNewProductStockView} key={product.id} product={product}/>)}
            
            </Box>

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
                        Back
                    </SecondaryButton>
                </div>
            </Box>
        </div>
    );
};

export default ItemsLowStock;
