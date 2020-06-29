import React from 'react';
import Box from "@material-ui/core/Box/Box";

export default function BoxDefault(props) {

    return (
        <Box
            bgcolor="background.paper"
            p={1}
            className={'boxDefault'}
            style={props.styles}
        >
            {props.children}
        </Box>
    );
}
