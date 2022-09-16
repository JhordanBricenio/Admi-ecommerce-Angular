import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:any={};

  constructor() {
   }

  ngOnInit(): void {
  }

  login(loginForm:any){
    console.log(this.user);
    if(loginForm.valid){
      alert('Es valido');
    }else {
      iziToast.show({
        title:'Error',
        titleColor:'#FF0000',
        class:'text-danger',
        position:'topRight',
        message:'Los datos no son valido'
      });
    }

  }

}
