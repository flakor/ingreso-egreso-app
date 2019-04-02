import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';
import { AuthGuardService } from './auth/auth-guard.service';



const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    {
        path: '',
        loadChildren: () => IngresoEgresoModule,
        canLoad: [ AuthGuardService],
        },
    { path: '**', redirectTo: ''},

];

@NgModule({
    imports: [
        RouterModule.forRoot( routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}