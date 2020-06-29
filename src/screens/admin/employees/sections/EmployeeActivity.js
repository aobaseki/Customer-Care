import React, {useState} from 'react';
import {withRouter} from "react-router";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShareIcon from '@material-ui/icons/Share';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import SingleActivity from '../singlePages/SingleActivity';
import BottomDrawer from "../../../../components/Drawer/BottomDrawer/BottomDrawer";
import SystemDate from '../../../../components/Date/SystemDate';

const values = [
    {
      value: '10',
      label: 'Pearl',
    },
    {
      value: '20',
      label: 'Chris',
    }
  ];

const EmployeeActivity = props => {

    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [type, setType] = useState(10);

    const handleTypeChange = event => {
        setType(event.target.value);
    };

    const backHandler = (event) => {
        props.setView(4);
    };

    return (
        <div>
            <SectionNavbars
                title="Activities"
                leftIcon={
                    <div onClick={backHandler.bind(this)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={
                    <div onClick={() => setIsShowDrawer(true)}>
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

            <Paper style={{marginTop: '60px', marginBottom: '20px'}} >
                <Grid container spacing={2} className={`pt-2`}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-select-receive-native"
                            select
                            size="small"
                            value={type}
                            style={{width: '90%'}}
                            onChange={handleTypeChange}
                            color="#DAAB59"
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            >
                            {values.map(option => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <SystemDate />
                    </Grid>
                    
                </Grid>
            </Paper>

            {props.employeeActivities.map((item) => <SingleActivity  key={item.id} activity={item}/>)}

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '10px 50px', textTransform: 'none', fontSize: '15px'}}
                    onClick={backHandler.bind(this)}
                >
                    Back
                </Button>
            </Box>

        </div>
    )

}

export default withRouter(EmployeeActivity);