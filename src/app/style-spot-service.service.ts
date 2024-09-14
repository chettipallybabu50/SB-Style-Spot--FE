import { EventEmitter, Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/envronments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StyleSpotServiceService {
  isSellerlogedin = new BehaviorSubject<boolean>(false)
  isInvalidlogin = new EventEmitter<boolean>(false)

  constructor(private http :HttpClient, private router:Router) { }

  sellerSignup(data:object){
    console.log('---->>>hellow seller',data)
     this.http.post<any>(environment.apiEndpoint +'api/signupuser',data).subscribe(res=>{
      console.log('----->>>sign up res',res)
      console.log('----->>>sign up res',res.data.user_id)
      if(res.status){
        // this.isSellerlogedin.next(true)
        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('seller',JSON.stringify(res))
        // this.router.navigate(['seller-home'])
        this.reloadSeller()
      }
     })

    // ---->>> we can also write like below commented line both are correct 

    //return this.http.post<any>(`${environment.apiEndpoint}api/signinuser`, data)
    

  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerlogedin.next(true)
      this.router.navigate(['seller-home'])

    }
    if(localStorage.getItem('sellerLogin')){
      console.log('---->>login details getting')
      this.isSellerlogedin.next(true)
      this.router.navigate(['seller-home'])

    }
  }

  sellerSigninaccount(data:any){
    console.log('---->>>login user details',data)
    this.http.post<any>(environment.apiEndpoint +'api/signinuser',data).subscribe(res=>{
      console.log('---------->>>sigin in 50 res',res)
      if(res.status){
        console.log('------->>>seller logged in successfully')
        this.isInvalidlogin.emit(false)
        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('sellerLogin',JSON.stringify(res))
        // this.isSellerlogedin.next(true)
        // this.router.navigate(['seller-home'])
        this.reloadSeller()
      }
      else{
        console.log('invalid username or password')
        this.isInvalidlogin.emit(true)
      }

    })

  }
}
