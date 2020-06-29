import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(0),
        marginLeft: '0px',
        marginTop: '5px'
    },

    header: {
        'background-color': '#DAAB59 !important',
        color: '#343a40 !important'
    }
}));


export default function SectionNavbars(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" style={{ background: '#DAAB59' , color: '#343a40'}}>
                <Toolbar variant="dense">
                    <IconButton color="inherit" style={{color: '#000000'}} edge="start" className={classes.menuButton} aria-label="menu">
                        {props.leftIcon}
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={{'fontWeight': 700, 'color': '#3d3d3d', textAlign: 'center', margin: '0 auto'}} >
                        {props.title}
                    </Typography>
                    <div className={`rightMenuIcons`}>
                        <IconButton>
                            {props.rightIcon}
                        </IconButton>
                    </div>
                    <div className={`rightMenuIcons`}>
                        <IconButton color="inherit">
                            {props.icons}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
