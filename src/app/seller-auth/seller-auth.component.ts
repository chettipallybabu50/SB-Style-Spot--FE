import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StyleSpotServiceService } from '../style-spot-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  SignForm !: FormGroup

  constructor(private fb:FormBuilder,private stylespotsevice :StyleSpotServiceService, private router:Router){

  }

  ngOnInit(): void {
    this.stylespotsevice.reloadSeller()
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
    this.stylespotsevice.sellerSignup(data)
  }

}
