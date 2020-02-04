import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';

import * as fromingresoEgreso from '../ingreso-egreso.reducer';
 
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;
  subscription: Subscription = new Subscription();

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<fromingresoEgreso.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
    .subscribe ( ingresoEgreso => {

      this.contarIngresoEgreso( ingresoEgreso.items );

    });
  }
  contarIngresoEgreso( items: IngresoEgreso[]) {

      this.ingresos = 0;
      this.egresos = 0;
      this.cuantosIngresos = 0;
      this.cuantosEgresos = 0;

      items.forEach( item => {
          if (item.tipo === 'ingreso') {
            this.cuantosIngresos ++;
            this.ingresos += item.monto;
          } else {
            this.cuantosEgresos ++;
            this.egresos += item.monto;
          }
      });

      this.doughnutChartData = [this.egresos, this.ingresos];

  }
}
