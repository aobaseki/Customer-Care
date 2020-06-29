import React from 'react';
import Button from "@material-ui/core/Button";

const SecondaryButton = props => {
    return (
        <Button
            variant="contained"
            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 15%' , fontSize: '15px'}}
            className={`${props.classes} capitalize`}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
};

export default SecondaryButton;
