import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import * as fromingresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<fromingresoEgreso.AppState>, public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe((ingresoEgreso) => {
      console.log(ingresoEgreso.items);
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    console.log(item.uid);
    this.ingresoEgresoService
      .borrarIngresoEgreso(item.uid)
      .then((result) => {
        // console.log(result);

        Swal.fire({
          title: 'Eliminado!',
          text: item.descripcion,
          type: 'success',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
}
