import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
}));


export default function CardDefault(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root + ' ' + 'cardDefault marginCenter'} style={props.styles} onClick={props.onClick}> 
            <div className={classes.details}>
                <CardContent className={classes.content} >
                    {props.children}
                </CardContent>
            </div>
        </Card>
    );
}
