import React, {useEffect , useState} from "react";
import { withRouter } from "react-router-dom";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { Q } from "@nozbe/watermelondb";
import './Dashboard.scss';

import Button from "@material-ui/core/Button";
import paths from "../../utilities/paths";
import Box from "@material-ui/core/Box/Box";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';

import HomeIcon from '@material-ui/icons/Home';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../components/Sections/SectionNavbars";
import BoxDefault from "../../components/Box/BoxDefault";
import CardDefault from "../../components/Cards/CardDefault";
import SettingsIcon from '@material-ui/icons/Settings';
import Drawer from "../../components/Drawer/Drawer";

import LocalInfo from '../../services/LocalInfo';
import Manufacturer from "../../models/manufacturers/Manufacturer";
import Brand from "../../models/brands/Brand";
import BranchProduct from "../../models/branchesProducts/BranchProduct";
import Product from "../../models/products/Product";
import Customer from "../../models/customers/Customer";
import Sales from "../../models/sales/Sales";
import ModelAction from "../../services/ModelAction";
import Carts from "../../models/carts/Carts";
import CartEntry from "../../models/cartEntry/CartEntry";
import BranchProductStock from "../../models/branchesProductsStocks/BranchProductStock";
import BranchProductStockHistory from "../../models/branchesProductsStocksHistories/BranchProductStockHistory";
import SaleInstallments from "../../models/saleInstallments/SaleInstallment";
import CompanyService from "../../services/CompanyService";
import BranchPurchases from "../../models/branchPurchases/BranchPurchases";
import StockMovement from "../../models/stockMovements/StockMovement";
import AuditEntries from "../../models/auditEntry/AuditEntries";
import Audits from "../../models/audit/Audit";
import confirmImg from "../../assets/img/dashboard.png";
import StockReturnHistories from "../../models/stockReturnHistories/StockReturnHistories";
import SaleReturnHistories from "../../models/saleReturnHistories/SaleReturnHistories";

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
        'border-radius': '10px',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const Dashboard = props => {
    const classes = useStyles();
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

    const { saleReturnHistories, stockReturnHistories, audits, auditedEntries, history, testProducts, stockMovements, purchases, branchProducts, branchProductStock, branchProductStockHistory, brands, manufacturers, products, database, customers, branchCustomers , sales , saleEntries , saleInstallments , carts , cartEntries, testBranch ,cashFlow, cartEntriesQ } = props;
    // const database = useDatabase();

    /*const createBrand = async() => {
        const columns = {
            id: uuid(),
            name: 'Mane',
            location: 'Mallam',
            phone: '0241441748',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        const mew = await new ModelAction('Customer').post(columns);

        console.log("********************************");
        console.log(new ModelAction('Brand').index())
        console.log(mew);
        console.log("**************************");
    }*/

    console.log('#####################################')
    console.log(stockReturnHistories);
    console.log(saleReturnHistories);
    //console.log(cashFlow);
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

    /*const attachProducts = () => {
        let m = 0;
        database.action( async () => {
            branchProducts.forEach(item => {
                item.product.set(product[m]);
                m++;
            })
        });

    };*/
  /*const createCustomer = async () => {
    const customerToCreate = { id: uuid(), name: "New guy", location: "Oyibi", phone: "0543344100", createdAt: Date.now(), updatedAt: Date.now() };
    database.action(async () => {
      const customerCollection = await database.collections.get(Customer.table);
      const newBrand = customerCollection.create(brand => {
        brand.name = customerToCreate.name;
        brand._raw.id = customerToCreate.id;
        brand.location = customerToCreate.paymentStatus;
        brand.phone = customerToCreate.phone;
        brand.createdAt = customerToCreate.createdAt;
        brand.updatedAt = customerToCreate.updatedAt;
      });
      //alert(`Successfully created the customer ${newCustomer.name}`);
      alert(`Successfully created the sales ${newBrand.id}`);
    });
  };*/


    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    return (
        <div >
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
                            marginBottom: '4.0rem' ,
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
                            <SettingsIcon style={{fontSize: '1.5rem'}}/>
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '0.9rem'}}
                                onClick={() => history.push(paths.admin)}
                            >
                                Go to Admin
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
                            <HomeIcon style={{fontSize: '1.5rem'}}/>
                            <Typography
                                component="p"
                                variant="h6"
                                style={{fontWeight: '700', fontSize: '0.9rem'}}
                                onClick={() => history.push(paths.stock)}
                            >
                                View stock
                            </Typography>
                        </CardDefault>
                    </div>

                </BoxDefault>

                <Box
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
                </Box>
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

