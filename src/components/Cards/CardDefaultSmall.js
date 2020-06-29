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


export default function CardDefaultSmall(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root + ' ' + 'cardDefault2 marginCenter'} style={props.styles}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    {props.children}
                </CardContent>
            </div>
        </Card>
    );
}
