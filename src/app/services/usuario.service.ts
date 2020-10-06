import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    // Traer los datos de firebase
    usuarioList: AngularFireList<any>;

    // Una variable temporal, para guardar los datos seleccionados, del tipo Product
    selectedUsuario: Usuario = new Usuario();
  
    constructor(private firebase: AngularFireDatabase) { }
  
    // Traer todos los productos desde firebase 
    getUsuario() { // guarda los elementos en la varible 'products'
      return this.usuarioList = this.firebase.list('usuario');
    }

    insertUsuario(usuario: Usuario) {
      console.log(usuario)
      this.usuarioList = this.firebase.list('/usuario');
      if(usuario){
        this.usuarioList.push({
          nombre: usuario.nombre,
          dui: usuario.dui,
          email: usuario.email,
          password: usuario.password
        });
      }
    }
}
