import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CartasGuardadasComponent } from './cartas-guardadas/cartas-guardadas.component'
import { HomeComponent } from './home/home.component'
//import { EstadisticaComponent } from './estadistica/estadistica.component'

const routes: Routes = [
  // Otras rutas si las tienes...
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'card', component: CardComponent },
  { path: 'guardada', component: CartasGuardadasComponent},
  { path: 'home', component: HomeComponent}
  //{ path: 'stat', component: EstadisticaComponent}
  // Otras rutas si las tienes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }