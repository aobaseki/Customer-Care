import React, {useEffect , useState} from "react";
import { withRouter } from "react-router-dom";
import './Dashboard.scss';

import paths from "../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import MenuIcon from '@material-ui/icons/Menu';

import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../components/Sections/SectionNavbars";
import BoxDefault from "../../components/Box/BoxDefault";
import CardDefault from "../../components/Cards/CardDefault";
import Drawer from "../../components/Drawer/Drawer";

import LocalInfo from '../../services/LocalInfo';
import CompanyService from "../../services/CompanyService";
import Box from "@material-ui/core/Box/Box";
import confirmImg from "../../assets/img/dashboard.png";

const Dashboard = props => {
    const [companySales , setCompanySales] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!companySales) {
            getCompanyDetails();
        }
    });

    const getCompanyDetails = async () => {
        const response = await new CompanyService().getSalesDetails('today');
        setCompanySales(response);
    };
    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history } = props;

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    return (
        <div style={{height: '100vh'}}>
            <React.Fragment>
                <CssBaseline />

                <SectionNavbars
                    title={`Welcome ${username}`}
                    leftIcon={
                        <div onClick={() => setIsDrawerShow(true)}>
                            <MenuIcon
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

                <Box component="div" m={2} style={{paddingTop: '0px' , marginTop: '40px' , marginBottom: '0px' , height: '190px'}}>
                    <img className={`img-responsive w-100`} src={confirmImg} alt={'test'}/>
                </Box>

                <BoxDefault
                    bgcolor="background.paper"
                    p={1}
                    className={'boxDefault'}
                    styles={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        paddingTop: '0px' , 
                        marginBottom: '0px' , 
                        height: '190px'
                    }}
                >
                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontWeight: '700', fontSize: '1.00rem'}}
                    >
                        Please select your preferred dashboard view
                    </Typography>

                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            marginBottom: '5px' ,
                        }}
                    >
                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginRight: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #daab59'
                            }}
                        >
                            
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '0.9rem', color: '#daab59'}}
                                onClick={() => history.push(paths.dashboard)}
                            >
                                View current dashboard
                            </Typography>
                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginLeft: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #daab59'
                            }}
                        >
                            
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '0.9rem', color: '#daab59'}}
                                onClick={() => history.push(paths.dashboardV1)}
                            >
                                View new dashboard version 1    
                            </Typography>
                        </CardDefault>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            marginBottom: '5px' ,
                        }}
                    >
                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginRight: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #daab59'
                            }}
                        >
                            
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '0.9rem', color: '#daab59'}}
                                onClick={() => history.push(paths.dashboardV2)}
                            >
                                View new dashboard version 2
                            </Typography>
                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginLeft: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #daab59'
                            }}
                        >
                            
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '0.9rem', color: '#daab59'}}
                                onClick={() => history.push(paths.newSell)}
                            >
                                View new dashboard version 3       
                            </Typography>
                        </CardDefault>
                    </div>

                </BoxDefault>

                {/* <Box
                    bgcolor="background.paper"
                    p={1}
                    className={`shadow1`}
                    style={{ height: '4.0rem', position: "fixed", bottom:"0", width:"100%" }}
                >
                    <Button
                        variant="contained"
                        style={{'width': '70%','backgroundColor': '#DAAB59' , color: '#403C3C', margin: '4px auto',padding: '5px 5px', fontSize: '17px', fontWeight: '700'}}
                        className={`${classes.button} capitalization`}
                        onClick={() => LocalInfo.branches.length > 1 ? history.push(paths.store_summary) : history.push(paths.sell)}
                    >
                        Start selling
                    </Button>
                </Box> */}
            </React.Fragment>
        </div>
    );
};

export default withRouter(Dashboard);

