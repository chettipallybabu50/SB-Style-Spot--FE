import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userType :String ='default'

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe((res:any)=>{
      if(res.url){
        console.log('---->>>is router url',res.url)
        if((localStorage.getItem('seller') || localStorage.getItem('sellerLogin') ) && res.url.includes('seller')){
          console.log('------>>>>you are in inside seller area')
          this.userType ='seller'
        }
        else{
          console.log('------>>>outside seller area')
          this.userType ='default'
        }
      }
    })
  }

}
