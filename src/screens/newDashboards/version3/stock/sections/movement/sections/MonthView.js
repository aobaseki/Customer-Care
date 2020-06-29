import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";
import StockMovementSection from '../../../../../../../components/Sections/StockMovementSection';
import SystemDateHandler from "../../../../../../../services/SystemDateHandler";

import SingleMonthView from './singleView/SingleMonthView';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

  const values = new SystemDateHandler().getStoreMonths();

  const MonthView = props => {
    
    const classes = useStyles();
    const [selectedMonth, setSelectedMonth] = React.useState(values[(new Date().getMonth())].value);

    const handleChange = event => {
        setSelectedMonth(event.target.value);
    };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>

                <Grid item xs={6}>
                    {/* <Typography style={{fontSize: '14px', paddingTop: '20px'}} >
                        {props.pageName}
                    </Typography> */}
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedMonth}
                        style={{width: '150px',  margin: '10px 0px', fontSize: '7px'}}
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
                {props.monthItem.map((item) => <SingleMonthView  key={item.week_id} monthItems={item}/>)}
            </Box>


        </div>
    )

  }

  export default withRouter(MonthView);