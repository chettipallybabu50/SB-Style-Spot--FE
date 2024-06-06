import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  SignForm !: FormGroup

  constructor(private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.SignForm = this.fb.group({
      usernane : [''],
      password : [''],
      confirm_password : ['']

    })
    
  }
  submit(){
    console.log('----------->>>signform',this.SignForm.value)

  }

}
