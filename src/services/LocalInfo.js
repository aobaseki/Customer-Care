import isSameDay from "date-fns/isSameDay";
import format from "date-fns/format";

export default class LocalInfo {
  static get keys() {
    return {
      userId: "user_id",
      storeName: "storeName",
      storeId: "storeId",
      userRole: "user_role",
      username: "username",
      accessToken: "accessToken",
      branchId: "activeBranch",
      userAccess: "userData",
      lastSyncedAt: "lastSyncedAt",
      branches: "branches",
      companyId: "companyId",
      company: "company",
      workingDate: "workingDate",
      branch: "branch",
      userFullName: "userFullName",
      checkoutSales: "checkoutSalesSettings",
      aggregateSales: "aggregateSalesSettings",
      isAuthenticated: "isAuthenticated",
    };
  }

  static get userAccess() {
    return localStorage.getItem(this.keys.userAccess) || null;
  }

  static get isAuthenticated() {
      return !!this.userAccess;
  }

  static get branch() {
    return this.branches.find(branch => branch.id === this.branchId);
  }

  static get userFullName() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    return `${userDetails.firstName} ${userDetails.otherNames}`;
  }

  static get workingDate() {
    const newDate = localStorage.getItem(this.keys.workingDate) || new Date();

    if(isSameDay(new Date(newDate) , new Date())){
      return new Date();
    }else{
      const testDate = localStorage.getItem(this.keys.workingDate);
      return `${new Date(`${format(new Date(testDate), 'eee MMM dd yyyy')} ${format(new Date() , 'hh:mm:ss xxxx')}`)}`;
    }
  }

  static get userId() {
    return JSON.parse(localStorage.getItem('userDetails')).userId;
    //return localStorage.getItem(this.keys.userId);
  }

  static get checkoutSales() {
      return localStorage.getItem('branchSettings') ? JSON.parse(localStorage.getItem('branchSettings')).checkoutSales || false: false;
  }

  static get aggregateSales() {
      return localStorage.getItem('branchSettings') ? JSON.parse(localStorage.getItem('branchSettings')).aggregateSales || false : false;
  }

  static get companyId() {
    return localStorage.getItem(this.keys.companyId);
  }

  static get company() {
    if (this.userAccess) {
      return JSON.parse(this.userAccess).companies
        .find(company => company.id.localeCompare(this.companyId) || company.id === this.companyId);
    }
    return null;
  }

  static get username() {
      //alert(this.keys.username);
      return localStorage.getItem(this.keys.username);
  }

  static set lastSyncedAt(datetime) {
    localStorage.setItem(this.keys.lastSyncedAt, datetime);
  }

  static branchSettings(event) {
    console.log(event.target.name , event.target.value)
      let settings = localStorage.getItem('branchSettings') ? JSON.parse(localStorage.getItem('branchSettings')) || {}: {};

      settings = ({...settings, [event.target.name]: event.target.checked });

      localStorage.setItem("branchSettings", JSON.stringify(settings));
  }

  static get lastSyncedAt() {
    return localStorage.getItem(this.keys.lastSyncedAt);
  }

  static get storeName() {
    return localStorage.getItem(this.keys.storeName);
  }

  static get branches() {
    if (this.company) {
        return this.company.branches;
    }
    return [];
  }

  static get storeId() {
    return localStorage.getItem(this.keys.storeId);
  }

  static get branchId() {
      return localStorage.getItem(this.keys.branchId);
  }

  static get companyRole() {
      return this.company.role;
      //return localStorage.getItem(this.keys.userRole);
  }

  static get branchRole() {
    if(this.branch){
        return this.branch.role;
    }
    return null;
  }

  static get companyPermissions() {
    return this.company.permissions;
  }

  static get branchPermissions() {
    return this.branch.permission;
  }

  static get accessToken() {
      return localStorage.getItem(this.keys.accessToken);
  }

  static setUserId(userId) {
    localStorage.setItem(this.keys.userId, userId);
  }

  static setUsername(username) {
      localStorage.setItem(this.keys.username, username);
  }

  static setStoreName(storeName) {
    localStorage.setItem(this.keys.storeName, storeName);
  }

  static setWorkingDate(workingDate) {
    localStorage.setItem(this.keys.workingDate, workingDate);
  }

  static setStoreId(storeId) {
    localStorage.setItem(this.keys.storeId, storeId);
  }

  static set branchId(branchId) {
      localStorage.setItem(this.keys.branchId, branchId);
  }

  static setUserRole(role) {
    localStorage.setItem(this.keys.userRole, role);
  }

  static setAccessToken(accessToken) {
      localStorage.setItem(this.keys.accessToken, accessToken);
  }

  static setSession(user, store, userStore , token) {
    this.setStoreId(store.id);
    this.setBranchId(store.id);
    this.setStoreName(store.name);
    this.setUserId(user.id);
    this.setUserRole(userStore.role);
    this.setUsername(user.username);
  }

  static sessionExists() {
    return (
      this.userId !== null &&
      this.storeId !== null &&
      this.storeName !== null &&
      this.userRole !== null
    );
  }

  static logout() {
    localStorage.removeItem(this.keys.storeId);
    localStorage.removeItem(this.keys.storeName);
    localStorage.removeItem(this.keys.userId);
    localStorage.removeItem(this.keys.userRole);
    localStorage.removeItem(this.keys.username);
    localStorage.removeItem(this.keys.accessToken);
    localStorage.removeItem(this.keys.branchId);
    localStorage.removeItem(this.keys.companyId);
    localStorage.removeItem(this.keys.workingDate);
    window.location.href = "/";
  }
}
