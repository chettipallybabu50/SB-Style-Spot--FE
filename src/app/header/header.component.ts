import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userType :string ='default'
  user_name :string =''

  constructor(private router:Router){}

  ngOnInit(){
    // if(localStorage.getItem('sellerLogin')){
    //   let sellerstorage = localStorage.getItem('sellerLogin')
    //   let sellerdata = sellerstorage &&JSON.parse(sellerstorage)
    //   console.log('---->>sellerdata', sellerdata)

    // }
    this.router.events.subscribe((res:any)=>{
      if(res.url){
        console.log('---->>>is router url',res.url)
        if(localStorage.getItem('seller')  && res.url.includes('seller')){
          console.log('------>>>>you are in inside seller area when seller sign up')
          this.userType ='seller'
        }
        else if(localStorage.getItem('sellerLogin') && res.url.includes('seller')){
          console.log('----->>>you are in inside seller area it will run when seller login')
          this.userType ='seller'
          let sellerstorage = localStorage.getItem('sellerLogin')
          let sellerdata = sellerstorage &&JSON.parse(sellerstorage)
          console.log('---->>sellerdata', sellerdata)
          console.log('---->>username', sellerdata.data.username)
          this.user_name = sellerdata.data.username

        }
        else{
          console.log('------>>>outside seller area')
          this.userType ='default'
        }
      }
    })
  }

  logout(){
    console.log('----->>>logout seller')
    localStorage.removeItem('seller')
    localStorage.removeItem('sellerLogin')
    this.router.navigate(['/'])
  }

}
