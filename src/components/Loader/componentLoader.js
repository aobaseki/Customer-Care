import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import {
    makeStyles,
} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles({
    root: {
        color: '#DAAB59',
        display: 'flex',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const ComponentLoader = (props) => {
    const styles = useStyles();

    return(
        <div className={styles.root}>
            <BounceLoader
                size={props.size || 60}
                color={props.color || "#DAAB59"}
                loading={props.state || true}
            /><br/>

            <Typography
                component="h5"
                variant="h5"
                style={{fontWeight: '400', fontSize: '16px' , padding: '14px'}}
                className={`text-center mx-auto`}
            >
                {props.text}
            </Typography>
        </div>
    );
};

export default ComponentLoader;
