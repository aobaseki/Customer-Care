import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box/Box";
import {withRouter} from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import SinglePermission from '../singlePages/SingleAllPermission';

const EmployeePermission = props => {

    const backHandler = (event) => {
        props.setView(4);
    };

    return (
        <div>
            <SectionNavbars
                title="Permissions"
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
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '17px'}} >
                            Permissions available for employees
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Box style={{paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>

                {props.employeePermission.map((item) => <SinglePermission  key={item.id} permission={item}/>)}
  
            </Box>
        </div>
    )

}

export default withRouter(EmployeePermission);