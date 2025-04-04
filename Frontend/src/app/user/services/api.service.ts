import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseUrl = environment.basePath;
  constructor(public http: HttpClient) { }
  login(data: any) {
    return this.http.post(this.BaseUrl + 'login', data);
  }

  addUsers(data: any) {
    return this.http.post(this.BaseUrl + 'signup', data);
  }

  getCountry() {
    return this.http.get(this.BaseUrl + 'get-countries');
  }

  getStates() {
    return this.http.get(this.BaseUrl + 'get-state');
  }
  getCities(id: number){
    return this.http.get(this.BaseUrl + 'get-cities/' + id);

  }
 
  validateWithSponsor(id: number) {
    return this.http.post(this.BaseUrl + 'validate-sponsor', { "SponsorID": id });
  }

  GenerateOTP(data: any) {
    return this.http.post(this.BaseUrl + 'generate-otp', data);
  }

  verifyOTP(data:any){
    return this.http.post(this.BaseUrl + 'verify-otp', {otp:data});
  }
  checkMobile(data: any) {
    return this.http.post(this.BaseUrl + 'validate-mobile', { "mobile_number": data });
  }

  getAuth() {
    return this.http.get(this.BaseUrl + 'auth');
  }

  CreateKyc(data: any) {
    return this.http.post(this.BaseUrl + 'create-kyc', data);
  }

  ValidateIFSC(data: any) {
    return this.http.post(this.BaseUrl + 'validate-Ifsc', { "ifsc": data });
  }

  CreatePanKyc(data: any) {
    return this.http.post(this.BaseUrl + 'create-kyc-pan', data);
  }

  getUser() {
    return this.http.get(this.BaseUrl + 'get-user');
  }

  updateProfile(data: any) {
    return this.http.post(this.BaseUrl + 'update-profile', data);
  }
  getExistingPanKyc() {
    return this.http.get(this.BaseUrl + 'pan-kyc');
  }

  getExistingBnkKyc() {
    return this.http.get(this.BaseUrl + 'bank-kyc');
  }

  CreateDeliveryAddress(data: any) {
    return this.http.post(this.BaseUrl + 'create-delievery-address', data);
  }

  savePaymentDetails(paymentData: any) {
    return this.http.post(this.BaseUrl + 'save-payment-details', paymentData);
  }

  
  verifyOldPassword(oldPassword: string) {
    return this.http.post(this.BaseUrl + 'verify-old-password', oldPassword);
  }

  getLoginHistory(fromDate?: string, toDate?: string) {
    let params: any = {};
    if (fromDate) params.from_date = fromDate;
    if (toDate) params.to_date = toDate;
    return this.http.get(this.BaseUrl + 'get-login-history', { params });
  }
  
  // Kyc
  getUserKyc() {
    return this.http.get(this.BaseUrl + 'user-kyc-info');
  }
  
  // Activation
  getProduct() {
    return this.http.get(this.BaseUrl + 'get-product');
  }

  checkActivation() { 
    return this.http.get(this.BaseUrl + 'check-activation');
  }

  checkOutActivation(data: any) {
    return this.http.post(this.BaseUrl + 'checkout-activation', data);
  }
  // My Community
  // Tree View
  getTreeUser(User_ID) {
    return this.http.post(this.BaseUrl + 'get-tree-usr', {user_id: User_ID});
  }
  searchTreeUser(data:any){
    return this.http.post(this.BaseUrl + 'search-tree-usr', {data: data});
  }
  // Direct-referral-list
  getReferralUsers(){
    return this.http.get(this.BaseUrl + 'get-referral');
  }
  // Downline-users-list
  getDownlineUsers(){
    return this.http.get(this.BaseUrl + 'get-downline');
  }
  UserDetails(data: any){
    return this.http.post(this.BaseUrl + 'user-details', {user:data});
  }
  // Earning Wallet
  getLevelIncome(){
    return this.http.get(this.BaseUrl + 'level-income');
  }
  walletStatement(){
    return this.http.get(this.BaseUrl + 'wallet-statement');
  }
  getWithdrawalsHistory(){
    return this.http.get(this.BaseUrl + 'withdrawals-history');
  }
  // Bank withdrawal
  SaveWithdrawal(data: any) {
    return this.http.post(this.BaseUrl + 'save-withdrawal', data);
  }
  //mlmLevels
  getProfitLevel() {
    return this.http.get(this.BaseUrl + 'mlm-levels');
  }
  // Forgot Password
  sendOtp(data: any) {
    return this.http.post(this.BaseUrl + 'send-otp', data);
  }
  updatePassword(data:any){
    return this.http.post(this.BaseUrl + 'update-password',data);
  }
  // Track-Your-Order
  getOrder(){
    return this.http.get(this.BaseUrl + 'get-order');
  }
}
