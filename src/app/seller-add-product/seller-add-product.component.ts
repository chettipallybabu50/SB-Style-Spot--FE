import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  Addproductform !:FormGroup
  user_id!: string | null;
  product_file: File | null = null;

  constructor(private fb:FormBuilder,private productservice:ProductService, private  toaster:ToastrService){

  }
  ngOnInit(){
    console.log('----userid',this.user_id)
    this.user_id = localStorage.getItem('user_id')
    this.Addproductform = this.fb.group({
      product_name:[''],
      product_price :[''],
      product_category:[''],
      product_color:[''],
      product_description:[''],
      product_file_path:['']
    })
    // this.productservice.getAllproduct().subscribe(res=>{
    //   console.log('=------>>all products',res)
    // })
  }

  Onfilechange(event: any){
    console.log('---->>>file',event.target.files)
    console.log('---->>>file name ',event.target.files[0].name)
    this.product_file = event.target.files[0]

  }

  submit(){
    console.log('---->>add product form',this.Addproductform.value)
    console.log('----->>product_name',this.Addproductform.value.product_name)
    const formData = new FormData();
    formData.append('product_name', this.Addproductform.value.product_name);
    formData.append('product_price', this.Addproductform.value.product_price);
    formData.append('product_category', this.Addproductform.value.product_category);
    formData.append('product_color', this.Addproductform.value.product_color);
    formData.append('product_description', this.Addproductform.value.product_description);
    formData.append('user_id', this.user_id as string);
    if(this.product_file){
      formData.append('product_file_path', this.product_file);
    }
    console.log('--------->>>formData',formData)
    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });

    this.productservice.addingProduct(formData).subscribe(res =>{
      console.log('---->>add product res',res)
      if(res){
        console.log('---->>> get all products working')
        this.toaster.success('Product added successfully')

      }
    })
  }

}
