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
  updateProduct(data:object){
    return this.http.patch<any>(environment.apiEndpoint +'api/Update-Product',data)
  }
  
  getAllproduct(){
    console.log('---->>>coming to getprouct')
    return this.http.get<any>(environment.apiEndpoint +'api/getAllproducts')
  }

  deleteProduct(data: any){
    console.log('---->>> servece delete', data.product_id)
    const params = new HttpParams()
    .set('product_id', data.product_id)
    .set('user_id', data.user_id);
    return this.http.delete<any>(environment.apiEndpoint +'api/delete-product',{params})

  }
  getproductbyId(data:any){
    console.log('---->>> servece update', data.product_id)
    const params = new HttpParams()
    .set('product_id', data.product_id)
    .set('user_id', data.user_id);
    console.log('---->>>params', params)
    return this.http.get<any>(environment.apiEndpoint +'api/get-product-By-id',{params})

  }
}
