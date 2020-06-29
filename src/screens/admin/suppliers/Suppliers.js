import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import LocalInfo from '../../../services/LocalInfo';
import Box from "@material-ui/core/Box/Box";
import warehouseImg from "../../../assets/img/warehouse.png";
import Button from "@material-ui/core/Button/Button";
import BoxDefault from "../../../components/Box/BoxDefault";
import Drawer from "../../../components/Drawer/Drawer";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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
        'border-radius': '10px !important',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const Suppliers = props => {
    const classes = useStyles();
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history } = props;

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    const [isStore , setIsStore] = React.useState(false);


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
                            title="Suppliers"
                            leftIcon={
                                <div onClick={() => history.goBack()} >
                                    <ArrowBackIcon
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
                        <div className={`getStarted mt-6`}>
                            <Box component="div">
                                <img className="img100" src={warehouseImg} alt={'Add warehouse'}/>
                            </Box>
                            <div className={`importWarehouseBox`}>
                            <BoxDefault
                                styles={{
                                    color: '#333333',
                                    bottom: '0',
                                    minHeight: '200px',
                                    position: 'fixed',
                                    padding: '0px',
                                    margin: '0px',
                                    left: 0,
                                    right: 0,
                                    width: '100%',
                                }}
                            >
                                <p style={{fontSize: '18px', fontWeight: '600', width: '95%', margin: '25px auto'}}>
                                    Contact your product suppliers and make orders from here
                                </p>

                                <Button
                                    variant="contained"
                                    style={{
                                        width: '80%',
                                        'backgroundColor': '#ffff',
                                        borderRadius: '2px',
                                        color: '#daab59',
                                        border: '1px solid #daab59',
                                        padding: '10px 12px',
                                        margin: '5px auto',
                                        fontSize: '18px',
                                        fontWeight: '500',
                                        marginBottom: "20px"
                                    }}
                                    className={`capitalization`}
                                    onClick={() => history.push(paths.view_suppliers)}
                                >
                                    View Suppliers
                                </Button>

                                <Button
                                    variant="contained"
                                    style={{
                                        width: '80%',
                                        'backgroundColor': '#ffff',
                                        borderRadius: '2px',
                                        color: '#daab59',
                                        border: '1px solid #daab59',
                                        padding: '10px 12px',
                                        margin: '5px auto',
                                        fontSize: '18px',
                                        fontWeight: '500',
                                        marginBottom: "20px"
                                    }}
                                    className={`capitalization`}
                                    onClick={() => history.push(paths.order_history)}
                                >
                                    View order history
                                </Button>

                                <Button
                                    variant="contained"
                                    style={{
                                        width: '80%',
                                        'backgroundColor': '#DAAB59',
                                        borderRadius: '2px',
                                        color: '#333333',
                                        padding: '10px 12px',
                                        margin: '5px auto',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        marginBottom: "20px"
                                    }}
                                    className={`capitalization`}
                                    onClick={() => history.push(paths.view_suppliers)}
                                >
                                    Add stock from suppliers
                                </Button>
                            </BoxDefault>
                            </div>
                        </div>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(Suppliers);
