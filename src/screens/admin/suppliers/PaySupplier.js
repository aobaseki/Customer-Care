import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";

import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalInfo from '../../../services/LocalInfo';
import Box from "@material-ui/core/Box/Box";
import warehouseImg from "../../../assets/img/warehouse.png";
import Button from "@material-ui/core/Button/Button";
import BoxDefault from "../../../components/Box/BoxDefault";
import Drawer from "../../../components/Drawer/Drawer";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import PriceInput from "../../../components/Input/PriceInput";

const PaySupplier = props => {

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
            <Component
                initialState={{
                    isDrawerShow: false,
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />


                        <SectionNavbars title={`Suppliers`}>
                            <ArrowBackIcon
                                onClick={() => history.push(paths.view_suppliers)}
                            />
                        </SectionNavbars>

                        <Drawer isShow={state.isDrawerShow} />

                        <div className="getStarted">
                            <div style={{minHeight: "100px"}}>
                                _
                            </div>
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
                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '100%',
                                            'backgroundColor': '#ffff',
                                            border: '1px solid #black',
                                            padding: '10px 12px',
                                            margin: '5px auto',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            marginBottom: "10px"
                                        }}
                                    >
                                        Amount owned : Ghc 50.00
                                    </Button>

                                    <p style={{fontSize: '18px', fontWeight: '400', color: '#DAAB59',width: '75%', margin: '50px auto' , marginTop: "0px"}}>
                                        Total Due : Ghc <span>500</span>
                                    </p>
                                    <PriceInput label={`Enter Amount Paid`}/>

                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '80%',
                                            'backgroundColor': '#DAAB59',
                                            borderRadius: '7px',
                                            color: '#333333',
                                            padding: '10px 12px',
                                            margin: '5px auto',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            marginTop: '20px',
                                            marginBottom: "5px"
                                        }}

                                    >
                                        Finish
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

export default withRouter(PaySupplier);
