import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './successDialog.scss';

export default function SuccessDialog(props) {
    const [setOpen] = React.useState(props.states);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
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
                    <CheckCircleIcon style={{color: '#53BF77' , fontSize: '130px', backgroundColor: '#ffffff'}}/>

                    <h5 className="infoHeading">Success</h5>
                </DialogContent>
            </Dialog>
        </div>
    );
}
