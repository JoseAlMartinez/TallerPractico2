import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { importType } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


//  Service 
import { UsuarioService } from 'src/app/services/usuario.service';
// Class
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {

  usuarioList: Usuario[];
  x: number;
  n: number;

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public toastr: ToastrService,
    public usuarioService: UsuarioService,
    private firebase: AngularFireDatabase
  ) { }

  ngOnInit() {
    return this.usuarioService.getUsuario()
      .snapshotChanges().subscribe(item => {
        this.usuarioList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.usuarioList.push(x as Usuario);
        });
      });
  }
  

  async onRegister() {
    const {email, password } = this.registerForm.value;
    this.n = this.usuarioList.length;
    var res = 0;
    for (var i = 0; i < this.n; i++)
      if (this.x == this.usuarioList[i].dui)
        res++
    //console.log(res)
    //console.log(this.usuarioList.toString);

    const resultado = this.usuarioList.find(cosa => cosa.dui)
    console.log(resultado.dui);

    try {
      if (res <= 0) {
        const user = await this.authSvc.register(email, password);
        if (user) {
          this.usuarioService.insertUsuario(this.registerForm.value);
          this.router.navigate(['/home']);
        }
      }else{
        this.toastr.warning('Ya esta registrada una persona con este dui', 'Advertencia');
      }
    } catch (error) {
      console.log(error);     
    }
  }
}
