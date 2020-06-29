import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import CardDefault from "../../../../components/Cards/CardDefault";
import Grid from "@material-ui/core/Grid/Grid";
import Box from "@material-ui/core/Box/Box";
import confirmImg from "../../../../assets/img/dashboard.png";
import BoxDefault from '../../../../components/Box/BoxDefault';


export default function CardGridComponent(props) {
    return (
        <Grid item xs={6} style={{ marginTop: '20px'}}>
            <CardDefault styles={{width: '95%'}} >
                <Box component="div" m={2} style={{paddingTop: '0px'  , marginBottom: '0px' }} onClick={props.onClick} >
                    <img className={`img-responsive`} src={props.source} alt={'test'} style={{ height: '110px', width: '150px', marginTop: '-30px', marginLeft: '-20px', marginBottom: '-30px'}}/>
                </Box>

                <Box
                    bgcolor="background.paper"
                    p={3}

                    style={{height: '30px', width: '100%', backgroundColor: '#afbebba8', color: 'white', marginTop: '20px'}}
                >

                    <Typography className='font-weight-bold pt-2' style={{ fontSize: '15px', marginTop: '-10px', textAlign: 'left'}} onClick={props.onClick} >
                        {props.text}
                    </Typography>

                </Box>
                
            </CardDefault>
        </Grid>
    );
}
