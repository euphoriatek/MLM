import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseUrl = environment.basePath;
  constructor(public http:HttpClient) { }
  login(data:any){
    return this.http.post(this.BaseUrl + 'login', data);
  }

  addUsers(data: any) {
    return this.http.post(this.BaseUrl + 'signup', data);
  }
  
  getStates(id:number) {
    return this.http.get(this.BaseUrl + 'get-state/' + id);
  }
  getCountry() {
    return this.http.get(this.BaseUrl + 'get-countries');
  }

  validateWithSponsor(id:number){
    return this.http.post(this.BaseUrl + 'validate-sponsor', {"SponsorID":id});
  }

  GenerateOTP(data:any){
    return this.http.post(this.BaseUrl + 'generate-otp', data);
  }

  checkMobile(data:any){
    return this.http.post(this.BaseUrl + 'validate-mobile', {"mobile_number":data });
  }

  getAuth(){
    return this.http.get(this.BaseUrl + 'auth');
  }

  CreateKyc(data:any){
    return this.http.post(this.BaseUrl + 'create-kyc', data);
  }

  ValidateIFSC(data:any){
    return this.http.post(this.BaseUrl + 'validate-Ifsc', {"ifsc":data });
  }
  
  CreatePanKyc(data:any){
    return this.http.post(this.BaseUrl + 'create-kyc-pan', data);
  }

  getProductUser() {
    return this.http.get(this.BaseUrl + 'get-product-usr');
  }

  PurchaseProduct(data: any) {
    return this.http.post(this.BaseUrl + 'purchase-product', data);
  }
  
  getTreeUser() {
    return this.http.get(this.BaseUrl + 'get-tree-usr');
  }

  getExistingPanKyc(){
    return this.http.get(this.BaseUrl + 'pan-kyc');
  }

  getExistingBnkKyc(){
    return this.http.get(this.BaseUrl + 'bank-kyc');
  }

  CreateDeliveryAddress(data: any) {
    return this.http.post(this.BaseUrl + 'create-delievery-address', data);
  }
  
  
}
