import React from 'react';
import Grid from '@material-ui/core/Grid';
import Switch from '../../../../components/Switch/Switch';
import CheckBox from '../../../../components/CheckBox/CheckBox';


const SinglePermission = props => {

    const permission = props.permission;

    return ( 
        <div>
            <Grid container  className={`shadow1 mb-3 borderRadius10`} >
                <Grid container style={{paddingTop: "7px", borderBottom: "1px solid #d8d2d2", marginLeft: '10px'}}>

                    <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                        {permission.name}
                    </Grid>

                    <Grid item xs={2}  style={{paddingTop: "9px"}}>
                        <Switch style={{fontSize: '10px'}} />
                    </Grid>

                </Grid>

                <Grid container  style={{textAlign: 'left', marginLeft: '5px'}}  >
                    <Grid item xs={4} >
                        <CheckBox label='read sales'/>
                        <CheckBox label='create sales' />
                    </Grid>
                    <Grid item xs={4}>
                        <CheckBox label='delete sales' />
                        <CheckBox label='read sales' />
                    </Grid>
                    <Grid item xs={4}>
                        <CheckBox label='update sales' />
                        <CheckBox label='create prod' />
                    </Grid>
                </Grid>
            </Grid>
           
        </div>
    )
}

export default SinglePermission;