import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetalleComponent } from './alumno/detalle/detalle.component';
import { DetalleProfComponent } from './profesor/detalle-prof/detalle-prof.component';
import { ProyectosComponent } from './alumno/proyectos/proyectos.component';
import { PaginaProyectoComponent } from './alumno/proyectos/pagina-proyecto/pagina-proyecto.component';
import { ProyectosAsignadosComponent } from './profesor/proyectos-asignados/proyectos-asignados.component';
import { ProyectoNewComponent } from './alumno/proyecto-new/proyecto-new.component';
import { ProySinAsignarComponent } from './proy-sin-asignar/proy-sin-asignar.component';
import { EditProyectoComponent } from './alumno/edit-proyecto/edit-proyecto.component';
import { PublicacionesComponent } from './alumno/proyectos/pagina-proyecto/publicaciones/publicaciones.component';
import { CrearPublicacionComponent } from './alumno/proyectos/pagina-proyecto/publicaciones/crear-publicacion/crear-publicacion.component';
import { CalificarComponent } from './profesor/proyectos-asignados/calificar/calificar.component';
import { ProyectoFinalizadoComponent } from './proyecto-finalizado/proyecto-finalizado.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminComponent } from './admin/admin.component';
import { VerificationComponent } from './verification/verification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordAlComponent } from './alumno/password-al/password-al.component';
import { PasswordProfComponent } from './profesor/password-prof/password-prof.component';
import { PasswordAdmComponent } from './admin/password-adm/password-adm.component';
import { ChangeCodigoComponent } from './admin/change-codigo/change-codigo.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'alumnos', component: AlumnoComponent},
  {path: 'alumno/:id', component: AlumnoComponent},
  {path: 'profesores', component: ProfesorComponent},
  {path: 'profesor/:id', component: ProfesorComponent},
  {path: 'proyecto/ver/:id', component: PaginaProyectoComponent},
  {path: 'proyectos/sinAsignar', component: ProySinAsignarComponent},
  {path: 'proyectos/finalizados', component: ProyectoFinalizadoComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'admin/:id', component: AdminComponent},
  {path: 'verificacion/:email', component: VerificationComponent},
  {path: 'changePassword/:email', component: ChangePasswordComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AlumnoComponent,
    ProfesorComponent,
    DetalleComponent,
    DetalleProfComponent,
    ProyectosComponent,
    PaginaProyectoComponent,
    ProyectosAsignadosComponent,
    ProyectoNewComponent,
    ProySinAsignarComponent,
    EditProyectoComponent,
    PublicacionesComponent,
    CrearPublicacionComponent,
    CalificarComponent,
    ProyectoFinalizadoComponent,
    RegistroComponent,
    AdminComponent,
    VerificationComponent,
    ChangePasswordComponent,
    PasswordAlComponent,
    PasswordProfComponent,
    PasswordAdmComponent,
    ChangeCodigoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
