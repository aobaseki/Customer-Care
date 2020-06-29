import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../../../components/Sections/SectionNavbars';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dates from '../../../../components/Date/Date';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box/Box";
import Paper from '@material-ui/core/Paper';
import Switch from '../../../../components/Switch/Switch';
import CardDefault from '../../../../components/Cards/CardDefault';
import Button from "@material-ui/core/Button/Button";
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ShareIcon from '@material-ui/icons/Share';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import subDays from "date-fns/subDays";

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center'
    }
}));

const ReconciliationReport = props => {
    const [variant, setVariant] = useState('day');
    const [startDay , setDay] = useState(subDays(new Date() , 1));
    const [endDay , setEndDay] = useState(new Date());

    const [isShowDrawer , setIsShowDrawer] = useState(false);

    const changeView = (event) => {
        props.setView(0);
     };

     const setView = (view) => {
        props.setView(view);
    };

    // const setValue = value => {
    //     setVariant(value);
    // };

    const setStartDate = (value) => {
        console.log(value)
    };

    const setEndDate = (value) => {
        console.log(value)
    };

    const classes = useStyles();

    return (
        <div>
            <SectionNavbar
                title={`Reconciliation report`}
                leftIcon={
                    <div onClick={setView.bind(this , 5)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={
                    <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                        <MoreVertIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsShowDrawer(false)}
                onKeyDown={() => setIsShowDrawer(false)}
            >
                <BottomDrawer isShow={isShowDrawer}>
                    <ListItem button key={11}>
                        <ListItemIcon><ShareIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Share" />
                    </ListItem>
                    <ListItem button key={12}>
                        <ListItemIcon><CloudUploadIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Upload" />
                    </ListItem>
                    <ListItem button key={13}>
                        <ListItemIcon><FileCopyIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Copy" />
                    </ListItem>
                    <ListItem button key={14}>
                        <ListItemIcon><PrintIcon style={{color: '#707070'}} /></ListItemIcon>
                        <ListItemText primary="Print this page" />
                    </ListItem>
                </BottomDrawer>
            </div>

            <Grid container spacing={1} className={`mx-auto mt-6 shadow1 mb-3 pb-2 pt-2`} >
                <Grid item xs={5}>
                    {
                        variant === "day" ?
                            <Dates
                                style={{
                                    padding: '3px 0px',
                                    marginLeft: '5px',
                                    border: '1px solid #e5e5e5',
                                    backgroundColor: '#FFFFFF',
                                    float: 'center',
                                    fontWeight: '400',
                                    fontSize: '18px' ,
                                    lineHeight: '1.6' ,
                                    marginTop: '2px'
                                }}
                                initialDate={startDay}
                                getValue={setStartDate.bind(this)}
                            />
                            :
                            ""
                    }
                </Grid>

                <Grid item xs={1}>
                    <p  className='text-dark text-center font-weight-bold' style={{marginTop: '10px'}}>to</p>
                </Grid>

                <Grid item xs={5}>
                    {
                        variant === "day" ?
                            <Dates
                                style={{
                                    padding: '3px 0px',
                                    marginLeft: '5px',
                                    border: '1px solid #e5e5e5',
                                    backgroundColor: '#FFFFFF',
                                    float: 'center',
                                    fontWeight: '400',
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    marginTop: '2px'
                                }}
                                initialDate={endDay}
                                getValue={setEndDate.bind(this)}
                            />
                            :
                            ""
                    }
                </Grid>
            </Grid>

            <Box className={`shadow1 mb-3 borderRadius10 mx-2`}>
                <Grid container spacing={1}>
                    <Typography component="p" style={{ width: '100%', margin: '20px auto 5px', fontSize: '18px', fontStyle: 'italic', fontWeight: '300' }} >
                        Total sales made this period was:
                    </Typography>
                    <Typography componenet="p" className='text-dark font-weight-bold w-100 mb-3' style={{ fontSize: '25px' }} >
                        GHC 1000
                    </Typography>
                </Grid>

                <Typography className='text-dark font-weight-bold' style={{ fontSize: '16px', marginBottom: '10px', color: '#707070'}} >
                    Minus
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Switch label='include' style={{fontSize: '10px'}} />
                            <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                                Total credit
                            </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                                GHC 300
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Switch label='include' style={{fontSize: '10px'}} />
                            <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                                Expenses
                            </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                                GHC 400
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Switch label='include' style={{fontSize: '10px'}} />
                            <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                                Purchases
                            </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                                GHC 300
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>

            <Box style={{marginTop: '10px'}} >
                <Grid container spacing={1}>
                    <Grid item xs={6} className={`shadow1 mb-3 borderRadius10`} style={{display: 'table', height: '90px', margin: '15px 0px'}} >
                        <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '13px' }} >
                                Balance
                            </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                                GHC {props.balance}
                            </Typography>
                    </Grid>

                    <Grid item xs={6} className={`shadow1 mb-3 borderRadius10`} style={{display: 'table', height: '90px', margin: '15px 0px'}} >
                        <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '13px' }} >
                                Cash you have is
                            </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                                GHC {props.cash}
                            </Typography>
                    </Grid>
                </Grid>
            </Box>



            { props.cash - props.balance  > "0" ?
                <CardDefault styles={{width: '90%', marginTop: '5px', backgroundColor: '#9ffca7', borderRadius: '25px'}}>
                    <Typography
                        className='text-dark font-weight-bold'
                        style={{fontSize: '18px', padding: '0px', color: 'black'}}
                    >
                        Result: Your cash is GHC {props.cash - props.balance} more

                    </Typography>
                </CardDefault>
                : props.cash - props.balance  < "0" ?
                    <CardDefault styles={{width: '90%', marginTop: '5px', backgroundColor: '#fc7c66', borderRadius: '25px'}}>
                        <Typography
                            className='text-dark font-weight-bold'
                            style={{fontSize: '18px', padding: '0px', color: 'black'}}
                        >
                            Result: Your cash is GHC {props.balance - props.cash} less

                        </Typography>
                    </CardDefault>
                :
                <CardDefault styles={{width: '90%', marginTop: '5px', backgroundColor: '#5ecbf7', borderRadius: '25px'}}>
                    <Typography
                        className='text-dark font-weight-bold'
                        style={{fontSize: '18px', padding: '0px', color: 'black'}}
                    >
                        Result: It is balanced

                    </Typography>
                </CardDefault>
            }

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={changeView.bind(this)}
                >
                    View details
                </Button>
            </Box>

        </div>
    )

}

export default ReconciliationReport;
