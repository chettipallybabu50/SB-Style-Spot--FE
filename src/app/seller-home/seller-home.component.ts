import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/envronments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['position','product_name','product_file_path', 'product_price', 'product_category','product_color', 'product_description','action'];
  dataSource = new MatTableDataSource<any>([])

  constructor(private ProductService : ProductService, private toaster: ToastrService, private router:Router){}

  ngOnInit(){
    this.ProductService.getAllproduct().subscribe(res=>{
      console.log('---->>>>res the products', res)
      // console.log('---->>>>res.data.length', res.data.length)
      if(res.status){
        res.data.forEach((product: { product_file_path: string; }) => {
          product.product_file_path = environment.apiEndpoint +product.product_file_path;
          console.log('--->>product.product_file_path,', product.product_file_path)
        });
        this.dataSource = new MatTableDataSource(res.data)
        console.log('---->> data sourse',this.dataSource)
        console.log('---->> data sourse.length',this.dataSource.filteredData.length)
      }
      else{
        this.dataSource = new MatTableDataSource<any>([]);
        console.log('---->>> this.dataSource',this.dataSource)
      }
    })
  }

  deleteproduct(element: any){
    console.log('---->>delete product',element)
  let data =  {
      product_id:element.product_id,
      user_id:element. user_id
    }
    console.log('---->>>>data',data)
    this.ProductService.deleteProduct(data).subscribe(res=>{
      console.log('----->>>delete res',res)
      if(res.status){
        this.toaster.success(res.message)
        this.ngOnInit()
      }
      // else{
      //   this.toaster.error(res.message)
      // }
    })
  }

  updateprodctt(element: any){
    console.log('-------->>>update product data',element)
    this.router.navigate(['seller-update-product',element.product_id])
  }

}
