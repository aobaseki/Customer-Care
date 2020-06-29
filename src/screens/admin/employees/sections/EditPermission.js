import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '../../../../components/Switch/Switch';
import {withRouter} from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import SearchInput from "../../../Components/Input/SearchInput";


const EditPermission = props => {

    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchEmployee(value);
    };

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
                            Customize employee permission
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

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

            <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                    View profit
                </Grid>

                <Grid item xs={2}  style={{paddingTop: "9px"}}>
                    <Switch style={{fontSize: '10px'}} />
                </Grid>

            </Grid>

            <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                    Delete sales
                </Grid>

                <Grid item xs={2}  style={{paddingTop: "9px"}}>
                    <Switch style={{fontSize: '10px'}} />
                </Grid>

            </Grid>

            <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                    Delete purchases
                </Grid>

                <Grid item xs={2}  style={{paddingTop: "9px"}}>
                    <Switch style={{fontSize: '10px'}} />
                </Grid>

            </Grid>

            <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                    Add stock
                </Grid>

                <Grid item xs={2}  style={{paddingTop: "9px"}}>
                    <Switch style={{fontSize: '10px'}} />
                </Grid>

            </Grid>

            <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                    View dashboard
                </Grid>

                <Grid item xs={2}  style={{paddingTop: "9px"}}>
                    <Switch style={{fontSize: '10px'}} />
                </Grid>

            </Grid>

            <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                    Approved sales can be edited
                </Grid>

                <Grid item xs={2}  style={{paddingTop: "9px"}}>
                    <Switch style={{fontSize: '10px'}} />
                </Grid>

            </Grid>

            <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                    View only fridge
                </Grid>

                <Grid item xs={2}  style={{paddingTop: "9px"}}>
                    <Switch style={{fontSize: '10px'}} />
                </Grid>

            </Grid>

            <Grid container style={{padding: "10px 0px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                    Audit
                </Grid>

                <Grid item xs={2}  style={{paddingTop: "9px"}}>
                    <Switch style={{fontSize: '10px'}} />
                </Grid>

            </Grid>

        </div>
    )

}

export default withRouter(EditPermission);