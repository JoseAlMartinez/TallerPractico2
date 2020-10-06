import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { CompraComponent } from 'src/app/components/compra/compra.component';
import { Home2Component } from 'src/app/home2/home2.component';




const routes: Routes = [
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  {path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  {path: 'products', component: ProductsComponent}, //ruta para crud producto
  {path: 'compras', component: CompraComponent}, //Ruta para compra
  {path: 'home2', component: Home2Component}, //Ruta para homeAdmin
  {path:'', redirectTo:'/home', pathMatch:'full',},
  {path: '**', pathMatch: 'full', redirectTo: 'home'} //cualquier ruta escrita que no este definida aqui, lo manda para home 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
