import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseUrl = environment.basePath;
  AdminBaseUrl = environment.AdminbasePath;
  constructor(public http: HttpClient) { }
  login(data: any) {
    return this.http.post(this.AdminBaseUrl + 'login', data);
  }
  updateStatus(user_id: number) {
    return this.http.post(this.AdminBaseUrl + 'update-user-status', { user_id: user_id });
  }
  // SupeR Admin Dashboard
  dashboardData() {
    return this.http.get(this.AdminBaseUrl + 'dashboard-data');
  }

  addServer(data: any) {
    return this.http.post(this.AdminBaseUrl + 'add-server', data);
  }

  updateServer(data: any) {
    return this.http.post(this.AdminBaseUrl + 'update-server', data);
  }

  getServers() {
    return this.http.get(this.AdminBaseUrl + 'get-servers');
  }

  deleteServer(serverId) {
    return this.http.post(this.AdminBaseUrl + 'delete-server', { server_id: serverId });
  }

  updateUser(data: any) {
    return this.http.post(this.AdminBaseUrl + 'edit-regaykar-user', data);
  }

  addAdminUser(data: any) {
    return this.http.post(this.AdminBaseUrl + 'add-admin-usr', data);
  }

  getAdminUsers() {
    return this.http.get(this.AdminBaseUrl + 'get-admin-usr');
  }


  deleteUser(id: number) {
    return this.http.delete(this.AdminBaseUrl + 'delete-regaykar-user/' + id);
  }

  addUser(data: any) {
    return this.http.post(this.AdminBaseUrl + 'add-regaykar-user', data);
  }

  getUserList() {
    return this.http.get(this.AdminBaseUrl + 'users-list');
  }

  logout() {
    return this.http.post(this.AdminBaseUrl + 'logout', '');
  }

  addSalesAgent(data: any) {
    return this.http.post(this.AdminBaseUrl + 'add-object', data);
  }

  editAdminUser(data: any) {
    return this.http.post(this.AdminBaseUrl + 'edit-admin-user', data);
  }

  deleteAdminUser(id: number) {
    return this.http.post(this.AdminBaseUrl + 'delete-admin-user', { id: id });
  }

  addGroup(data: any) {
    return this.http.post(this.AdminBaseUrl + 'create-group', data);
  }

  getSales(id: number) {
    return this.http.post(this.AdminBaseUrl + 'get-objects', { user_id: id });
  }

  updateSales(data) {
    return this.http.post(this.AdminBaseUrl + 'update-objects', data);
  }

  deleteSales(data) {
    return this.http.delete(this.AdminBaseUrl + 'delete-object/' + data);
  }

  getUserInfo(data) {
    return this.http.post(this.AdminBaseUrl + 'get-user-info', { user_id: data });
  }

  getSalesList() {
    return this.http.get(this.AdminBaseUrl + 'get-objects-list');
  }

  changePassword(data) {
    return this.http.post(this.AdminBaseUrl + 'change-password', data);
  }


  // Admin Api
  getAdminServers() {
    return this.http.get(this.AdminBaseUrl + 'get-admin-servers');
  }
  getAdminrRegaykarList() {
    return this.http.get(this.AdminBaseUrl + 'get-admin-regaykar-usrs');
  }
  getAdminrSalesList() {
    return this.http.get(this.AdminBaseUrl + 'get-admin-objects-list');
  }

  // MLM
  addProduct(data: any) {
    return this.http.post(this.AdminBaseUrl + 'add-product', data);
  }
  getProduct() {
    return this.http.get(this.AdminBaseUrl + 'get-product');
  }
  updateProduct(data) {
    return this.http.post(this.AdminBaseUrl + 'update-product', data);
  }
  deleteProduct(id: number) {
    return this.http.delete(this.AdminBaseUrl + 'delete-product/' + id);
  }
  // commission
  getCommissions() {
    return this.http.get(this.AdminBaseUrl + 'get-commissions');
  }
  // transaction
  getTransactions() {
    return this.http.get(this.AdminBaseUrl + 'get-transactions');
  }
  // payment
  getPayments() {
    return this.http.get(this.AdminBaseUrl + 'get-payments');
  }
  getWithdrawals() {
    return this.http.get(this.AdminBaseUrl + 'get-withdrawals');
  }
  updateWithdrawalsStatus(data) {
    return this.http.post(this.AdminBaseUrl + 'update-approved-staus', data);
  }
  updateWithdrawals(data) {
    return this.http.post(this.AdminBaseUrl + 'update-rejected-staus', data);
  }

  getmembersList() {
    return this.http.get(this.AdminBaseUrl + 'get-members-list');
  }
  updateBlock(user_id:number){
    return this.http.post(this.AdminBaseUrl + 'update-user-status', {user_id:user_id});
  }
  // updateBlock(user_id: number, is_active: number, is_block: number) {
  //   return this.http.post(this.AdminBaseUrl + 'update-user-status', {user_id: user_id,is_active: is_active,is_block: is_block});
  // }

  getAuth() {
    return this.http.get(this.AdminBaseUrl + 'auth');
  }
  getOrders() {
    return this.http.get(this.AdminBaseUrl + 'get-orders-list');
  }
  getTreeUser(User_ID) {
    return this.http.post(this.AdminBaseUrl + 'get-tree-usr', { user_id: User_ID });
  }
  UserDetails(data: any) {
    return this.http.post(this.AdminBaseUrl + 'user-details', { user: data });
  }

  // Earning Wallet
  getLevelIncome() {
    return this.http.get(this.AdminBaseUrl + 'level-income');
  }
  walletStatement() {
    return this.http.get(this.AdminBaseUrl + 'wallet-statement');
  }
  searchTreeUser(data:any){
    return this.http.post(this.AdminBaseUrl + 'search-tree-usr', {data: data});
  }
}
