import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginRight: theme.spacing(1),
    }
}));



const LocationModal = props => {

    const classes = useStyles();
    const openState = props.openLocation;

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openState}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openState}>
                    <Paper style={{padding: "10px 0px 0px 0px" , width: "90%"}}>
                    <div>
                        <div style={{textAlign: "center", padding: "10px"}}>
                        <LocationOnIcon style={{fontSize: '3.2rem' , color: "#DAAB59"}}/>

                        <h2 id="transition-modal-title">Your current location is</h2>
                        </div>
                        <div className="shadow1" style={{borderRadius: "20px 20px 0px 0px" , padding: "10px" , textAlign: "center"}}>
                            <div style={{paddingTop: "15px" ,paddingBottom: "3px"}}>
                                <span>_______________________________</span>
                                <br />

                            </div>
                            <Grid container style={{paddingTop: "12px" ,paddingBottom: "3px"}}>
                            <Grid item xs={6} style={{textAlign: "center"}}>
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', fontSize : "13px" ,padding: '7px 5px' , width: "90%"}}
                                    className={classes.button}
                                    onClick={props.handleClose}
                                >
                                    No, Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6} style={{textAlign: "center"}}>

                                <Button
                                    variant="outlined"
                                    style={{'backgroundColor': '#DAAB59' , fontSize : "13px", color: '#333333', border: '1px solid #DAAB59', padding: '7px 5px' , width: "100%"}}
                                    className={classes.button}
                                    onClick={props.handleClose}
                                >
                                    Yes, it is correct
                                </Button>
                            </Grid>
                            </Grid>

                        </div>
                    </div>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    )

}

export default LocationModal;