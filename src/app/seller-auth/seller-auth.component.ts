import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { StyleSpotServiceService } from '../style-spot-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  SignForm !: FormGroup
  public Signinform !: FormGroup
  signup=false
  signin_submitted = false;
  signUp_submitted = false
  // authError: String =''

  constructor(private fb:FormBuilder,private stylespotsevice :StyleSpotServiceService, private router:Router
    , private toaster: ToastrService
  ){

  }

  ngOnInit(): void {
    console.log('seller auth is coming')
    this.stylespotsevice.reloadSeller()
    this.SignForm = this.fb.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]],
      confirm_password : ['', [Validators.required]]

    })
    this.Signinform =this.fb.group({
      username : ['',[Validators.required]],
      password : ['', [Validators.required]],
    })
    
  }
  get login() {
    return this.Signinform.controls;
  }
  submit() {
    this.signUp_submitted = true
    console.log('----------->>>signform', this.SignForm.value)
    console.log('----------->>>signform', this.SignForm.controls)
    console.log('----------->new account of seller isvalid', this.SignForm.valid)
    if (this.SignForm.valid) {
      const data = {
        signupdata: this.SignForm.value
      }
      this.stylespotsevice.sellerSignup(data)
    }
  }


  signin() {
    this.signin_submitted = true
    console.log('----------->>>is valid', this.Signinform.valid)
    console.log('----------->>>signform', this.Signinform.value)
    console.log('----------->>>signform', this.Signinform.controls)
    if (this.Signinform.valid) {
      const data = this.Signinform.value
      this.stylespotsevice.sellerSigninaccount(data)
      this.stylespotsevice.isInvalidlogin.subscribe(isError => {
        console.log('--------->>>is error', isError)
        if (isError) {
          // this.authError ="Invalid Username or Password"
          this.toaster.error("Invalid Username or Password")

        }
        else {
          this.toaster.success("successfully logged in")
        }
      })
    }
  }

  newuser(){
    this.signup =false
  }

  olduser(){
    this.signup=true
  }

}
