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

  ngOnInit(): void {
  }
async onLogin(){
  //console.log('Form->', this.loginForm.value);
  const { email, password } = this.loginForm.value;
  try{
    //this.authSvc.login(email, password);
    const user = await this.authSvc.login(email, password);
    if(user){
      this.router.navigate(['/home']);
    }
  
  }
    catch(error){console.log(error)}
  
}

}
