import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";

import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";
import SystemDate from "../../../components/Date/SystemDate";
import SingleRecentView from './SingleRecentView';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: '70px',
        marginBottom: '3px',
      },
      title: {
          fontSize: '11px',
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
      },
      money: {
          fontSize: '17px',
          
      },
      paper3: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '80%',
        marginLeft: '25px',
    },
    paper2: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '90%',
        marginTop: '20px',
        marginLeft: '10px',
    },
    dateInput: {
        borderBottomStyle: 'solid'
    }
}));

const MainPage = props => {

    const classes = useStyles();
    const collection = props.collection;
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    const historyHandler = (event) => {
        props.setView(1);
    };

    return (
        <div>
            <SectionNavbars
                title="Collection"
                leftIcon={
                    <div onClick={() => setIsDrawerShow(true)}>
                        <MenuIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

            

            <Grid container spacing={1} className={classes.root} >
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Today's sales
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC 500.00
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Today's purchases
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC 100.00
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Credit sales
                        </Typography>
                        <Typography className={classes.money} component="h1" variant="h6" >
                            GHC 0.00
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>

            <Typography className='text-dark font-weight-bold py-2' style={{ fontSize: '16px', marginBottom: '10px', marginTop: '10px', fontWeight: '600' }} >
                Collections for today
            </Typography>

            <Paper variant="outlined" className={classes.paper3}>

                <label className={`text-center`} style={{fontSize: '15px', marginBottom: '10px'}}> Date</label>

                <SystemDate style={{margin: '20px 0px'}} />

                <label className={`text-center`} style={{fontSize: '15px', marginTop: '10px',}}> Amount cash collected</label>

                <TextField 
                    id="outlined-basic" 
                    name="amount"
                    variant="outlined" 
                    size="small" 
                    // onChange={handChange.bind(this)}
                    type='number'
                    style={{margin: '10px 0px 30px 0px'}} 
                />

                <Button
                    type="submit"
                    variant="outlined"
                    style={{
                        border: '1px solid', 
                        color: '#DAAB59', 
                        padding: '4px 50px', 
                        marginBottom: '15px', 
                        textTransform: 'none', 
                        fontSize:'15px'}}
                >
                        Save
                </Button>
            </Paper>

            {collection.length === 0
                ?
                <div>

                    <Paper variant="outlined" className={classes.paper2} style={{marginBottom: '100px'}} >
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '16px', margin: '20px, 0px' }} >
                            Saved collections today
                        </Typography>

                        <Typography style={{ fontSize: '18px', padding: '30px', marginBottom: '30px', fontStyle: 'italic'}} >
                            No saved collections today
                        </Typography>
                        
                    </Paper>
                </div>
                :
                <div>
                    <Paper variant="outlined" className={classes.paper2} style={{marginBottom: '100px'}}>
                        <Typography className='text-dark font-weight-bold py-2' style={{ fontSize: '16px' }} >
                            Recent collections
                        </Typography>

                        {collection.slice(0, 2).map((entry) => <SingleRecentView  key={entry.id} collection={entry} />)}

                    </Paper>
                </div>
            }

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
             
                <Button
                    variant="contained"
                    style={{backgroundColor:'#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'15px'}}
                    onClick={historyHandler.bind(this)}
                >
                    View history
                </Button> 
                
            </Box>

        </div>
    )
}

export default withRouter(MainPage);
