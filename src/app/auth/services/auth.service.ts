import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
//import { auth } from 'firebase/app';
//import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { ToastrService } from 'ngx-toastr';
@Injectable(/*{
  providedIn: 'root'
}*/)
export class AuthService {
//public user: User;
  constructor(public afAuth: AngularFireAuth, public toastr: ToastrService) { }
async login_google(){
  try{return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());}
  catch(error){console.log(error)}
}
async login(email: string, password: string){
  try{
  const result = await this.afAuth.signInWithEmailAndPassword(email, password);
  this.toastr.success('Inicio de session satisfactorio', "Login");
  return result;
  }
  catch(error){
    this.toastr.error('Error grave', error);
  }
}
async register(email: string, password:string){
  
  try{
  const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
  this.toastr.success('Registro completo', "Registro");
  return result;
  }
  catch(error){
    this.toastr.error('Error grave', error);
  }
}
async logout(){
  try{
  await this.afAuth.signOut();
  this.toastr.success('Inicio de session satisfactorio', "Login");
  }
  catch(error){
    console.log(error); 
  }
}
getCurrentUser(){
  return this.afAuth.authState.pipe(first()).toPromise(); 
}

}
