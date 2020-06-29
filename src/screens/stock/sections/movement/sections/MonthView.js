import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";
import StockMovementSection from '../../../../../components/Sections/StockMovementSection';
import SystemDateHandler from "../../../../../services/SystemDateHandler";

import SingleMonthView from './singleView/SingleMonthView';
import StockMovementService from "../../../../../services/StockMovementService";
import Typography from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }));

  const values = new SystemDateHandler().getStoreMonths();

  const MonthView = props => {

    const classes = useStyles();
    const [selectedMonth, setSelectedMonth] = React.useState(values[(new Date().getMonth())].value);
    const pageName = props.pageName;

    const [getDetails , setGetDetails] = useState(false);
    const [name , setName] = useState('');
    const [entries , setEntries] = useState([]);
    const [balance , setBalance] = useState(0);

    useEffect(() => {
      // You need to restrict it at some point
      // This is just dummy code and should be replaced by actual
      if (!getDetails) {
          let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

          if(activeHistoryIndex){
              setSelectedMonth(activeHistoryIndex)
              getMovementDetails(activeHistoryIndex);
              localStorage.removeItem("activeHistoryIndex")
          }else{
              getMovementDetails(selectedMonth);
          }
      }
    });

    const getMovementDetails = async (date) => {
      console.log(date);
      let response = [];

      if (pageName === true){
          const branchProduct = props.product[0];
          const newProduct = await branchProduct.product.fetch();
          setName(newProduct.name);

          response = await StockMovementService.getStockMovementListByProduct('month', date, branchProduct.productId);
      }else{
          response = await StockMovementService.getStockMovementListByDate('month', date);
      }

      const newBalance = response.closingBalance - response.openingBalance;

      if(newBalance > 0){
          setBalance(`+${newBalance}`)
      }else if(newBalance < 0){
          setBalance(`${newBalance}`)
      }else{
          setBalance(newBalance)
      }

      setGetDetails(response);
      setEntries(response.entries);
      console.log(response)
    };

    const handleChange = event => {
        setSelectedMonth(event.target.value);
        getMovementDetails(event.target.value)
    };

    const getChildrenDetails = (index) => {
      props.getChildrenView(index , 2)
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

            <StockMovementSection openingBalance={getDetails.openingBalance} purchase={getDetails.totalPurchased} sales={getDetails.totalSold} closingBalance={getDetails.closingBalance} difference={balance} />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {
                    entries.length === 0
                        ?
                        <div
                            className={`rounded mx-1 my-2 p-2 bordered`}
                            style={{
                                display: 'flex',
                                alignContents: 'center',
                                justifyContents: 'center'
                            }}
                        >
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
                                        No stock moved
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        entries.map((item , index) =>
                            <div key={index} onClick={getChildrenDetails.bind(this, item.index)}>
                                <SingleMonthView  key={index} monthItems={item}/>
                            </div>
                        )
                }
            </Box>


        </div>
    )

  }

  export default withRouter(MonthView);
