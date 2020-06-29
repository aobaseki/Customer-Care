import React,{useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    activeButton: {
        color: '#FFFFFF',
        padding: '5px 10px',
        fontSize:'10px',
        border: '1px solid #DAAB59',
        textTransform: 'none',
        backgroundColor: '#DAAB59',
        width: '100%',
        borderRadius: '25px',
    },
    inactiveButton: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '5px 10px',
        fontSize:'10px',
        backgroundColor: '#FFFFFF',
        textTransform: 'none',
        width: '100%',
        borderRadius: '25px',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
    }
}));

const DateToggle = props => {
    const classes = useStyles();

    const [activeButton , setActiveButton] = useState(0);

    const buttonOnClick = button => {
        setActiveButton(button);
        props.setView(button);
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Button
                        variant="outlined"
                        className={activeButton === 0 ? classes.activeButton : classes.inactiveButton}
                        onClick={buttonOnClick.bind(this , 0)}
                    >
                        Day
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Button
                        variant="outlined"
                        className={activeButton === 2 ? classes.activeButton : classes.inactiveButton}
                        onClick={buttonOnClick.bind(this , 2)}
                    >
                        Week
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Button
                        variant="outlined"
                        className={activeButton === 3 ? classes.activeButton : classes.inactiveButton}
                        onClick={buttonOnClick.bind(this , 3)}
                    >
                        Month
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Button
                        variant="outlined"
                        className={activeButton === 4 ? classes.activeButton : classes.inactiveButton}
                        onClick={buttonOnClick.bind(this , 4)}
                    >
                        Year
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default DateToggle;
