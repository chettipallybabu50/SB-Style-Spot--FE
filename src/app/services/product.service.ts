import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/envronments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addingProduct(data:object){
    return this.http.post<any>(environment.apiEndpoint +'api/add-product',data)
  }
  
  getAllproduct(){
    console.log('---->>>coming to getprouct')
    return this.http.get<any>(environment.apiEndpoint +'api/getAllproducts')
  }
}
