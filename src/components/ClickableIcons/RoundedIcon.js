import React from "react";
import Styles from './CustomerDetails.module.scss';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from "@material-ui/core/Typography/Typography";

const RoundedIcon = props => {
    
    return (
        <div onClick={props.onClick}>
            <ButtonBase className={Styles.roundDiv} style={props.btnStyle}>
                {props.children}
            </ButtonBase>
            <Grid item xs={12} sm>
                <Typography className={Styles.btnLabel} style={props.btnStyle} >
                    {props.name}
                </Typography>
            </Grid>
        </div>
    );
};

export default RoundedIcon;