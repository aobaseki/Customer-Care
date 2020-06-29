import React, {useState} from "react";
import {Link , withRouter } from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import paths from "../../../utilities/paths";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
    },
    gridSpace: {
        padding: theme.spacing(1),
        textAlign: 'left',
        display: 'block',
        margin: 'auto'
    }
}));

const ProductRequest = props => {

    const { history } = props;
    const classes = useStyles();
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    const togglePersonsHandler = () => {
        const doesShow = isDrawerShow;
        setIsDrawerShow( !doesShow);
      }

    return (
        <div>
            <SectionNavbars
                title="Product Request"
                leftIcon={
                    <div onClick={() => history.goBack()}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Paper style={{marginTop: '60px', marginBottom: '10px'}} >
                <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                        <Typography  style={{ fontSize: '17px'}} >
                            Enter product details to add product
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={1} className={`p-3 mb-0 mx-1`}>
                <Grid
                    item xs={12}
                    className={`text-right`}
                >
                    <div className={`video_canvas`}>
                        <video
                            id="video"
                            width="235"
                            height="150"
                            muted={true}
                            style={{backgroundColor: '#ffffff'}}
                        >
                        </video>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.gridSpace}>
                <label className={`text-dark font-weight-bold`} style={{fontSize: '16px', marginTop: '10px', display: 'block'}}>Product name</label>

                <TextField
                    id="outlined-basic"
                    name="amount"
                    variant="outlined"
                    size="small"
                    // onChange={(event) => setValueHandler(event)}
                    type='text'
                    style={{margin: '10px 0px 10px 0px', width: '230px'}}
                />
            </Grid>

            <Grid container spacing={1} className={classes.gridSpace}>
                <label className={`text-dark font-weight-bold`} style={{fontSize: '16px', marginTop: '10px', display: 'block'}}>Product weight</label>

                <TextField
                    id="outlined-basic"
                    name="amount"
                    variant="outlined"
                    size="small"
                    // onChange={(event) => setValueHandler(event)}
                    type='number'
                    style={{margin: '10px 0px 10px 0px', width: '230px'}}
                />
            </Grid>   

            <div style={{ marginBottom: '80px'}}>
            <Link onClick={togglePersonsHandler} style={{textDecorationColor: '#333333'}}>
                <span  style={{'marginTop': '30px', marginBottom: '20px', color: '#403C3C', fontSize: '17px', fontStyle: 'italic'}}>Add product's price</span> <br/>
            </Link>  
            </div>     

            {isDrawerShow === true
                ?
                <div>
                    <Grid container spacing={1} className={classes.gridSpace}>
                        <label className={`text-dark font-weight-bold`} style={{fontSize: '16px', marginTop: '10px', display: 'block'}}>Quantity</label>

                        <TextField
                            id="outlined-basic"
                            name="amount"
                            variant="outlined"
                            size="small"
                            // onChange={(event) => setValueHandler(event)}
                            type='number'
                            style={{margin: '10px 0px 10px 0px', width: '230px'}}
                        />
                    </Grid>

                    <Grid container spacing={1} className={classes.gridSpace}>
                        <label className={`text-dark font-weight-bold`} style={{fontSize: '16px', marginTop: '10px', display: 'block'}}>Cost price</label>

                        <TextField
                            id="outlined-basic"
                            name="amount"
                            variant="outlined"
                            size="small"
                            // onChange={(event) => setValueHandler(event)}
                            type='number'
                            style={{margin: '10px 0px 10px 0px', width: '230px'}}
                        />
                    </Grid>

                    <Grid container spacing={1} className={classes.gridSpace}>
                        <label className={`text-dark font-weight-bold`} style={{fontSize: '16px', marginTop: '10px', display: 'block'}}>Selling price</label>

                        <TextField
                            id="outlined-basic"
                            name="amount"
                            variant="outlined"
                            size="small"
                            // onChange={(event) => setValueHandler(event)}
                            type='number'
                            style={{margin: '10px 0px 70px 0px', width: '230px'}}
                        />
                    </Grid>
                </div>
                :
                ''
            }

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', textTransform: 'none', fontSize:'17px', float: 'right', marginRight: '5px'}}
                            onClick={() => history.push(paths.admin)}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px', float: 'left', marginLeft: '5px'}}
                            //onClick={openAddDialog.bind(this)}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
}

export default withRouter(ProductRequest);