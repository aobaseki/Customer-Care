import React, {useEffect , useState} from "react";
import { withRouter } from "react-router-dom";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { Q } from "@nozbe/watermelondb";
import './Dashboard.scss';

import Grid from "@material-ui/core/Grid/Grid";
import paths from "../../../utilities/paths";
import Box from "@material-ui/core/Box/Box";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import BoxDefault from "../../../components/Box/BoxDefault";
import CardDefault from "../../../components/Cards/CardDefault";
import Drawer from "../../../components/Drawer/Drawer";
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AppsIcon from '@material-ui/icons/Apps';

import LocalInfo from '../../../services/LocalInfo';
import Brand from "../../../models/brands/Brand";
import BranchProduct from "../../../models/branchesProducts/BranchProduct";
import Customer from "../../../models/customers/Customer";
import Sales from "../../../models/sales/Sales";
import ModelAction from "../../../services/ModelAction";
import Carts from "../../../models/carts/Carts";
import BranchProductStock from "../../../models/branchesProductsStocks/BranchProductStock";
import BranchProductStockHistory from "../../../models/branchesProductsStocksHistories/BranchProductStockHistory";
import SaleInstallments from "../../../models/saleInstallments/SaleInstallment";
import CompanyService from "../../../services/CompanyService";
import BranchPurchases from "../../../models/branchPurchases/BranchPurchases";
import StockMovement from "../../../models/stockMovements/StockMovement";
import AuditEntries from "../../../models/auditEntry/AuditEntries";
import Audits from "../../../models/audit/Audit";
import confirmImg from "../../../assets/img/dashboard.png";

import HistoryModal from '../../../components/Modal/option/HistoryModal';

const Dashboard = props => {
    const [companySales , setCompanySales] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [historyDialog, setHistoryDialog] = React.useState(false);

    const openHistoryDialog = (event) => {
        setHistoryDialog(true);
    };

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

    const {  history } = props;

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
                    icons={
                        <div onClick={() => history.push(paths.firstView)}>
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

                <Box component="div" m={2} style={{paddingTop: '0px' , marginTop: '40px' , marginBottom: '0px' , height: '190px'}}>
                    <img className={`img-responsive w-100`} src={confirmImg} alt={'test'}/>
                </Box>

                <BoxDefault
                    bgcolor="background.paper"
                    p={1}
                    className="boxDefault px-4"
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
                        Store summary
                    </Typography>

                    <div
                        style={{
                            display: 'flex',
                            width: '85%',
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
                                component="p"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '0.9rem'}}
                            >
                                Today's sales
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.2rem'}}
                            >
                                GHC {companySales.total}
                            </Typography>

                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginLeft: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '0.9rem'}}
                            >
                                Today's profit
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.2rem'}}
                            >
                                GHC {companySales.profit}
                            </Typography>
                        </CardDefault>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            width: '85%',
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
                                component="p"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '0.9rem'}}
                            >
                                Credit sales
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.2rem'}}
                            >
                                GHC {companySales.credit}
                            </Typography>
                        </CardDefault>

                        <CardDefault
                            styles={{
                                marginTop: '10px' ,
                                flex: 1,
                                marginLeft: '10px',
                                borderRadius: '5px',
                                border: '0.5px solid #e5e5e5'
                            }}
                        >
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '500', fontSize: '0.9rem'}}
                            >
                                Purchases
                            </Typography>

                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '1.2rem'}}
                            >
                                GHC {companySales.purchases}
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
                        flexDirection: 'column'
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
                                border: '0.5px solid #daab59'
                            }}
                        >
                            
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '0.9rem', color: '#daab59'}}
                                onClick={openHistoryDialog.bind(this)}
                            >
                                <Grid container style={{marginTop: '10px'}} >
                                    <Grid xs={6}>
                                        <HistoryOutlinedIcon style={{fontSize: '3rem'}}/>
                                    </Grid>
                                    <Grid xs={6}>
                                        View history
                                    </Grid>
                                </Grid>
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
                                //onClick={() => history.push(paths.collection_owner)}
                            >
                                <Grid container style={{marginTop: '10px'}}>
                                    <Grid xs={6}>
                                        <HomeIcon style={{fontSize: '3rem'}}/>
                                    </Grid>
                                    <Grid xs={6}>
                                        Add collection
                                    </Grid>
                                </Grid>     
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
                                onClick={() => history.push(paths.sell)}
                            >
                                <Grid container style={{marginTop: '10px'}}>
                                    <Grid xs={6}>
                                        <ShoppingCartIcon style={{fontSize: '3rem'}}/>
                                    </Grid>
                                    <Grid xs={6}>
                                        Start selling
                                    </Grid>
                                </Grid>
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
                                onClick={() => history.push(paths.stock)}
                            >
                                <Grid container style={{marginTop: '10px'}}>
                                    <Grid xs={5}>
                                        <AddShoppingCartIcon style={{fontSize: '3rem'}}/>
                                    </Grid>
                                    <Grid xs={5}>
                                        Add stock
                                    </Grid>
                                    <Grid xs={2}></Grid>
                                </Grid>       
                            </Typography>
                        </CardDefault>
                    </div>

                </BoxDefault>

                <HistoryModal
                    openState={historyDialog}
                    handleClose={() => setHistoryDialog(false)}
                />

            </React.Fragment>
        </div>
    );
};

const EnhancedDashboard = withDatabase(
  withObservables([], ({ database }) => ({
    audits: database.collections.get(Audits.table).query().observe(),
    auditedEntries: database.collections.get(AuditEntries.table).query().observe(),
    branchProducts: database.collections.get(BranchProduct.table).query(Q.where('branchId', localStorage.getItem('activeBranch'))).observe(),
    stockMovements: database.collections.get(StockMovement.table).query().fetch(),
    testProducts: database.collections.get(BranchProduct.table).query().observe(),
    branchProductStock: database.collections.get(BranchProductStock.table).query().observe(),
    branchProductStockHistory: database.collections.get(BranchProductStockHistory.table).query().observe(),
    brands: database.collections.get(Brand.table).query().observe(),
    manufacturers: new ModelAction('Manufacturer').index(),
    products: new ModelAction('Product').index(),
    customers: database.collections.get(Customer.table).query().observe(),
    sales: database.collections.get(Sales.table).query().observe(),
    saleEntries: new ModelAction('SaleEntry').index(),
    carts: database.collections.get(Carts.table).query().observe(),
    purchases: database.collections.get(BranchPurchases.table).query().observe(),
    cartEntries: new ModelAction('CartEntry').index(),
    saleInstallments: database.collections.get(SaleInstallments.table).query().observe(),
    testBranch: new ModelAction('BranchProduct').findByColumn({
        name: 'branchId',
        value: LocalInfo.branchId,
        fxn: 'eq'
    }),
    /*
  cashFlow: new ModelAction('Cashflow').indexNotObserve(),
    branchCustomers: database.collections.get(BranchCustomer.table).query().observe(),
    */

  }))(withRouter(Dashboard))
);

export default EnhancedDashboard;

