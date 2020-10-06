import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';

// model
import { Product } from 'src/app/models/product';
import { Usuario } from 'src/app/models/usuario'

// service
import { ProductService } from 'src/app/services/product.service';
import { UsuarioService } from 'src/app/services/usuario.service';

// toastr
import { ToastrService } from 'ngx-toastr';
import { CompraService } from 'src/app/services/compra.service';
import { element } from 'protractor';
import { Compra } from 'src/app/models/compra';
import { stringify } from 'querystring';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss'],
  providers: [AuthService]
})

export class CompraComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;
  registro = [];
  productList: Product[];
  compraList: Compra[];
  calcularDescuentro: number;
  desTotal: number;
  Des: string;
  contador: number;
  opcionSeleccionado: string;
  unidades = [];
  n: number;
  dui: number;
  displayedColumns: string[] = ['Nombre', 'Dui', 'Codigo', 'Descripcion', 'Tipo Descuento', 'Precio', 'precio con Descuento'];


  constructor(
    private productService: ProductService,
    private usuarioService: UsuarioService,
    private authSvc: AuthService,
    public compraService: CompraService,
    private router: Router
  ) { }

  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
          this.ngInicio();
          this.ngCompra();
        });
      });
  }

  ngCompra() {
    return this.compraService.getCompra()
      .snapshotChanges().subscribe(item => {
        this.compraList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.compraList.push(x as Compra);
        });
      });
  }

  ngInicio() {
    for (var i = 0; i < this.productList.length; i++)
      var resultado = this.productList[i].name;
    this.opcionSeleccionado = "Selecciona"
    this.unidades.push(resultado);
    console.log(resultado)
  }

  onSubmit(compraForm: NgForm) {
    var res = 0;
    const found = this.productList.find(element => element.name === this.opcionSeleccionado);
    compraForm.value.codigo = found.category;
    compraForm.value.descripcion = found.descripcion;
    compraForm.value.precio = found.price;

    for (var i = 0; i < this.compraList.length; i++)
      if (compraForm.value.dui == this.compraList[i].dui)
        res++
    console.log(res);

    if (res <= 0) {
      console.log(found.price)
      this.Des = "No aplica descuento";
      compraForm.value.tipoDescuento = this.Des;
      this.calcularDescuentro = 0;
      this.desTotal = found.price - this.calcularDescuentro;
      compraForm.value.precioDescuento = this.desTotal;
      this.compraService.insertCompra(compraForm.value);
      //this.contador++;
    } else if (res > 0 && res < 4) {
      console.log(found.price)
      this.Des = "Aplica descuento 5%";
      compraForm.value.tipoDescuento = this.Des;
      this.calcularDescuentro = found.price * 0.05;
      this.desTotal = found.price - this.calcularDescuentro;
      compraForm.value.precioDescuento = this.desTotal;
      this.compraService.insertCompra(compraForm.value);
    } else {
      console.log(found.price)
      this.Des = "Aplica descuento 8%";
      compraForm.value.tipoDescuento = this.Des;
      this.calcularDescuentro = found.price * 0.08;
      this.desTotal = found.price - this.calcularDescuentro;
      compraForm.value.precioDescuento = this.desTotal;
      this.compraService.insertCompra(compraForm.value);
    }
  }
}
