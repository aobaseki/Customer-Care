import React, {useState} from 'react';
import {withRouter} from "react-router";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import SearchInput from "../../../Components/Input/SearchInput";
import EmployeeImage from '../../../../assets/img/employee.png';

const EmployeesList = props => {

    const { history } = props;
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchEmployee(value);
    };

    const setView = (step) => {
        props.setView(step);
    };

    return (
        <div>
            <SectionNavbars
                title="Employees"
                leftIcon={
                    <div onClick={() => history.goBack()}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div style={{ position: "fixed", top:"50px", width:"100%" , zIndex: '1000' }}>
                <Paper >
                    <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                        <Grid item xs={11} style={{padding: '10px 8px 15px 8px'}} className={`mx-auto mt-7`}>
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
                </Paper>
            </div>

            <Box component="div" m={2} style={{marginTop: '180px'}}>
                <img className="img100" src={EmployeeImage} alt={'test'}/>
            </Box>

            <Typography className='font-weight-light mt-1' style={{ fontSize: '18px', margin: '15px 0px' }} >
                Seems you have no employees
            </Typography>

            <Typography className='font-weight-light mt-1' style={{ fontSize: '18px', margin: '15px 0px' }} >
                Click below to add an employee
            </Typography>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '10px 50px', textTransform: 'none', fontSize: '15px'}}
                    onClick={() => setView(3)} 
                >
                    <AddCircleOutlineIcon />  Add new employee
                </Button>
            </Box>


        </div>
    )

}

export default withRouter(EmployeesList);