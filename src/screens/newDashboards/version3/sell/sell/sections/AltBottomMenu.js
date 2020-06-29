import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { withRouter } from "react-router-dom";
import paths from "../../../../../../utilities/paths";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';


const BottomMenu = props => {

    const { history } = props;

    return (
        <Grid
            container
            spacing={1}
            className={`py-1`}
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >

            <div
                className={`text-center icon-color`}
                style={{
                    flex: 1,
                }}
                onClick={() => history.push(paths.newSell )}
            >
                <AddShoppingCartIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                    
                >
                    Sell
                </Typography>
            </div>

            <div
                style={{flex: 1}}
                onClick={() => history.push(paths.newStock )}
                className={`text-center icon-color`}
            >
                <ShoppingCartOutlinedIcon
                    style={{fontSize: '25px'}}
                />
                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    Add stock
                </Typography>
            </div>
               
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
                // onClick={() => history.push(paths.purchase_history, {pageName: true, product: props.branchProduct.productId})}
                //onClick={() => history.push(paths.collection_owner )}
            >
                <AccountBalanceWalletIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}

                >
                    Collection
                </Typography>
            </div>
            <div
                style={{flex: 1}}
                className={`text-center icon-color`}
                onClick={() => history.push(paths.admin )}
            >
                <SettingsIcon
                    style={{fontSize: '25px'}}
                />

                <Typography
                    component="h6"
                    variant="h6"
                    style={{fontSize: '12px'}}
                >
                    Admin
                </Typography>
            </div>
        </Grid>
    );
};

export default withRouter(BottomMenu);

