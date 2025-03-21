import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserCookiesService {
  private secretKey = 'fsjkldhgs32434kghjghgalfjdqapfhdsfsdfs%%^%mzbvmghgahfhbantydjsdflafdhflaflhfgidfbadk';
  constructor(
    private cookieService: CookieService,
    public router:Router
  ) { }
  encrypt(message: any) {
    var cipherText = crypto.AES.encrypt(JSON.stringify(message), this.secretKey).toString();
    return cipherText;
  }
  decrypt(cipherText: string) {
    try {
    var message = crypto.AES.decrypt(cipherText, this.secretKey).toString(crypto.enc.Utf8);
    return message;
    } catch (error) {
      this.router.navigate(['/']);
    }
  }
  setCookie(key: string, value: any) {
    var cipherValue = this.encrypt(value);
    this.cookieService.set(key, cipherValue, 2.222083333333,'/');
  }
  /*forgot password more expire time set*/
  setForgotCookie(key: string, value: any) {
    var cipherValue = this.encrypt(value);
    this.cookieService.set(key, cipherValue, 9.99999999999);
  }
  getCookie(key: string): any {
    if (this.checkCookie(key)) {
      var cipherKeyValue = this.cookieService.get(key);
      var plainText = this.decrypt(cipherKeyValue);
      if (key == 'CurrentUser') {
        plainText = JSON.parse(plainText)
      }
      return plainText;
    } else {
      return;
    }
  }
  deleteCookie(key: string) {
    this.cookieService.delete(key);
  }
  deleteCookieAll() {
    const cookieName = 'CurrentUser';
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - 1);
    document.cookie = `${cookieName}=; expires=${expirationDate.toUTCString()}; path=/;`;
    this.cookieService.delete(cookieName);
  }
  checkCookie(key: string) {
    return this.cookieService.check(key);
  }

  updateCookie(key: string, updateKey: string, updateValue: any) {
    let existingCookie = this.cookieService.get(key);
      let decryptedValue = this.decrypt(existingCookie);
      let cookieObject = JSON.parse(decryptedValue || '{}');
  
      cookieObject[updateKey] = updateValue;
  
      let encryptedValue = this.encrypt(cookieObject);
      this.cookieService.set(key, encryptedValue, 2.222083333333, '/');
  }
  
}