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
}
