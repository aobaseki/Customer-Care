import React from "react";
import "./App.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import database from "./models/database";
import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import Register from "./screens/register/Register";
import VerifySMS from "./screens/verifySMS/Verify_sms";
import Dashboard from './screens/newDashboards/version2/DashboardTwo';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import paths from "./utilities/paths";
import GetStarted from "./screens/getStarted/GetStarted";
import AddProducts from "./screens/onboarding/addProducts/AddProducts";
import CategorySetup from "./screens/onboarding/categorySetup/CategorySetup";
import Cart from "./screens/sell/cart/Cart";

import Accounting from "./screens/accounting/Accounting";
import SalesHistory from "./screens/history/salesHistory/SalesHistory";
import PurchaseHistory from "./screens/history/purchaseHistory/PurchaseHistory";
import OrderHistory from "./screens/history/orderHistory/OrderHistory";
import InvoiceHistory from "./screens/history/invoiceHistory/InvoiceHistory";

import ResetPassword from "./screens/forgotPassword/sections/ResetPassword";
import ForgottenPassword from "./screens/forgotPassword/ForgottenPassword";
import StoreSummary from "./screens/sell/store_summary/StoreSummary";
import Sell from "./screens/sell/sell/Sell";
import MainViewStock from "./screens/stock/DirectiveViewStock";
import GetStartedAudit from "./screens/audit/getStarted/getStartedAudit";
import Audit from "./screens/audit/Audit";

import Admin from "./screens/admin/Admin";
import AddWarehouse from "./screens/admin/warehouse/AddWarehouse";
import ChangeStoreInformation from "./screens/admin/storeInformation/ChangeStoreInformation";
import AccountInformation from "./screens/admin/accountInformation/AccountInformation";
import VerifyPhone from "./screens/admin/accountInformation/VerifyPhone";
import ChangePrice from "./screens/admin/changePrice/ChangePrice";
import Suppliers from "./screens/admin/suppliers/Suppliers";
import ViewSuppliersNew from "./screens/admin/suppliers/mainView/ViewSuppliersNew";
import SupplierDetails from "./screens/admin/suppliers/SupplierDetails";
import PaySupplier from "./screens/admin/suppliers/PaySupplier";
import SupplierStock from "./screens/admin/suppliers/SupplierStock";
import AddSupplier from "./screens/admin/suppliers/AddSupplier";
import SupplierOrderStock from "./screens/admin/suppliers/orderStock/SupplierOrderStock";
import Employees from "./screens/admin/employees/Employees";

import AdminCustomers from "./screens/admin/customers/Customer";
import AccountingNoAttendants from "./screens/accountingNoAttendants/Accounting";
import CollectionOwner from "./screens/collection/Owner";
import CollectionAttendant from "./screens/collection/Attendant";
import CollectionNoAttendant from "./screens/collection/NoAttendant";
import Reconciliation from "./screens/audit/Reconciliation";
import AddBranch from "./screens/admin/addBranch/AddBranch";
import ProductRequest from "./screens/admin/productRequest/ProductRequest";

import SalesReturns from "./screens/returns/sales/SalesReturns";
import StockReturns from "./screens/returns/stock/StockReturns";
import CustomerCare from "./screens/customerCare/CustomerCare";
import Delivery from "./screens/delivery/Delivery";
import history from "./utilities/history";
import StockMovement from "./screens/stock/sections/StockMovement";

// import DashboardOne from './screens/newDashboards/version1/DashboardOne';
// import DashboardTwo from './screens/newDashboards/version2/DashboardTwo';
// import NewSell from './screens/newDashboards/version3/sell/sell/Sell';
// import NewCart from "./screens/newDashboards/version3/sell/cart/Cart";
// import NewStock from './screens/newDashboards/version3/stock/DirectiveViewStock';
// import FirstView from './screens/dashboard/FirstView';
import CreditSales from './screens/creditSales/CreditSales';
import OtherStock from './screens/stock/sections/otherStock/stock/OtherStock';
import OtherCart from './screens/stock/sections/otherStock/cart/OtherCart';
import LocalInfo from "./services/LocalInfo";
import ErrorPage from './screens/newDashboards/version2/section/ErrorPage';
import UnderConstruction from './screens/newDashboards/version2/section/UnderConstruction';
import DashboardMultipleBranches from './screens/newDashboards/version2/DashboardMultipleBranches';

function NoMatch() {
  return (
    <div>
        {/* <button type="primary" onClick={() => (window.location.href = paths.dashboard)}>
            Back Home
        </button> */}
        <ErrorPage />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <DatabaseProvider database={database}>
        <div className="App">
          <Router history={history}>
            <Switch>
              <PublicRoute
                exact={true}
                path={paths.login}
                component={Login}
                title={`Login`}
              />
              <AuthenticatedRoute
                exact={true}
                path={paths.cart}
                component={Cart}
                title={`Cart`}
              />
              <AuthenticatedRoute
                exact={true}
                path={paths.dashboard_multiple}
                component={DashboardMultipleBranches}
                title={`Dashboard`}
              />
              <AuthenticatedRoute
                exact={true}
                path={paths.sales_history}
                component={SalesHistory}
                title={`Sales History`}
              />
              <AuthenticatedRoute
                exact={true}
                path={paths.purchase_history}
                component={PurchaseHistory}
                title={`Purchase History`}
              />
              <AuthenticatedRoute
                exact={true}
                path={paths.order_history}
                component={OrderHistory}
                title={`Order History`}
              />
              <AuthenticatedRoute
                exact={true}
                path={paths.invoice_history}
                component={InvoiceHistory}
                title={`Invoice History`}
              />
              <AuthenticatedRoute
                exact={true}
                component={Accounting}
                title={`Accounting`}
                path={paths.accounting}
              />
              <PublicRoute
                exact={true}
                component={Register}
                title={`Registration`}
                path={paths.register}
              />
                <PublicRoute
                    exact={true}
                    component={ResetPassword}
                    title={`Reset Password`}
                    path={paths.reset_password}
                />
                <PublicRoute
                    exact={true}
                    component={ForgottenPassword}
                    title={`Forgot Password`}
                    path={paths.forgot_password}
                />
              <PublicRoute
                exact={true}
                component={Home}
                title={`Home`}
                path={paths.home}
              />
                <PublicRoute
                    exact={true}
                    component={VerifySMS}
                    title={`Verify contact`}
                    path={paths.verify_sms}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={Dashboard}
                    title={`Dashboard`}
                    path={paths.dashboard}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={GetStarted}
                    title={`Getting Started`}
                    path={paths.get_started}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={Audit}
                    title={`Audit`}
                    path={paths.audit}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={GetStartedAudit}
                    title={`Getting Started Audit`}
                    path={paths.get_startedAudit}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={CategorySetup}
                    title={`Add shop categories`}
                    path={paths.category_setup}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={AddProducts}
                    title={`Add products`}
                    path={paths.add_products}
                />

                <AuthenticatedRoute
                    exact={true}
                    component={StoreSummary}
                    title={`Store summary`}
                    path={paths.store_summary}
                />

                <AuthenticatedRoute
                    exact={true}
                    component={Sell}
                    title={`Sell`}
                    path={paths.sell}
                />

                <AuthenticatedRoute
                    exact={true}
                    component={MainViewStock}
                    title={`Stock`}
                    path={paths.stock}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={Admin}
                    title={`Admin`}
                    path={paths.admin}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={AddWarehouse}
                    title={`Add Warehouse`}
                    path={paths.add_warehouse}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={ChangeStoreInformation}
                    title={`Store Information`}
                    path={paths.change_store_info}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={AccountInformation}
                    title={`Account Information`}
                    path={paths.account_info}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={VerifyPhone}
                    title={`Verify Phone`}
                    path={paths.verify_phone}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={ChangePrice}
                    title={`Change Price`}
                    path={paths.change_price}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={AdminCustomers}
                    title={`Customers`}
                    path={paths.admin_customers}
                />
                {/* <Route
                    path={paths.expense}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Admin | ${appName}`);
                        return <Expense />;
                    }}
                /> */}
                {/* <Route
                    path={paths.generate_barcode}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Admin | ${appName}`);
                        return <GenerateBarcode />;
                    }}
                /> */}

                <AuthenticatedRoute
                    exact={true}
                    component={Suppliers}
                    title={`Suppliers`}
                    path={paths.suppliers}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={ViewSuppliersNew}
                    title={`Suppliers`}
                    path={paths.view_suppliers}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={SupplierDetails}
                    title={`Suppliers`}
                    path={paths.supplier_detail}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={PaySupplier}
                    title={`Suppliers`}
                    path={paths.pay_supplier}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={SupplierStock}
                    title={`Suppliers`}
                    path={paths.add_supplier_stock}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={SupplierOrderStock}
                    title={`Order Supplier`}
                    path={paths.order_supplier_stock}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={AddSupplier}
                    title={`Supplier`}
                    path={paths.add_supplier}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={Employees}
                    title={`Employees`}
                    path={paths.employees}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={AccountingNoAttendants}
                    title={`Accounting No Attendants`}
                    path={paths.accounting_no_attendant}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={CollectionOwner}
                    title={`Collection Owner`}
                    path={paths.collection_owner}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={CollectionAttendant}
                    title={`Collection Attendant`}
                    path={paths.collection_attendant}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={CollectionNoAttendant}
                    title={`Collection No Attendant`}
                    path={paths.collection_no_attendant}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={Reconciliation}
                    title={`Reconciliation`}
                    path={paths.reconciliation}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={AddBranch}
                    title={`Add Branch`}
                    path={paths.add_branch}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={ProductRequest}
                    title={`Product Request`}
                    path={paths.product_request}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={SalesReturns}
                    title={`Sales Returns`}
                    path={paths.sales_returns}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={StockReturns}
                    title={`Return Purchases`}
                    path={paths.stock_returns}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={CustomerCare}
                    title={`Customer Care`}
                    path={paths.customer_care}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={Delivery}
                    title={`Delivery`}
                    path={paths.delivery}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={StockMovement}
                    title={`Stock Movement`}
                    path={paths.stock_movement}
                />
                {/* <Route
                    path={paths.dashboardV1}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Dashboard | ${appName}`);
                        return <DashboardOne />;
                    }}
                />
                <Route
                    path={paths.dashboardV2}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Dashboard | ${appName}`);
                        return <DashboardTwo />;
                    }}
                />
                <Route
                    path={paths.newSell}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Dashboard | ${appName}`);
                        return <NewSell />;
                    }}
                />
                <Route
                    path={paths.newCart}
                    render={() => {
                    this.setTitle(`Cart | ${appName}`);
                    return <NewCart />;
                    }}
                />
                <Route
                    path={paths.newStock}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Dashboard | ${appName}`);
                        return <NewStock />;
                    }}
                />
                <Route
                    path={paths.firstView}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Dashboard | ${appName}`);
                        return <FirstView />;
                    }}
                /> */}
                <AuthenticatedRoute
                    exact={true}
                    component={CreditSales}
                    title={`Credit Sales`}
                    path={paths.credit_sales}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={OtherStock}
                    title={`Other Stock`}
                    path={paths.other_stock}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={OtherCart}
                    title={`Other Cart`}
                    path={paths.other_cart}
                />
                <AuthenticatedRoute
                    exact={true}
                    component={UnderConstruction}
                    title={`Under Construction`}
                    path={paths.under_construction}
                />
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Router>
        </div>
      </DatabaseProvider>
    );
  }
}

export class AuthenticatedRoute extends React.Component {
    constructor(props){
        super(props);
    }

    setTitle(title) {
        document.title = title;
    }

    render() {
        const appName = "El-Parah Retail App";

        this.setTitle(`${this.props.title} | ${appName}`);

        const Component = this.props.component;

        const isAuthenticated = LocalInfo.isAuthenticated;

        return isAuthenticated ? (
            <Component/>
        ) : (
            <Redirect to={{ pathname: paths.login}} />
        );
    }
}

export class PublicRoute extends React.Component {
    constructor(props){
        super(props);
    }

    setTitle(title) {
        document.title = title;
    }

    render() {
        const appName = "El-Parah Retail App";

        this.setTitle(`${this.props.title} | ${appName}`);

        const { from } = this.props.location.state || { from: { pathname: paths.dashboard }};

        const Component = this.props.component;

        const isAuthenticated = LocalInfo.isAuthenticated;

        return isAuthenticated ? (
            <Redirect to={from} />
        ) : (
            <Component/>
        );
    }
}

export default App;
