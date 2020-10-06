import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  // Traer los datos de firebase
  compraList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados, del tipo Product
  selectedCompra: Compra = new Compra();

  constructor(private firebase: AngularFireDatabase) { }

  getCompra() { // guarda los elementos en la varible 'products'
  return this.compraList = this.firebase.list('compra');
}

insertCompra(compra: Compra) {
  console.log(compra)
  this.compraList = this.firebase.list('/compra');
  if(compra){
    this.compraList.push({
      codigo: compra.codigo,
      nombre: compra.nombre,
      dui: compra.dui,
      descripcion: compra.descripcion,
      tipoDescuento: compra.tipoDescuento,
      precio: compra.precio,
      precioDescuento: compra.precioDescuento
    });
  }
}

}
