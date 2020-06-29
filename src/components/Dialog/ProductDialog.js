import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export default function MainDialog(props) {

    const handleClose = () => {
        props.handleDialogClose();
    };

    return (
        <div>
            <Dialog
                open={props.states}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className={`modalNew`} style={{textAlign : 'center'}}>
                    {props.children}
                </DialogContent>
            </Dialog>
        </div>
    );
}