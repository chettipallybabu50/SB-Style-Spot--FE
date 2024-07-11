import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StyleSpotServiceService } from '../style-spot-service.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  SignForm !: FormGroup

  constructor(private fb:FormBuilder,private stylespotsevice :StyleSpotServiceService){

  }

  ngOnInit(): void {
    this.SignForm = this.fb.group({
      username : [''],
      password : [''],
      confirm_password : ['']

    })
    
  }
  submit(){
    console.log('----------->>>signform',this.SignForm.value)
    const data ={
      signupdata :this.SignForm.value
    }
    this.stylespotsevice.sellerSignup(data).subscribe(res=>{

    })
    //.subscribe(res=>{
      //console.log('---------->>>res', res)

    //});

  }

}
