import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingActions, DesactivarLoadingActions } from '../shared/ui.actions';
import * as fromingresoEgreso from './ingreso-egreso.reducer';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html', 
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubcription: Subscription = new Subscription();
  cargando: boolean;

  constructor(public ingresoEgresoService: IngresoEgresoService, private store: Store<fromingresoEgreso.AppState>) { }

  ngOnInit() {
    this.loadingSubcription = this.store.select('ui').subscribe((ui) => (this.cargando = ui.isLoading));

    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSubcription.unsubscribe();
  }

  crearIngresoEgreso() {

    this.store.dispatch(new ActivarLoadingActions());

    const ingresoEgreso = new IngresoEgreso({
      ...this.forma.value,
      tipo: this.tipo
    });

    console.log(ingresoEgreso);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      this.store.dispatch( new DesactivarLoadingActions());
      Swal.fire({
        title: 'Creado!',
        text: ingresoEgreso.descripcion,
        type: 'success',
        confirmButtonText: 'Aceptar'
      });

      this.forma.reset({
        monto: 0
      });
    });
  }
}
