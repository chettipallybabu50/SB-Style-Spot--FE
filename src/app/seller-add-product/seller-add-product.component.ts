import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  Addproductform !:FormGroup

  constructor(private fb:FormBuilder){

  }
  ngOnInit(){
    this.Addproductform = this.fb.group({
      product_name:[''],
      product_price :[''],
      product_category:[''],
      product_color:[''],
      product_description:[''],
    })
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
    console.log('--------->>>formData',formData)
    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });
  }

}
