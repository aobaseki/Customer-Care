import React, {useState} from 'react';
import {withRouter} from "react-router";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import EditIcon from '@material-ui/icons/Edit';
import Box from "@material-ui/core/Box/Box";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import BoxDefault from "../../../../components/Box/BoxDefault";
import CardGridComponent from "../singlePages/CardComponent.js";
import BottomMenu from '../singlePages/BottomMenu';


const values = [
    {
      value: '10',
      label: 'Today',
    },
    {
      value: '20',
      label: 'Yesterday',
    }
  ];

const EmployeeDetails = props => {

    const employee = props.currentEmployee;
    const [type, setType] = useState(10);

    const handleTypeChange = event => {
        setType(event.target.value);
    };

    const backHandler = (event) => {
        props.setView(1);
    };

    const setView = (step) => {
        props.setView(step);
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
                <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2 mx-auto mt-7`}>
                    <Grid item xs={3}>
                        <Avatar
                            alt={employee.name}
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                margin: '5px auto',
                                textAlign: 'center',
                                color: '#FFFFFF',
                                backgroundColor: '#DAAB59'
                            }}
                        >
                            {(employee.name).charAt(0).toUpperCase()}
                        </Avatar>
                    </Grid>

                    <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' >{employee.name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}> {employee.position}</div>
                        </div>
                    </Grid>

                    <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '12px' }}  >
                        <EditIcon style={{fontSize: '30px', color: '#DAAB59'}} onClick={() => setView(5)} />
                            <br/>
                        Edit
                    </Grid>
                </Grid>
            </Paper>

            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className="boxDefault px-4"
                styles={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Grid container spacing={2}  className={`pt-2 mx-auto mt-7`} style={{marginBottom: '10px'}}>
                    <Grid item xs={3}></Grid>
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
                    <Grid item xs={3}></Grid>
                </Grid>

                <Grid container spacing={1}>
                    <CardGridComponent
                        title="Items sold"
                        amount={employee.items}
                    />
                    
                    <CardGridComponent
                        title="Sales made"
                        amount={employee.sales}
                    />
                    
                    <CardGridComponent
                        title="Previous collection"
                        amount={employee.prev}
                        styles={{marginBottom: '50px'}}
                    />
                    
                    <CardGridComponent
                        title="Purchases bought"
                        amount={employee.purchases}
                    />
            
                </Grid>

            </BoxDefault>

            <Paper variant="outlined" style={{marginBottom: '30px', textAlign: 'center', width: '90%',marginLeft: '15px'}}>
                <Grid container spacing={1} >
                    <Grid item xs={9} >
                        <Typography  style={{ fontSize: '20px', margin: '30px', textAlign: 'left' }} >
                            Permission: Admin
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '12px' }}  >
                        <EditIcon style={{fontSize: '30px', color: '#DAAB59'}} onClick={() => setView(7)} />
                            <br/>
                        Change
                    </Grid>

                </Grid>
            </Paper>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <BottomMenu setView={props.setView}/>
            </Box>
        

        </div>
    )

}

export default withRouter(EmployeeDetails);