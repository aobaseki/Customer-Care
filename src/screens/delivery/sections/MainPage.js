import React, {useState} from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "../../../components/Drawer/Drawer";
import {withRouter} from 'react-router-dom';
import BoxDefault from "../../../components/Box/BoxDefault";
import CardDefault from "../../../components/Cards/CardDefault";
import paths from '../../../utilities/paths';
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BottomMenu from './BottomView';


const MainPage = props => {

    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const { history } = props;


    return (
        <div style={{height: '100vh'}}>
            <React.Fragment>
            <CssBaseline />
                <SectionNavbars
                    title="Welcome User"
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

                <BoxDefault
                    bgcolor="background.paper"
                    p={1}
                    className={'boxDefault'}
                    styles={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: '65px'
                    }}
                >

                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontWeight: '700', fontSize: '1.00rem'}}
                    >
                        Delivery van summary
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
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                style={{fontSize: '10px'}}
                            >
                                Stock
                            </Typography>

                            <Typography
                                style={{fontWeight: '700', fontSize: '15px', borderBottom: "1px solid #d8d2d2"}}
                            >
                                0 packs
                            </Typography>

                            <Typography
                                style={{fontWeight: '700', fontSize: '15px', marginTop: '5px'}}
                            >
                                GHC 0
                            </Typography>

                        </CardDefault>
                        
                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginRight: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                style={{fontSize: '10px'}}
                            >
                                Sales
                            </Typography>

                            <Typography
                                style={{fontWeight: '700', fontSize: '15px', borderBottom: "1px solid #d8d2d2"}}
                            >
                                0 packs
                            </Typography>

                            <Typography
                                style={{fontWeight: '700', fontSize: '15px', marginTop: '5px'}}
                            >
                                GHC 0
                            </Typography>

                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginRight: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                style={{fontSize: '10px'}}
                            >
                                Balance
                            </Typography>

                            <Typography
                                style={{fontWeight: '700', fontSize: '15px', borderBottom: "1px solid #d8d2d2"}}
                            >
                                0 packs
                            </Typography>

                            <Typography
                                style={{fontWeight: '700', fontSize: '15px', marginTop: '5px'}}
                            >
                                GHC 0
                            </Typography>

                        </CardDefault>
                        
                    </div>

                </BoxDefault>

                <BoxDefault
                    bgcolor="background.paper"
                    p={1}
                    className={'boxDefault'}
                    styles={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >

                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontWeight: '700', fontSize: '1.00rem'}}
                    >
                        Quick actions
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
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <ShoppingCartIcon style={{fontSize: '3rem'}} />

                            <Typography
                                style={{fontWeight: '700', fontSize: '14px', marginTop: '-5px'}}
                            >
                                Add stock for delivery
                            </Typography>

                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                            onClick={() => history.push(paths.accounting)}
                        >
                            <LocalAtmIcon style={{fontSize: '3rem'}}  />

                            <Typography
                                style={{fontWeight: '700', fontSize: '15px', marginTop: '-5px'}}
                            >
                                Accounting
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
                                border: '0.5px solid #e5e5e5'
                            }}
                            onClick={() => history.push(paths.admin_customers)}
                        >
                            <GroupIcon style={{fontSize: '3rem'}} />

                            <Typography
                                style={{fontWeight: '700', fontSize: '14px', marginTop: '-5px'}}
                            >
                                My customers
                            </Typography>

                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <ListAltIcon style={{fontSize: '3rem'}} />

                            <Typography
                                style={{fontWeight: '700', fontSize: '15px', marginTop: '-5px'}}
                            >
                                Orders
                            </Typography>

                        </CardDefault>

                    </div>

                    <div
                        style={{
                            display: 'inline',
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
                                border: '0.5px solid #e5e5e5'
                            }}
                            onClick={() => history.push(paths.sell)}
                        >
                            <LocalShippingOutlinedIcon style={{fontSize: '3rem'}} />

                            <Typography
                                style={{fontWeight: '700', fontSize: '14px', marginTop: '-5px'}}
                            >
                                Start selling
                            </Typography>

                        </CardDefault>

                    </div>
                </BoxDefault>

                <Box
                    className="shadow1"
                    bgcolor="background.paper"
                    p={1}
                    style={{ height: '3.0rem', position: "fixed", bottom:"0", width:"100%" }}
                >
                    <BottomMenu setView={props.setView}/>
                </Box>



            </React.Fragment>
        </div>
    )

}

export default withRouter(MainPage);