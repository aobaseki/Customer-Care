import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import paths from "../../../../../../utilities/paths";
import { withRouter } from "react-router-dom";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
});

 const SimpleBottomNavigation = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { history } = props;

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Sell" icon={<AddShoppingCartIcon />} onClick={() => history.push(paths.newSell )}/>
      <BottomNavigationAction label="Add stock" icon={<ShoppingCartOutlinedIcon />} onClick={() => history.push(paths.newStock )}/>
      <BottomNavigationAction label="Collection" icon={<AccountBalanceWalletIcon />} />
      <BottomNavigationAction label="Admin" icon={<SettingsIcon />} onClick={() => history.push(paths.admin )}/>
    </BottomNavigation>
  );
}

export default withRouter(SimpleBottomNavigation);
