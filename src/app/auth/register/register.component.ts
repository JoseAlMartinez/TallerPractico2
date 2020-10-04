import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { importType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''), 
    });

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {}

  async onRegister(){
    const { email, password } = this.registerForm.value;
    try { 
      const user = await this.authSvc.register(email,password);

      if(user){
        this.router.navigate(['/home']);
      }
     }
      catch(error){
        console.log(error);
      }
  }

}
