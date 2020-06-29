import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MainDialog from '../../Dialog/ProductDialog';
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

const SelectDeleteModal = props => {
    
    const { history } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        lapaz: true,
        adenta: false,
        dansoman: false,
    });
    const { lapaz, adenta, dansoman } = state;

    const openState = props.openState;

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    return(
        <div>
            <MainDialog handleDialogClose={props.handleClose} states={openState} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Typography
                        component="h2"
                        variant="h5"
                        style={{fontSize: '17px' , padding: '10px 0px'}}
                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-light`}
                    >
                        This product appears in many shops
                    </Typography>

                    <Typography
                        component="h2"
                        variant="h5"
                        style={{fontSize: '13px' }}
                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-light`}
                    >
                        Please select branch you want to delete the product from
                    </Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={lapaz} onChange={handleChange} name="lapaz" />}
                            label="Lapaz branch"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={adenta} onChange={handleChange} name="adenta" />}
                            label="Adenta branch"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={dansoman} onChange={handleChange} name="dansoman" />}
                            label="Dansoman branch"
                        />
                        </FormGroup>
                    </FormControl>

                    <Grid container >
                        <Grid item xs={6} >
                            <Button
                                variant="outlined"
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', textTransform: 'none'}}
                                onClick={props.handleClose.bind(this)}
                            >
                                No, delete
                            </Button>
                        </Grid>
                        <Grid item xs={6} >
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px', textTransform: 'none'}}
                                //onClick={deleteProduct.bind(this)}
                                //disabled={loading}
                            >
                                Yes, keep
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </MainDialog>

        </div>
    )

}

export default withRouter(SelectDeleteModal);