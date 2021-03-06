import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import Box from "@material-ui/core/Box/Box";

import SectionNavbars from "../../../components/Sections/SectionNavbars";
import SystemDate from "../../../components/Date/SystemDate";


const CollectionHistory = props => {

    const collection = props.collection;

    const backHandler = (event) => {
        props.setView(0);
    };

    return (
        <div>
            <SectionNavbars
                title="Accounting"
                leftIcon={
                    <div onClick={backHandler.bind(this)}>
                        <ArrowBackIosIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Paper style={{marginTop: '60px'}} >
                <Grid container spacing={2} style={{marginTop: '10px', marginBottom: '5px'}} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >
                            Collection history
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <SystemDate />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>

                {collection.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No collections made
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                        <Grid item xs={10} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <div className='text-dark font-weight-bold'  style={{ paddingBottom: '5px', marginLeft: '10px'}}>{collection.date}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px', marginLeft: '10px'}}>Collected: GHC {collection.amount}</div>
                            </div>
                        </Grid>

                        <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '10px' }} >
                            <EditIcon style={{fontSize: '30px', color: '#DAAB59'}} />
                                <br/>
                            Edit
                        </Grid>
                    </Grid>
                }
            </Box>


        </div>
    )
}

export default CollectionHistory;