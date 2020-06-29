import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import './Admin.scss';
import Styles from './Admin.module.scss';
import Grid from '@material-ui/core/Grid';
import paths from "../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../components/Sections/SectionNavbars";
import Drawer from "../../components/Drawer/Drawer";
import MenuIcon from '@material-ui/icons/Menu';
import LocalInfo from "../../services/LocalInfo";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    shadow1: {
        '-webkit-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        '-moz-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        'box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
    },
    shadow2: {
        'box-shadow': '0 0 1rem 2px #dcc7a4',
    },
    margin1: {
        margin: '20px auto',
    },
    padding1: {
        'padding-bottom': '20px',
    },
    boxRadius: {
        'border-radius': '10px',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const Admin = props => {
    const { history } = props;
    const classes = useStyles();
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [openShop, setOpenShop] = React.useState(false);
    const [openStock, setOpenStock] = React.useState(false);
    const [openEmp, setOpenEmp] = React.useState(false);

    const handleClickShop = () => {
        setOpenShop(!openShop);
    };

    const handleClickStock = () => {
        setOpenStock(!openStock);
    };

    const handleClickEmp= () => {
        setOpenEmp(!openEmp);
    };

    return (
        <div style={{height: '100vh'}}>
            <Component
                initialState={{
                    isDrawerShow: false,
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />


                        <SectionNavbars
                            title="Admin"
                            leftIcon={
                                <div onClick={() => setIsDrawerShow(true)}>
                                    <MenuIcon
                                        style={{fontSize: '2rem'}}
                                    />
                                </div>
                            }
                            rightIcon={
                                <div onClick={() => history.push(paths.dashboard)}>
                                    <AppsIcon
                                        style={{fontSize: '2rem'}}
                                    />
                                </div>
                            }
                        />

                        <div
                            onClick={() => setIsDrawerShow(false)}
                            onKeyDown={() => setIsDrawerShow(false)}
                        >
                            <Drawer isShow={isDrawerShow} />
                        </div>

                        <div style={{ position: "fixed", top:"80px", width:"100%" }}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3} sm>
                                        <Avatar
                                            alt={LocalInfo.userFullName}
                                            className={classes.primaryColor}
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "50%",
                                                margin: '5px auto',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {(LocalInfo.userFullName).charAt(0).toUpperCase()}
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={7} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    { LocalInfo.userFullName }
                                                </Typography>
                                                <Typography  style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    { LocalInfo.company.name }
                                                </Typography>
                                                <Typography style={{fontSize: "0.8rem"}}>
                                                    { LocalInfo.companyRole }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className={Styles.block} item xs={2} sm>
                                        <div className={Styles.centered}>
                                        <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.account_info)}/>
                                        </div>
                                    </Grid>
                                </Grid>

                            </Paper>
                            <Grid container spacing={2}>
                                
                                <Grid item xs={10} sm style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "0px"}} >
                                    <Grid item xs  direction="column"  style={{textAlign: "left" , marginLeft: "5%" , marginTop: "15px" , paddingBottom: "0px"}}>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                            Shop Information
                                        </Typography>                                      
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                                    <div className={Styles.centered}>
                                        {/* <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.expense)}/> */}
                                        {openShop ? <ExpandLess onClick={handleClickShop} style={{marginTop: '10px'}} /> : <ExpandMore onClick={handleClickShop} style={{marginTop: '10px'}} />}
                                    </div>
                                </Grid>

                                <Collapse in={openShop} timeout="auto" unmountOnExit style={{width: '100%'}}>
                                    <Grid container style={{paddingTop: "7px"}}>
                                        <Grid item xs={2} sm />

                                        <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                                <Grid item xs>
                                                    <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                        Add shop
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                            <div className={Styles.centered}>
                                                <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.add_branch)}/>
                                            </div>
                                        </Grid>

                                    </Grid>

                                    <Grid container style={{paddingTop: "7px"}}>
                                        <Grid item xs={2} sm>

                                        </Grid>
                                        <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                                <Grid item xs>
                                                    <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                        Add warehouse
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                            <div className={Styles.centered}>
                                                <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.add_warehouse)}/>

                                            </div>
                                        </Grid>

                                    </Grid>

                                    <Grid container style={{paddingTop: "7px"}}>
                                        <Grid item xs={2} sm>

                                        </Grid>
                                        <Grid item xs={8} sm container>
                                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                                <Grid item xs>
                                                    <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                    Change store information
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} sm>
                                            <div className={Styles.centered}>
                                                <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.change_store_info)}/>

                                            </div>
                                        </Grid>
                                    </Grid>
                                </Collapse>     

                                <Grid item xs={10} sm style={{borderBottom: "1px solid #d8d2d2" , borderTop: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                                    <Grid item xs container direction="column" style={{textAlign: "left", marginLeft: "5%" , marginTop: "6px" , paddingBottom: "0px"}}>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                            Stock
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2" , borderTop: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                                    <div className={Styles.centered}>
                                        {/* <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.expense)}/> */}
                                        {openStock ? <ExpandLess onClick={handleClickStock}  /> : <ExpandMore onClick={handleClickStock}  />}
                                    </div>
                                </Grid>

                                <Collapse in={openStock} timeout="auto" unmountOnExit style={{width: '100%'}}>
                                    <Grid container style={{paddingTop: "7px"}}>
                                        <Grid item xs={2} sm>

                                        </Grid>
                                        <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                                <Grid item xs>
                                                    <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                        Change prices
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                            <div className={Styles.centered}>
                                                <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.change_price)}/>

                                            </div>
                                        </Grid>

                                    </Grid>

                                    <Grid container style={{paddingTop: "7px"}}>
                                        <Grid item xs={2} sm>

                                        </Grid>
                                        <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                                <Grid item xs>
                                                    <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                        Request for new products
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                            <div className={Styles.centered}>
                                                <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.product_request)}/>

                                            </div>
                                        </Grid>

                                    </Grid>

                                    <Grid container style={{paddingTop: "7px"}}>
                                        <Grid item xs={2} sm>

                                        </Grid>
                                        <Grid item xs={8} sm container>
                                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                                <Grid item xs>
                                                    <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                        Generate barcode
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} sm>
                                            <div className={Styles.centered}>
                                                <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}}
                                                // onClick={() => history.push(paths.generate_barcode)}
                                                />
                                            </div>
                                        </Grid>

                                    </Grid>
                                </Collapse>


                                <Grid item xs={10} sm style={{borderBottom: "1px solid #d8d2d2" , borderTop: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                                    <Grid item xs container direction="column" style={{textAlign: "left", marginLeft: "5%" , marginTop: "6px" , paddingBottom: "0px"}}>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                            Employees
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2" , borderTop: "1px solid #d8d2d2" , paddingBottom: "0px"}}>
                                    <div className={Styles.centered}>
                                        {/* <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.expense)}/> */}
                                        {openEmp ? <ExpandLess onClick={handleClickEmp}  /> : <ExpandMore onClick={handleClickEmp}  />}
                                    </div>
                                </Grid>

                                <Collapse in={openEmp} timeout="auto" unmountOnExit style={{width: '100%'}}>
                                    <Grid container style={{paddingTop: "7px"}}>
                                        <Grid item xs={2} sm />
                                       
                                        <Grid item xs={8} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                                <Grid item xs>
                                                    <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                        Manage employees
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                            <div className={Styles.centered}>
                                                <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.employees)}/>
                                            </div>
                                        </Grid>

                                    </Grid>
                                    <Grid container style={{paddingTop: "7px"}}>
                                        <Grid item xs={2} sm>

                                        </Grid>
                                        <Grid item xs={8} sm container>
                                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                                <Grid item xs>
                                                    <Typography className="menu-item" style={{fontSize: "0.9rem" , fontWeight: "500"}}>
                                                        Employees permission
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2} sm>
                                            <div className={Styles.centered}>
                                                <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.employees)}/>

                                            </div>
                                        </Grid>

                                    </Grid>
                                </Collapse>


                                <Grid container style={{borderTop: "1px solid #d8d2d2" ,paddingTop: "8px" ,paddingBottom: "3px"}}>

                                    <Grid item xs={10} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "8%"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Edit expense list
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.expense)}/>

                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid container style={{borderTop: "1px solid #d8d2d2" ,paddingTop: "8px" ,paddingBottom: "3px"}} onClick={() => history.push(paths.suppliers)}>

                                    <Grid item xs={10} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "8%"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Suppliers
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.suppliers)}/>

                                        </div>
                                    </Grid>

                                </Grid>


                                <Grid container style={{borderTop: "1px solid #d8d2d2" ,paddingTop: "8px" ,paddingBottom: "3px"}}>

                                    <Grid item xs={10} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "8%"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Customers
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.admin_customers)}/>

                                        </div>
                                    </Grid>

                                </Grid>

                                <Grid container style={{borderTop: "1px solid #d8d2d2" ,paddingTop: "8px" ,paddingBottom: "3px"}}>

                                    <Grid item xs={10} sm container>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "8%"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    User Log
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm>
                                        <div className={Styles.centered}>
                                            <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.register)}/>

                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(Admin);
