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

  getStates(id: number) {
    return this.http.get(this.BaseUrl + 'get-state/' + id);
  }
  getCountry() {
    return this.http.get(this.BaseUrl + 'get-countries');
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

  getUsers() {
    return this.http.get(this.BaseUrl + 'get-usr');
  }
  updateUsers(data: any) {
    return this.http.post(this.BaseUrl + 'update-usr', data);
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

  // Tree View
  getTreeUser(User_ID) {
    return this.http.post(this.BaseUrl + 'get-tree-usr', {user_id: User_ID});
  }

  UserDetails(data: any){
    return this.http.post(this.BaseUrl + 'user-details', {user:data});
  }

  // Bank withdrawal
  SaveWithdrawal(data: any) {
    return this.http.post(this.BaseUrl + 'save-withdrawal', data);
  }

}
