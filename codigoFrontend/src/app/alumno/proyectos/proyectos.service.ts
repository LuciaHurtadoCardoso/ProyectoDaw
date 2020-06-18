import { Injectable } from '@angular/core';
import { Proyecto } from './proyecto';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../../login/auth.service';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Alumno } from '../alumno';
import { Profesor } from 'src/app/profesor/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private urlEndPoint: string = 'http://localhost:8080/api/alumno';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private proyectos: Proyecto;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      this.router.navigate(['/' + this.authService.usuario.rol + '/' + this.authService.usuario.id]);
      swal.fire('Acceso denegado', 'No tienes acceso al contenido solicitado', 'warning');
      return true;
    }
    return false;
  }

  obtenerProyectos(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.urlEndPoint}/proyectos/${id}`, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (!this.authService.isAuthenticated()) {
            swal.fire('Error', 'Debes iniciar sesión', 'error');
            this.router.navigate(['/login']);
          } else if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          else {
            swal.fire('Error al acceder al alumno con id ' + id, e.error.mensaje, 'error');
            return throwError(e);
          }
        })
      );
  }
}
