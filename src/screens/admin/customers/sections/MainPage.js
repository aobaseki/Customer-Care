import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import paths from "../../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Box from "@material-ui/core/Box/Box";
import CustomerImg from "../../../../assets/img/customer.png";
import Button from "@material-ui/core/Button/Button";
import BoxDefault from "../../../../components/Box/BoxDefault";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Customers = props => {

    const { history } = props;

    const changeView = (event) => {
        props.setView(0);
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
                            title="Customers"
                            leftIcon={
                                <div onClick={() => history.goBack()} >
                                    <ArrowBackIcon
                                        style={{fontSize: '2rem'}}
                                    />
                                </div>
                            }
                        />

                        <div className={`getStarted mt-6`}>
                            <Box component="div">
                                <img className="img100" src={CustomerImg} alt={'Customer warehouse'}/>
                            </Box>
                            <div className={`importWarehouseBox`}>
                            <BoxDefault
                                styles={{
                                    color: '#333333',
                                    bottom: '0',
                                    minHeight: '150px',
                                    position: 'fixed',
                                    padding: '0px',
                                    margin: '0px',
                                    left: 0,
                                    right: 0,
                                    width: '100%',
                                }}
                            >
                                <p style={{fontSize: '18px', fontWeight: '600', width: '95%', margin: '10px auto'}}>
                                    Manage all your customers and credit sales
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
                                    onClick={changeView.bind(this)}
                                >
                                    View Customers
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
                                    onClick={() => history.push(paths.invoice_history)}
                                >
                                    View invoice history
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
                                    onClick={() => history.push(paths.sell)}
                                >
                                    Sell product
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

export default withRouter(Customers);
