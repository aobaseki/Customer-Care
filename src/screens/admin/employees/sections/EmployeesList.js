import React, {useState} from 'react';
import {withRouter} from "react-router";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import SearchInput from "../../../Components/Input/SearchInput";
import SingleEmployeeList from '../singlePages/SingleEmployeeList';
import MainDialog from "../../../../components/Dialog/MainDialog";
import EmployeeImage from '../../../../assets/img/employee.png';

const EmployeesList = props => {

    const { history } = props;
    const branchEmployees = props.branchEmployees;
    const [searchValue , setSearchValue] = useState({
        search: ''
    });
    const [mainDialog, setMainDialog] = React.useState(false);

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchEmployee(value);
    };

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
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
          
            <Paper style={{marginTop: '60px'}}>
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
               
            {branchEmployees.length === 0
                ?
                <div>
                    <Box component="div" m={2} >
                        <img className="img100" src={EmployeeImage} alt={'test'}/>
                    </Box>

                    <Typography className='font-weight-light mt-1' style={{ fontSize: '18px', margin: '15px 0px' }} >
                        Seems you have no employees
                    </Typography>

                    <Typography className='font-weight-light mt-1' style={{ fontSize: '18px', margin: '15px 0px' }} >
                        Click below to add an employee
                    </Typography>
                </div>
                :
            
                branchEmployees.map((item) => <SingleEmployeeList  key={item.id} employee={item} setView={props.setView}/>)
            }

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Typography
                        style={{fontSize: '16px' , margin: '0px 0px', padding: '16px'}}
                        className={`text-center mb-2 mx-auto w-90 text-dark font-weight-bold`}
                    >
                        Does your employee have an account?
                    </Typography>

                    <Grid container style={{paddingBottom : "20px"}}>
                        <Grid item xs={6} style={{padding: "0px 10px"}}>
                            <Button
                                variant="outlined"
                                onClick={() => setView(3)} 
                                style={{
                                    width: '100%',
                                    'backgroundColor': '#ffff',
                                    borderRadius: '5px',
                                    color: '#DAAB59',
                                    border: '1px solid #DAAB59',
                                    padding: '5px 5px',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    marginTop: '8px',
                                    textTransform: 'none'
                                }}
                            >
                                No
                            </Button>
                        </Grid>
                        <Grid item xs={6} style={{padding: "0px 10px"}}>
                            <Button
                                variant="contained"
                                onClick={() => setView(2)} 
                                style={{
                                    width: '100%',
                                    'backgroundColor': '#DAAB59',
                                    borderRadius: '5px',
                                    color: '#ffff',
                                    border: '1px solid #DAAB59',
                                    padding: '5px 5px',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    marginTop: '8px',
                                    textTransform: 'none'
                                }}
                            >
                                Yes
                            </Button>

                        </Grid>
                    </Grid>
                </div>
            </MainDialog>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '10px 50px', textTransform: 'none', fontSize: '15px'}}
                    onClick={openDialogHandler.bind(this)}
                >
                    <AddCircleOutlineIcon />  Add new employee
                </Button>
            </Box>


        </div>
    )

}

export default withRouter(EmployeesList);