import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { environment } from 'src/envronments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [];
  trendyproducts: any[]=[];
  constructor(private productservice: ProductService){

  }
  ngOnInit(){
    this.productservice.getAllproduct().subscribe(res => {
      console.log('----->>>taking the products to home page', res)
      res.data.forEach((product: { product_file_path: string; }) => {
        product.product_file_path = environment.apiEndpoint + product.product_file_path;
        console.log('--->>product.product_file_path,', product.product_file_path)
      });
      this.products = res.data.slice(0, 5)
      this.trendyproducts = res.data
      console.log('------->>>this.products ', this.products)
    })
  }

}
