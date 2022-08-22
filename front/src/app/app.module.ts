import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';





import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { AccueilCollabComponent } from './accueil-collab/accueil-collab.component';
import { GestionComptesComponent } from './gestion-comptes/gestion-comptes.component';
import { ResumeJourneeComponent } from './accueil-collab/resume-journee/resume-journee.component';
import { ProfilComponent } from './profil/profil.component';
import { ContactComponent } from './accueil-collab/contact/contact.component';
import { MessagerieComponent } from './accueil-collab/messagerie/messagerie.component';
import { GestionPlanningComponent } from './accueil-collab/gestion-planning/gestion-planning.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserFormComponent } from './gestion-comptes/user-form/user-form.component';
import { UserListComponent } from './gestion-comptes/user-list/user-list.component';
import { UserDetailComponent } from './gestion-comptes/user-detail/user-detail.component';
import { GestionPrivilegeComponent } from './gestion-comptes/gestion-privilege/gestion-privilege.component';
import { GestionRoleComponent } from './gestion-comptes/gestion-role/gestion-role.component';
import { RoleDetailComponent } from './gestion-comptes/role-detail/role-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    AccueilCollabComponent,
    GestionComptesComponent,
    ResumeJourneeComponent,
    ProfilComponent,
    ContactComponent,
    MessagerieComponent,
    GestionPlanningComponent,
    NavBarComponent,
    UserFormComponent,
    UserListComponent,
    UserDetailComponent,
    GestionPrivilegeComponent,
    GestionRoleComponent,
    RoleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
