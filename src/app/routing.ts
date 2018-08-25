import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: DashboardComponent, canActivate: [GuardService] }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class routing {}