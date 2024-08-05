import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/envronments/environment';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['position','product_name','product_file_path', 'product_price', 'product_category','product_color', 'product_description','action'];
  dataSource = new MatTableDataSource<any>([])

  constructor(private ProductService : ProductService){}

  ngOnInit(){
    this.ProductService.getAllproduct().subscribe(res=>{
      console.log('---->>>>res the products', res)
      if(res.status){
        // let file_path = environment.apiEndpoint + res.data[5].product_file_path;
        // console.log('---->>>filepath',file_path)
        res.data.forEach((product: { product_file_path: string; }) => {
          product.product_file_path = environment.apiEndpoint +product.product_file_path;
          console.log('--->>product.product_file_path,', product.product_file_path)
        });
        this.dataSource = new MatTableDataSource(res.data)
        console.log('---->> data sourse',this.dataSource)

      }
    })
  }

}
