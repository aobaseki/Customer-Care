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
import TextField from '@material-ui/core/TextField';
import SingleDetail from './singleViews/SingleDetail';
import SystemDateHandler from "../../../../services/SystemDateHandler";



const values = new SystemDateHandler().getStoreYears()

const YearView = props => {
    const [selectedYear, setSelectedYear] = React.useState(values[0].value);
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const reconciliations = props.reconciliations;

    const handleChange = event => {
        setSelectedYear(event.target.value);
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

                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedYear}
                        style={{width: '150px',  margin: '10px 0px', fontSize: '5px'}}
                        onChange={handleChange}
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

export default YearView;