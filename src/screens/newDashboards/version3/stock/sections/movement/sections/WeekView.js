import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StockMovementSection from '../../../../../../../components/Sections/StockMovementSection';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import SystemDateHandler from "../../../../../../../services/SystemDateHandler";
import { withRouter } from "react-router-dom";

import SingleWeekView from './singleView/SingleWeekView';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

  const values = new SystemDateHandler().getStoreWeeks();

  const WeekView = props => {
    
    const classes = useStyles();
    const [selectedWeek, setSelectedWeek] = React.useState(values[0].value);

    const handleChange = event => {
        setSelectedWeek(event.target.value);
    };


    return(
        <div className={classes.root}>

            <Grid container spacing={1}>

                <Grid item xs={4}>
                    {/* <Typography style={{fontSize: '14px', paddingTop: '20px'}} >
                        {props.pageName}
                    </Typography> */}
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedWeek}
                        style={{width: '220px',  margin: '10px 0px', fontSize: '5px'}}
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

            <StockMovementSection openingBalance='4' purchase='0' sales='50' closingBalance='30' difference='20' />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.weekItem.map((item) => <SingleWeekView  key={item.day_id} weekItems={item}/>)}
            </Box>


        </div>
    )

  }

  export default withRouter(WeekView);