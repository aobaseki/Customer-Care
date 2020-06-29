import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {withRouter} from "react-router";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import SearchInput from "../../../Components/Input/SearchInput";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
    },
    textBox: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '40px',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));

const LinkEmployees = props => {

    const classes = useStyles();
    const [searchValue , setSearchValue] = useState({
        search: ''
    });
    const [value , setValue] = useState('');

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchEmployee(value);
    };

    const setValueHandler = (event) => {
        setValue(event.target.value);
    };

    const backHandler = (event) => {
        props.setView(1);
    };

    return (
        <div>
            <SectionNavbars
                title="Employees"
                leftIcon={
                    <div onClick={backHandler.bind(this)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            
                <Paper style={{marginTop: '60px'}} >
                    <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                        <Grid item xs={11} style={{padding: '25px'}} className={`mx-auto mt-7`}>
                            
                        </Grid>
                    </Grid>
                </Paper>
           


            <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginTop: '25px' }} >
                Enter employee's username or phone number
            </Typography>

            <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                <Grid item xs={11} style={{padding: '0px 8px 15px 8px'}} className={`mx-auto mt-7`}>
                    <SearchInput
                        inputName="search"
                        styles={{
                            border: '1px solid #e5e5e5',
                            padding: '4px 0px'
                        }}
                        getValue={setInputValue.bind(this)}
                    />
                </Grid>
            </Grid>

            <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginTop: '25px' }} >
                OR
            </Typography>

            <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginTop: '25px' }} >
                Enter link from employee
            </Typography>

            <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                <Grid item xs={11} style={{padding: '0px 8px 15px 8px'}} className={`mx-auto mt-7`}>
                    <Paper className={classes.textBox} style={{border: '1px solid #e5e5e5', padding: '4px 0px'}}>
                        <TextField
                            className={`${classes.input} search-box`}
                            value={value}
                            name='link'
                            onChange={(event) => setValueHandler(event)}
                        />
                    </Paper>
                </Grid>
            </Grid>

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
                    Finish
                </Button>
            </Box>


        </div>
    )

}

export default withRouter(LinkEmployees);