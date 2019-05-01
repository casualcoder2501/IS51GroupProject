import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    runGuardsAndResolvers: 'always'
  }, {
      path: 'home',
      component: HomeComponent,
      runGuardsAndResolvers: 'always'
    },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
