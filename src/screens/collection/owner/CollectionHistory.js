import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SectionNavbars from "../../../components/Sections/SectionNavbars";
import SingleCollectionView from './SingleCollectionView';
import CollectionDateFilter from "../../../components/Date/collectionDateFilter";
import LocalInfo from "../../../services/LocalInfo";


const CollectionHistory = props => {
    const collection = props.collection;
console.log(collection)
    const backHandler = (event) => {
        /*
        * @change this when employees is ready
        * */
        const view =  LocalInfo.branchRole === 'owner' ? 0 : 4; //LocalInfo.branchRole === 'owner' && parseInt(localStorage.getItem('employees')) > 0 ? 0 : 4
        props.setView(view);
    };

    const setDateInstance = (value) => {
        props.changeCollectionDate(value);
    }

    return (
        <div>
            <SectionNavbars
                title="Collection"
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

            <CollectionDateFilter getValue={setDateInstance.bind(this)} day={new Date()}/>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={2} className={`mt-2 mb-5 mx-2`}>

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

                    collection.map((entry) => <SingleCollectionView approveCollection={props.approveCollection} disaproveCollection={props.disaproveCollection} key={entry.id} collection={entry} />)
                }
            </Box>


        </div>
    )
}

export default withRouter(CollectionHistory);
