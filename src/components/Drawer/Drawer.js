import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import './Drawer.scss';
import Avatar from "@material-ui/core/Avatar/Avatar";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router-dom";
import paths from "../../utilities/paths";
import LocalInfo from "../../services/LocalInfo";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SyncService from "../../services/SyncService";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import AuthService from "../../services/AuthService";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import HelpIcon from '@material-ui/icons/Help';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import fromUnixTime from 'date-fns/fromUnixTime';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 320,
        height: '100%',
        backgroundColor: `#ffffff !important`
    },
    fullList: {
        width: 'auto',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Drawer = props => {
    const { history } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: props.isShow,
    });
    const lastSync = formatDistanceToNow(
        fromUnixTime(LocalInfo.lastSyncedAt / 1000)
    );

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [syncOpen, setSyncOpen] = React.useState(false);

    const database = useDatabase();

    useEffect(() => {
        toggleDrawer('left' , props.isShow);
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ 'left': open });
    };

    const handleSyncClose = () => {
         setSyncOpen(false);
    };
    /*const handleSyncToggle = () => {
         setSyncOpen(!syncOpen);
    };*/

     const sync = async() => {
         setSyncOpen(true);
         //backDrop();
         await SyncService.sync(LocalInfo.companyId, LocalInfo.branchId, LocalInfo.userId, database);

         alert("About to sync");
         alert("Done syncing");
         handleSyncClose();
     };

    // const backDrop = () => {
    //     console.log('I was here')
    //     return (
    //         <Backdrop className={classes.backdrop} open={syncOpen}>
    //             <ProgressLabel
    //                 progress={localStorage.getItem("currentRequestProgress")}
    //                 fillColor="rgb(248,247,243)"
    //                 trackColor="#fff"
    //                 progressColor="#DAAB59"
    //                 progressWidth={10}
    //                 trackWidth={16}
    //                 trackBorderWidth={1}
    //                 trackBorderColor="rgb(232,223,209)"
    //                 cornersWidth={5}
    //                 size={130}
    //                 text={localStorage.getItem("currentRequestName")}
    //                 textProps={{
    //                     x: '50%',
    //                     y: '50%',
    //                     dx: 8,
    //                     dy: 8,
    //                     textAnchor: 'middle',
    //                     style: {
    //                         fontSize: 28,
    //                         fontWeight: '500',
    //                         fill: '#ac884c'
    //                     }
    //                 }}
    //             />
    //         </Backdrop>
    //     )
    // }

    const logout = async() => {
        try {
            await SyncService.sync(LocalInfo.companyId, LocalInfo.branchId, LocalInfo.userId, database);
            await new AuthService().logout();

        }catch (e) {
            console.log(e)
        }
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <span className="drawerDefault"
                onClick={() => history.push(paths.dashboard)}
                style={{display: 'flex', position: 'relative', background: '#ffffff', lineHeight: '27px', color: '#403C3C'}}
            >
                <div className="ham-top-div">
                    <div>
                        <Avatar
                            alt={LocalInfo.company.name}
                            //src={Woman}
                            className={classes.primaryColor}
                            style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "50%",
                                margin: '10px auto',
                                textAlign: 'left',
                                color: '#000000',
                                backgroundColor: '#EBBAB3',
                            }}
                        >
                            {(LocalInfo.company.name).charAt(0).toUpperCase()}
                        </Avatar>
                    </div>
                    <div className="" style={{ padding:'10px 16px'}}>
                        <span className="large" id="s_name">{ LocalInfo.company.name }</span><br/>
                        <span className="medium" id="b_name">{ LocalInfo.userFullName }  <FiberManualRecordIcon style={{fontSize: '10px'}} />  { LocalInfo.branch.name } branch</span><br/>
                        {/* <span className="medium" id="u_name">{ LocalInfo.userFullName }</span> */}
                    </div>
		        </div>
            </span>

            <List className="drawerDefault" style={{background:'#FFFFFF', color: '#403C3C'}}>
                <ListItem button key={1}  >
                    <ListItemIcon><CloudDoneIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary={`Last sync: ${lastSync} ago`} />
                    <ListItemText
                        style={{
                            padding: '5px 10px',
                            borderRadius: '5px',
                        }}
                        className={`shadow1 text-center`}
                        primary="Sync"
                        onClick={sync}
                    />
                    {/*<SyncIcon />*/}
                </ListItem>

                <ListItem button key={2} onClick={() => history.push(paths.sell)}>
                    <ListItemIcon><ShoppingCartIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Sell" />
                </ListItem>

                <ListItem button key={3} onClick={() => history.push(paths.stock)}>
                    <ListItemIcon><FormatListBulletedIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Stock" />
                </ListItem>

                <ListItem button key={5} onClick={() => history.push(paths.dashboard)}>
                    <ListItemIcon><DashboardIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <Divider />

                <ListItem button key={6} >
                    <ListItemIcon onClick={() => history.push(paths.admin)} ><SettingsIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Admin" onClick={() => history.push(paths.admin)}/>
                    {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon> <StoreIcon style={{color: '#403C3C'}} /> </ListItemIcon>
                            <ListItemText primary="Shop information" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon> <FormatListBulletedIcon style={{color: '#403C3C'}} /> </ListItemIcon>
                            <ListItemText primary="Stock" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={() => history.push(paths.employees)}>
                            <ListItemIcon> <PersonIcon style={{color: '#403C3C'}} /> </ListItemIcon>
                            <ListItemText primary="Employees" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={() => history.push(paths.admin_customers)}>
                            <ListItemIcon> <PersonIcon style={{color: '#403C3C'}} /> </ListItemIcon>
                            <ListItemText primary="Customers" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={() => history.push(paths.suppliers)}>
                            <ListItemIcon> <PersonIcon style={{color: '#403C3C'}} /> </ListItemIcon>
                            <ListItemText primary="Suppliers" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button key={7} onClick={() => history.push(paths.audit)}>
                    <ListItemIcon><VisibilityIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Audit" />
                </ListItem>

                <ListItem button key={8} onClick={() => history.push(paths.reconciliation)}>
                    <ListItemIcon><AccountBalanceWalletIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Reconciliation" />
                </ListItem>

                <ListItem button key={11}>
                    <ListItemIcon><HelpIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Help" />
                </ListItem>

                <ListItem button key={12} onClick={logout}>
                    <ListItemIcon><ExitToAppIcon style={{color: '#403C3C'}} /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <SwipeableDrawer
                open={props.isShow}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', props.isShow)}
            >
                {sideList('left')}
            </SwipeableDrawer>
        </div>
    );
};

export default withRouter(Drawer);
