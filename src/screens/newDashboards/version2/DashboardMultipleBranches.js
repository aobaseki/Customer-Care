import React, {useEffect , useState} from "react";
import { withRouter } from "react-router-dom";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { Q } from "@nozbe/watermelondb";

import Grid from "@material-ui/core/Grid/Grid";
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from "@material-ui/core/Button/Button";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";
import HistoryModal from '../../../components/Modal/option/HistoryModal';
import SyncService from "../../../services/SyncService";
import AuthService from "../../../services/AuthService";
import { useDatabase } from "@nozbe/watermelondb/hooks";

import LocalInfo from '../../../services/LocalInfo';
import CompanyService from "../../../services/CompanyService";
import CardGridComponent from './section/CardGridComponent';
import Brand from "../../../models/brands/Brand";
import BranchProduct from "../../../models/branchesProducts/BranchProduct";
import Product from "../../../models/products/Product";
import Customer from "../../../models/customers/Customer";
import Sales from "../../../models/sales/Sales";
import ModelAction from "../../../services/ModelAction";
import Carts from "../../../models/carts/Carts";
import BranchProductStock from "../../../models/branchesProductsStocks/BranchProductStock";
import BranchProductStockHistory from "../../../models/branchesProductsStocksHistories/BranchProductStockHistory";
import SaleInstallments from "../../../models/saleInstallments/SaleInstallment";
import BranchPurchases from "../../../models/branchPurchases/BranchPurchases";
import StockMovement from "../../../models/stockMovements/StockMovement";
import AuditEntries from "../../../models/auditEntry/AuditEntries";
import Audits from "../../../models/audit/Audit";
import StockReturnHistories from "../../../models/stockReturnHistories/StockReturnHistories";
import SaleReturnHistories from "../../../models/saleReturnHistories/SaleReturnHistories";

import sell from '../../../assets/img/sell.png';
import stock from '../../../assets/img/stock.png';
import transfer from '../../../assets/img/transfer.png';
import dashboardAlt from '../../../assets/img/dashboardAlt.png';
import audit from '../../../assets/img/audit1.png';
import management from '../../../assets/img/management.png';


const Dashboard = props => {
    const [companySales , setCompanySales] = useState(false);
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [historyDialog, setHistoryDialog] = React.useState(false);
    const database = useDatabase();

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

    const logout = async() => {
        try {
            await SyncService.sync(LocalInfo.companyId, LocalInfo.branchId, LocalInfo.userId, database);
            await new AuthService().logout();

        }catch (e) {
            console.log(e)
        }
    };

    const getCompanyDetails = async () => {
        const response = await new CompanyService().getSalesDetails('today');
        setCompanySales(response);
    };
    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { saleReturnHistories, stockReturnHistories, audits, auditedEntries, history, testProducts, stockMovements, purchases, branchProducts, branchProductStock, branchProductStockHistory, brands, manufacturers, products, customers, branchCustomers , sales , saleEntries , saleInstallments , carts , cartEntries, testBranch } = props;


    console.log('#####################################')
    console.log(stockReturnHistories);
    console.log(saleReturnHistories);
    console.log(audits);
    console.log(auditedEntries);
    console.log(stockMovements);
    console.log(testProducts);
    console.log(purchases);
    console.log(companySales);
    console.log(testBranch)
    console.log(branchProducts)
    console.log('#####################################')
    console.log("********************************");
    console.log(LocalInfo.companies);
    console.log("**************************");
    console.log("********************************");
    console.log(products);
    console.log(branchProductStock);
    console.log(11111111111111111111);
    console.log(branchProductStockHistory);
    console.log(11111111111111111111);

    console.log("**************************");
    console.log(Product.columns);
    console.log(branchProducts);
    console.log(brands);
    console.log(manufacturers);

    console.log(customers);
    console.log(branchCustomers);
    console.log(sales);
    console.log(saleEntries);
    console.log(saleInstallments);
    console.log("********************************");
    console.log(carts);
    console.log(cartEntries);
    //console.log(cartEntriesQ);
    console.log("********************************");

    return (
        <div style={{height: '100vh'}}>
            <React.Fragment>
                <CssBaseline />

                <SectionNavbars
                    title={ LocalInfo.company.name }
                    leftIcon={
                        <div onClick={() => setIsDrawerShow(true)}>
                            <MenuIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                    icons={
                        <div onClick={logout}>
                            <ExitToAppIcon
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

                <Paper style={{marginTop: '60px'}} >
                    <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                        <Grid item xs={12} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >
                                Select a branch to continue
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className={`pt-2`}>
                        <Grid item xs={12} style={{padding: '10px', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}} className={`mx-auto mt-7`}>
                            <Button
                                variant="outlined"
                                //onClick={() => props.history.push(paths.sell)}
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '3px 10px', marginRight: '10px', textTransform: 'none', fontSize:'15px', flex: '0 0 auto'}}
                            >
                                <LocationOnIcon
                                    style={{paddingRight: '5px' , fontSize: '2rem', color: '#DAAB59'}}
                                />
                                Adenta branch
                            </Button>
                            <Button
                                variant="outlined"
                                //onClick={() => props.history.push(paths.sell)}
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '3px 10px', marginRight: '10px', textTransform: 'none', fontSize:'15px', flex: '0 0 auto'}}
                            >
                                <LocationOnIcon
                                    style={{paddingRight: '5px' , fontSize: '2rem', color: '#DAAB59'}}
                                />
                                Lapaz branch
                            </Button>
                            <Button
                                ariant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#ffffff', padding: '3px 10px', textTransform: 'none', fontSize:'15px', marginRight: '10px', flex: '0 0 auto'}}
                            >
                                <LocationOnIcon
                                    style={{paddingRight: '5px' , fontSize: '2rem', color: '#ffffff'}}
                                />
                                Legon branch
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper >
                    <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                        <Grid item xs={12} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >
                                Hello, {username}! What will you like to do?
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: '5px' ,
                    }}
                >
                    <CardGridComponent 
                        source={sell} 
                        text='Sell' 
                        onClick={() => history.push(paths.sell)}
                    />

                    <CardGridComponent source={stock} text='Stock' onClick={() => history.push(paths.stock)}/>

                </div>

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: '5px' ,
                    }}
                >
                    <CardGridComponent source={transfer} text='Collection' />

                    <CardGridComponent source={dashboardAlt} text='View history' onClick={openHistoryDialog.bind(this)} />

                </div>

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: '5px' ,
                    }}
                >
                    <CardGridComponent source={audit} text='Audit' />

                    <CardGridComponent source={management} text='Admin' onClick={() => history.push(paths.admin)}/>

                </div>
                
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
      stockReturnHistories: database.collections.get(StockReturnHistories.table).query().observe(),
      saleReturnHistories: database.collections.get(SaleReturnHistories.table).query().observe(),
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

