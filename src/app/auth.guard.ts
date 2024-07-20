import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StyleSpotServiceService } from './style-spot-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private stylespotservice:StyleSpotServiceService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('seller')){
      return true
    }
    return this.stylespotservice.isSellerlogedin;
  }
}
