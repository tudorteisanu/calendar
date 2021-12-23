import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    component: MainComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
