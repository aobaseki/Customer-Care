import React , { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SimpleSnackbar(props) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        // Update the document title using the browser API
        setOpen(props.openState);
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: props.direction || 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={props.type} style={{minWidth: '300px'}}>
                    {props.message}
                    {props.children}
                </Alert>
            </Snackbar>
        </div>
    );
}
