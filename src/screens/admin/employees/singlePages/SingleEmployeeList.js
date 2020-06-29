import React from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import BoxDefault from '../../../../components/Box/BoxDefault';
import Avatar from "@material-ui/core/Avatar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";


const SingleViewCustomer = props => {

    const employee = props.employee;

    const setView = (step) => {
        props.setView(step);
    };

    return(

        <div>

            <BoxDefault
            bgcolor="background.paper"
            p={1}
            className={'boxDefault'}
            >
                
                <Grid container spacing={1} >

                    <Grid item xs={3} onClick={() => setView(4)} >
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

                    <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}} onClick={() => setView(4)} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' >{employee.name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}> {employee.position}</div>
                        </div>
                    </Grid>

                    <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '10px' }} >
                        <EditIcon style={{fontSize: '30px', color: '#DAAB59'}} onClick={() => setView(5)} />
                            <br/>
                        Edit
                    </Grid>
                   
                    <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '10px' }} >     
                        <DeleteIcon style={{fontSize: '30px', color: '#DAAB59'}} />
                        <br/>
                        Delete
                    </Grid>
                    
                </Grid>
            </BoxDefault>

            
            
        </div>
        
    )

}
export default withRouter(SingleViewCustomer);