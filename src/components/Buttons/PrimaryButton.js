import React from 'react';
import Button from "@material-ui/core/Button";

const PrimaryButton = props => {
    return (
        <Button
            variant="outlined"
            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 23%', fontSize: '15px'}}
            className={`${props.classes} capitalize`}
        >
            {props.children}
        </Button>
    )
};

export default PrimaryButton;
