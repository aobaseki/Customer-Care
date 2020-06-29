import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardDefault from '../../../../../components/Cards/CardDefault';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import Collapsible from 'react-collapsible';
import { ArcherContainer, ArcherElement } from 'react-archer';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
        fontSize: 9,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center', 
      width: '90%',
      marginLeft: '7px',
      marginBottom: '10px'
    },
    paper2: {
        padding: theme.spacing(1),
        textAlign: 'center', 
        width: '75%',
        marginBottom: '10px'
      }
  }));


const ViewCash = props => {

    const classes = useStyles();
    const reconciliation = props.reconciliation;

    return(
        <div>
            <Paper elevation={3} style={{width: '95%', marginLeft: '10px', marginTop: '10px', paddingBottom: '10px'}}>
                <Grid container >
                    <EventIcon style={{ marginLeft: '5px', marginTop: '10px'}} />
                    <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', marginLeft: '5px', marginTop: '10px'}} >
                        {reconciliation.date}
                    </Typography>
                </Grid>

                <div className={`rounded bordered mb-7 mx-2 px-1 mt-2`} style={{marginBottom: '20px'}}>

                    {reconciliation.balance > reconciliation.collected
                        ?
                        <CardDefault styles={{width: '90%', marginTop: '10px', backgroundColor: '#white', borderRadius: '25px', marginBottom: '10px'}}>
                            <Typography style={{fontSize: '13px', padding: '0px', color: 'red'}}>

                                Result: Your cash is short by GHC {reconciliation.balance - reconciliation.collected}
                            </Typography>
                        </CardDefault>
                        : reconciliation.balance < reconciliation.collected
                        ?
                        <CardDefault styles={{width: '90%', marginTop: '10px', backgroundColor: '#white', borderRadius: '25px', marginBottom: '10px'}}>
                            <Typography style={{fontSize: '13px', padding: '0px', color: 'red'}} >

                                Result: Your cash has exceeded by GHC {reconciliation.collected - reconciliation.balance}
                            </Typography>
                        </CardDefault>
                        :
                        <CardDefault styles={{width: '90%', marginTop: '10px', backgroundColor: '#white', borderRadius: '25px', marginBottom: '10px'}}>
                            <Typography style={{fontSize: '13px', padding: '0px', color: 'green'}}>
                                
                                Result: Balanced sales and expenses
                            </Typography>
                        </CardDefault>
                    }

                    <Collapsible
                        trigger={
                            <div className={`mx-auto w-100`}>
                                <ExpandMoreRoundedIcon/>
                            </div>
                        }
                        triggerWhenOpen={
                            <div className={`mx-auto w-100`}>
                                <ExpandLessRoundedIcon/>
                            </div>
                        }
                    >
                        <ArcherContainer strokeColor='#DAAB59' noCurves={true} >
                            <Grid container style={{ marginBottom: '30px' }} >
                                <Grid item xs={12}>
                                    <ArcherElement
                                        id="root"
                                        relations={[{
                                        targetId: 'element2',
                                        targetAnchor: 'top',
                                        sourceAnchor: 'bottom',
                                        }]}
                                    >
                                        <Paper className={classes.paper}>
                                            <Typography component="p" style={{ margin: '5px 0px 0px 0px', fontSize: '13px' }} >
                                                Sales
                                            </Typography>
                                            <Typography component="p" style={{ fontSize: '13px' }}  >
                                                GHC {reconciliation.sales}
                                            </Typography>
                                        </Paper>
                                    </ArcherElement>
                                </Grid>
                            </Grid>

                            <ArcherElement
                                id="element2"
                                relations={[{
                                    targetId: 'element3',
                                    targetAnchor: 'top',
                                    sourceAnchor: 'bottom',
                                }]}
                            >
                                <Paper className={classes.paper} >
                                    <Grid container >
                                        <Grid item xs={4}>
                                            <Typography component="p" style={{ margin: '5px 0px 0px 0px', fontSize: '13px' }} >
                                                Expense
                                            </Typography>
                                            <Typography component="p" style={{ fontSize: '13px' }}  >
                                                GHC {reconciliation.expenses}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography component="p" style={{ margin: '5px 0px 0px 0px', fontSize: '13px' }} >
                                                Purhases
                                            </Typography>
                                            <Typography component="p" style={{ fontSize: '13px' }}  >
                                                GHC {reconciliation.purchases}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography component="p" style={{ margin: '5px 0px 0px 0px', fontSize: '13px' }} >
                                                Credit
                                            </Typography>
                                            <Typography component="p" style={{ fontSize: '13px' }}  >
                                                GHC {reconciliation.credit}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </ArcherElement>

                            <Grid container style={{ marginTop: '50px' }} >
                                <Grid item xs={4}>
                                    <ArcherElement
                                        id="element3"
                                    >
                                    <Paper className={classes.paper}>
                                        <Typography component="p" style={{ margin: '5px 0px 0px 0px', fontSize: '13px' }} >
                                            Balance
                                        </Typography>
                                        <Typography component="p" style={{ fontSize: '13px' }}  >
                                            GHC {reconciliation.balance}
                                        </Typography>
                                    </Paper>
                                    </ArcherElement>
                                </Grid>

                                <Grid item xs={4} />

                                <Grid item xs={4}>
                                    <Paper className={classes.paper2}>
                                        <Typography component="p" style={{ margin: '5px 0px 0px 0px', fontSize: '11px' }} >
                                            Cash collected
                                        </Typography>
                                        <Typography component="p" style={{ fontSize: '13px' }}  >
                                            GHC {reconciliation.collected}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
            
                        </ArcherContainer>
                    </Collapsible>

                    
                </div>

            </Paper>
        </div>
    );
};

export default ViewCash;