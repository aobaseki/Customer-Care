import React, {useState} from 'react';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Modal from "../Modal/Modal";
import './costPriceCalculator.scss';
import PriceInput from "../Input/PriceInput";

const CostCalculator = (props) => {
    const [formFields , setFormFields] = useState({
        quantityRoll: 0,
        quantityPack: 0,
        totalCost: 0,
    });

    const setInputValue = (name , value) => {
        const {...oldFormFields} = formFields;

        oldFormFields[name] = parseInt(value);

        setFormFields(oldFormFields);
    };

    const calculatePrice = async () => {
        //console.log('me')
        const quantityRoll = parseFloat(formFields.quantityRoll);
        const quantityPack = parseFloat(formFields.quantityPack);
        const totalCost = parseFloat(formFields.totalCost);

        if(quantityRoll <= 0 || quantityPack <=0 || totalCost <= 0 || isNaN(quantityRoll) || isNaN(quantityPack) || isNaN(totalCost)){
            return false
        }

        const costPrice = (totalCost / (quantityPack * quantityRoll)).toFixed(2);

        props.calculatedPrice(costPrice);
        console.log(costPrice)
        props.closeModal(false);
    };

    const handleModalClose = () => {
        props.closeModal(false);
    };

    return(
        <div>
            <Modal
                footer={[<Box
                    className="mx-auto"
                    bgcolor="background.paper"
                    p={1}
                    style={{ height: '2.5rem', width:"100%"}}
                    key={props.product.id}
                >
                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', marginRight: '10px'}}
                        onClick={handleModalClose.bind(this)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 25px'}}
                        onClick={calculatePrice.bind(this)}
                    >
                        Calculate
                    </Button>
                </Box>]}
                handleClose={handleModalClose.bind(this)}
                title={[<div key={props.product.id} ><h5 className={`font-weight-bold text-dark my-0`}>Cost Price Calculator</h5><span style={{fontSize: '16px', fontWeight: '400'}}>{props.product.name}</span></div>]}
                states={props.calculatorDialog}
            >
                <PriceInput inputName="quantityRoll" getValue={setInputValue.bind(this)} label={`Quantity on a roll/box`}/>
                <PriceInput inputName="quantityPack" getValue={setInputValue.bind(this)} label={`How many boxes/pack did you buy`}/>
                <PriceInput inputName="totalCost" getValue={setInputValue.bind(this)} label={`What was the total cost of all the items?`}/>
            </Modal>
        </div>
    )
};

export default CostCalculator;
