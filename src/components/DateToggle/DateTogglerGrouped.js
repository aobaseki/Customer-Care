import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: `space-evenly !important`,
        alignItems: `stretch !important`,
        alignContent: `space-around !important`
    },
}));

const StyledToggleButton = withStyles((theme) => ({
    root: {
        color: `#DAAB59 !important`,
        padding: `5px 10px !important`,
        fontSize: `12px !important`,
        border: `1px solid #DAAB59 !important`,
        backgroundColor: `#FFFFFF !important`,
        textTransform: `capitalize !important`,
        width: `100% !important`,
        borderRadius: `25px !important`,
        flex: 1,
        flexGrow: 1,
        height: '30px',
    },
    selected: {
        color: `#FFFFFF !important`,
        border: `1px solid #DAAB59 !important`,
        backgroundColor: `#DAAB59 !important`,
    },
}))(ToggleButton);

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
    root: {
        width: `100% !important`
    },
}))(ToggleButtonGroup);

export default function DateTogglerGrouped(props) {
    const [alignment, setAlignment] = React.useState(props.initialValue);
    const values = props.values;
    const handleAlignment = async (event, newAlignment) => {
        await setAlignment(newAlignment);
        props.setValue(newAlignment);
    };

    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.paper}>
            <StyledToggleButtonGroup
                size="small"
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                {
                    values.map(value =>
                        <StyledToggleButton
                            key={value}
                            value={value}
                            aria-label={value}
                        >
                            {value}
                        </StyledToggleButton>
                    )
                }
            </StyledToggleButtonGroup>
        </Paper>
    );
}
