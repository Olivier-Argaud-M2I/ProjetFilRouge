import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginService } from './service/login.service';


import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { GestionComptesComponent } from './gestion-comptes/gestion-comptes.component';
import { AccueilCollabComponent } from './accueil-collab/accueil-collab.component';
import { GestionPlanningComponent } from './accueil-collab/gestion-planning/gestion-planning.component';


const routes: Routes = [

  { path: '',                     component: AccueilComponent                                                                       },
  { path: 'accueil',              component: AccueilComponent                                                                       },
  { path: 'login',                component: LoginComponent                                                                         },
  { path: 'gestionComptes',       component: GestionComptesComponent,     canActivate:[LoginService] , data:{roles:['Admin']}       },
  { path: 'accueilCollab',        component: AccueilCollabComponent,      canActivate:[LoginService]                                },
  { path: 'planning',             component: GestionPlanningComponent,    canActivate:[LoginService]                                },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
