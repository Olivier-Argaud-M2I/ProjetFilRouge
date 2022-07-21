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
import { ResumeJourneeComponent } from './resume-journee/resume-journee.component';
import { ProfilComponent } from './profil/profil.component';
import { ContactComponent } from './contact/contact.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { GestionPlanningComponent } from './gestion-planning/gestion-planning.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

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
    NavBarComponent
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
