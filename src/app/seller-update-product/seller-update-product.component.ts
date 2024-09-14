import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { environment } from 'src/envronments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productId: string |null =null
  Updateproductform !:FormGroup
  product_file: File | null = null;
  user_id!: string | null;
  Products_data = [];
  product_path : string | undefined
  product_path_url = "";

  constructor(private activroute: ActivatedRoute, private fb:FormBuilder, private productservice:ProductService,private toaster:ToastrService){}

  ngOnInit(){
    this.user_id = localStorage.getItem('user_id')
    this.productId = this.activroute.snapshot.paramMap.get('id');
    if(this.productId){
      this.getproductByid()

    }
    console.log('---->>>update product id ',this.productId)

    this.Updateproductform = this.fb.group({
      product_name:[''],
      product_price :[''],
      product_category:[''],
      product_color:[''],
      product_description:[''],
      product_file_path:['']
    })

  }

  Onfilechange(event: any){
    console.log('---->>>file',event.target.files)
    console.log('---->>>file name ',event.target.files[0].name)
    let [file] = event.target.files;
    console.log('-------->>>file', file)
    this.product_path = event.target.files[0].name
    this.product_file = event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      this.product_path_url = reader.result as string;
      console.log('---------->>product_path_url', this.product_path_url)

    }
  }

  getproductByid(){
     const data ={
      product_id : this.productId,
      user_id : this.user_id
     }
     console.log('---->>>data',data)
     this.productservice.getproductbyId(data).subscribe(res=>{
      console.log('---->>>get pro by id result', res)
      if(res.status){
        this.Products_data = res
        console.log('----------->>>this.Products_data', this.Products_data)
        this.product_path =  res.data.product_file_path
        this.Updateproductform.patchValue({
          product_name :res.data.product_name,
          product_price : res.data.product_price,
          product_category : res.data.product_category,
          product_color : res.data.product_color,
          product_description: res.data.product_description,
          product_file_path:res.data.product_file_path
        })
        if(this.product_path){
          this.product_path_url = environment.apiEndpoint +res.data.product_file_path;

        }

      }
     })
  }

  clearimage(){
    console.log('clear the product')
    this.product_path =''
    this.product_path_url = ''
  }
  

  aadharCardTrigger() {
    let element = document.getElementById('aadhar_upload_file') as HTMLInputElement;
    element.click();
  }

  submit(){
    console.log('------->>Updateproductform', this.Updateproductform.value)
    const formData = new FormData();
    formData.append('product_name', this.Updateproductform.value.product_name);
    formData.append('product_price', this.Updateproductform.value.product_price);
    formData.append('product_category', this.Updateproductform.value.product_category);
    formData.append('product_color', this.Updateproductform.value.product_color);
    formData.append('product_description', this.Updateproductform.value.product_description);
    formData.append('user_id', this.user_id as string);
    formData.append('product_id', this.productId as string)
    if(this.product_file){
      formData.append('product_file_path', this.product_file);
    }
    console.log('---->>>update product_file',this.product_file)
    // the below line is to check data in the formData
    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });
    this.productservice.updateProduct(formData).subscribe(res =>{
      console.log('---->>>update product result', res)
      if(res.status){
        this.toaster.success('Product Details updated successfully')

      }
    })

  }

}
