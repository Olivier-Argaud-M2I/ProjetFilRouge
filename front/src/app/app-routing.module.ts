import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginService } from './service/login.service';


import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { GestionComptesComponent } from './gestion-comptes/gestion-comptes.component';
import { UserDetailComponent } from './gestion-comptes/user-detail/user-detail.component';

import { AccueilCollabComponent } from './accueil-collab/accueil-collab.component';
import { GestionPlanningComponent } from './accueil-collab/gestion-planning/gestion-planning.component';
import { RoleDetailComponent } from './gestion-comptes/role-detail/role-detail.component';
import { ContactDetailComponent } from './accueil-collab/contact-detail/contact-detail.component';


const routes: Routes = [

  { path: '',                     component: AccueilComponent                                                                       },
  { path: 'accueil',              component: AccueilComponent                                                                       },
  { path: 'login',                component: LoginComponent                                                                         },
  { path: 'gestionComptes',       component: GestionComptesComponent,     canActivate:[LoginService] , data:{roles:['Admin']}       },
  { path: 'userdetail/:id',       component: UserDetailComponent,         canActivate:[LoginService] , data:{roles:['Admin']}       },
  { path: 'roledetail/:id',       component: RoleDetailComponent,         canActivate:[LoginService] , data:{roles:['Admin']}       },
  { path: 'contactdetail/:id',    component: ContactDetailComponent,      canActivate:[LoginService] , data:{roles:['Admin']}       },
  { path: 'accueilCollab',        component: AccueilCollabComponent,      canActivate:[LoginService]                                },
  { path: 'planning',             component: GestionPlanningComponent,    canActivate:[LoginService]                                },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
