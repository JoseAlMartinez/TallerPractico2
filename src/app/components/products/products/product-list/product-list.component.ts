import { Component, OnInit } from '@angular/core';

// model
import { Product } from 'src/app/models/product';

// service
import { ProductService } from 'src/app/services/product.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  // Arreglo para almacenar la informacion que se obtenga de la base de datos de firebase
  productList: Product[];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  /* 
 Recibe una varible de tipo 'Product' para invocar el servicio de firebase, para actualizarlo
 Para no ocupar el doble enlace de datos ' [(ngModel)]' , se va utilizar 'Object.assign({}, product)'  
*/
  onEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  /* 
   Recibe la llave '$key' para eliminar el registro, invocando el metodo 'deleteProduct' del servicio de firebase
   ademas muestra un 'warning' con toastr
  */
  onDelete($key: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct($key);
      this.toastr.warning('Deleted Successfully', 'Product Removed');
    }
  }

}
