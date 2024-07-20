import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/envronments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StyleSpotServiceService {
  isSellerlogedin = new BehaviorSubject<boolean>(false)

  constructor(private http :HttpClient, private router:Router) { }

  sellerSignup(data:object){
    console.log('---->>>hellow seller',data)
     this.http.post<any>(environment.apiEndpoint +'api/signupuser',data).subscribe(res=>{
      console.log('----->>>sign up res',res)
      if(res.status){
        // this.isSellerlogedin.next(true)
        localStorage.setItem('seller',JSON.stringify(res))
        // this.router.navigate(['seller-home'])
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
  }
}
