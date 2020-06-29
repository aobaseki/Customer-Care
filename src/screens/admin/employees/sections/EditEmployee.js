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
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '90%',
        marginLeft: '12px',
        marginTop: '15px'
      },
    select: {
        width: '100%',
        display: 'flex',
        padding: '2px 0px',
        alignItems: 'center',
        borderRadius: '2px',
        height: '35px',
        border: '0.5px solid #333333',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
}));

const values = [
    {
      value: '10',
      label: 'Attendant',
    },
    {
      value: '20',
      label: 'Supervisor',
    },
    {
      value: '30',
      label: 'Admin',
    },
    {
      value: '40',
      label: 'Family member',
    },
    {
        value: '50',
        label: 'Co-owner',
      }
  ];

  const prev = [
    {
      value: '0',
      label: 'Admin',
    },
    {
      value: '1',
      label: 'Attendant',
    }
  ];

const EditEmployee = props => {

    const classes = useStyles();
    // const [value , setValue] = useState('');
    const [type, setType] = useState(10);
    const [permission, setPermission] = useState(0);

    // const setValueHandler = (event) => {
    //     setValue(event.target.value);
    // };

    const handleTypeChange = event => {
        setType(event.target.value);
    };

    const handlePermissionChange = event => {
        setPermission(event.target.value);
    };

    const backHandler = (event) => {
        props.setView(1);
    };

    // const setView = (step) => {
    //     props.setView(step);
    // };

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
                    <Grid item xs={11} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >
                            Edit employee information
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
           
            <Paper variant="outlined" className={classes.paper}>
                <Grid container spacing={2} style={{marginTop: '10px', }} className={`pt-2 mx-auto mt-7`}>
                    <Grid item xs={12}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'center',}} >
                            Personal information
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2}  className={`pt-2 mx-auto mt-7`} style={{marginBottom: '10px'}}>
                    <Grid item xs={4} style={{marginTop: '10px'}}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'left'}} >
                            Full name
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            style={{textAlign: 'left', width: '90%'}}
                            id="input-with-icon-textfield"
                            size='small'
                            variant="outlined"
                            type='text'
                            name="empName"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}  className={`pt-2 mx-auto mt-7`} style={{marginBottom: '10px'}}>
                    <Grid item xs={4} style={{marginTop: '10px'}}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'left'}} >
                            Phone number
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            style={{textAlign: 'left', width: '90%'}}
                            id="input-with-icon-textfield"
                            size='small'
                            variant="outlined"
                            type='number'
                            name="contact"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}  className={`pt-2 mx-auto mt-7`} style={{marginBottom: '10px'}}>
                    <Grid item xs={4} style={{marginTop: '10px'}}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'left'}} >
                            Employee type
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
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
                </Grid>

                <Grid container spacing={2}  className={`pt-2 mx-auto mt-7`} style={{marginBottom: '10px'}}>
                    <Grid item xs={4} style={{marginTop: '10px'}}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'left'}} >
                            Permissions
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            id="outlined-select-receive-native"
                            select
                            size="small"
                            value={permission}
                            style={{width: '90%'}}
                            onChange={handlePermissionChange}
                            color="#DAAB59"
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            >
                            {prev.map(option => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>

            </Paper>

            <Paper variant="outlined" className={classes.paper} style={{marginBottom: '70px'}} >
                <Grid container spacing={2} style={{marginTop: '10px', }} className={`pt-2 mx-auto mt-7`}>
                    <Grid item xs={12}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'center',}} >
                            Account information
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2}  className={`pt-2 mx-auto mt-7`} style={{marginBottom: '10px'}}>
                    <Grid item xs={4} style={{marginTop: '10px'}}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'left'}} >
                            Username
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            style={{textAlign: 'left', width: '90%'}}
                            id="input-with-icon-textfield"
                            size='small'
                            variant="outlined"
                            type='text'
                            name="username"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}  className={`pt-2 mx-auto mt-7`} style={{marginBottom: '10px'}}>
                    <Grid item xs={4} style={{marginTop: '10px'}}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'left'}} >
                            Password
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            style={{textAlign: 'left', width: '90%'}}
                            id="input-with-icon-textfield"
                            size='small'
                            variant="outlined"
                            type='password'
                            name="password"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}  className={`pt-2 mx-auto mt-7`} style={{marginBottom: '10px'}}>
                    <Grid item xs={4}>
                        <Typography className='font-weight-light mt-1' style={{ fontSize: '14px', textAlign: 'left'}} >
                            Retype password
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            style={{textAlign: 'left', width: '90%'}}
                            id="input-with-icon-textfield"
                            size='small'
                            variant="outlined"
                            type='password'
                            name="retPass"
                        />
                    </Grid>
                </Grid>

            </Paper>



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
                    Save
                </Button>
            </Box>


        </div>
    )

}

export default withRouter(EditEmployee);