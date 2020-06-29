import React, {useState} from 'react';
import SectionNavbar from '../../../../components/Sections/SectionNavbars';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ShareIcon from '@material-ui/icons/Share';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import DateToggle from "../../../../components/DateToggle/DateToggle";
import ReconciliationSection from '../../../../components/Sections/ReconciliationSection';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import SingleDetail from './singleViews/SingleDetail';

const ReconciliationDetails = props => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const reconciliations = props.reconciliations;

    const handleDateChange = date => {
        setSelectedDate(date);
      };

    const setView = (view) => {
        props.setView(view);
    };

    return (
        <div>
            <SectionNavbar
                title={`Reconciliation report`}
                leftIcon={
                    <div onClick={setView.bind(this , 6)}>
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

            <div style={{ marginTop: '70px' }} >
                <DateToggle setView={setView.bind(this)}  />
            </div>

            <Grid container spacing={1}>
                <Grid item xs={6} ></Grid>

                <Grid item xs={6} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker"
                            className='text-dark font-weight-bold'
                            style={{float: 'right', width: '150px',  border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', fontWeight: '400', marginRight: '5px' , lineHeight: '1.6'}}
                            size='small'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
           
            <ReconciliationSection sales='1000' credit='700' />

            {reconciliations.length === 0
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
                                No details available
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                :

                reconciliations.map((item) => <SingleDetail key={item.id} reconciliation={item} />)
            }


        </div>
    )

}

export default ReconciliationDetails;