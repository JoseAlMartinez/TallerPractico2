import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService],
})

export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

  constructor(private authSvc:AuthService, private router: Router) { }
  log_google(){
    try{this.authSvc.login_google();}
    catch(error){console.log(error)}
    this.router.navigate(['home']);
    
  }
  ngOnInit(): void {
  }
async onLogin(){
  const { email, password } = this.loginForm.value;
  try{
    const user = await this.authSvc.login(email, password);
    if(user.user.email == "joseamartinezb96@gmail.com" || "guadalupe@hotmail.com" || "reyalexmendoza@gmail.com"){
      this.router.navigate(['/products']);
    }
  
  }
    catch(error){console.log(error)}
  
}

}
