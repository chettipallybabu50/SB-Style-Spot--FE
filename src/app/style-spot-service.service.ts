import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/envronments/environment';

@Injectable({
  providedIn: 'root'
})
export class StyleSpotServiceService {

  constructor(private http :HttpClient) { }

  sellerSignup(data:object){
    console.log('---->>>hellow seller',data)
    return this.http.post<any>(environment.apiEndpoint +'api/signupuser',data)

    // ---->>> we can also write like below commented line both are correct 

    //return this.http.post<any>(`${environment.apiEndpoint}api/signinuser`, data)
    

  }
}
