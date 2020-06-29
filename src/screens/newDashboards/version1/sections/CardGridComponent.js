import React from 'react';

import Typography from "@material-ui/core/Typography/Typography";
import CardDefault from "../../../components/Cards/CardDefault";
import Grid from "@material-ui/core/Grid/Grid";



export default function CardGridComponent(props) {
    return (
        <Grid item xs={6}>
            <CardDefault styles={{width: '85%', marginTop: '10px', borderRadius: '10px'}} >
                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontWeight: '500', fontSize: '15px' , lineHeight: '1.3'}}
                    className={`mx-2`}
                >
                    {props.title}
                </Typography>
                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '700', fontSize: '18px' , lineHeight: '1.2'}}
                >
                    GHC {props.amount}
                    {props.children}
                </Typography>
            </CardDefault>
        </Grid>
    );
}
