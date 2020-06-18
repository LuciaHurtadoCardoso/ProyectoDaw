import { Injectable, EventEmitter } from '@angular/core';
import {ProyectoSin} from './proyecto-sin';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProySinService {

  private proyectos:ProyectoSin;
  private urlEndPoint: string = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private _notificarAsignacion = new EventEmitter<any>();

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  get notificarAsignacion():EventEmitter<any>{
    return this._notificarAsignacion;
  }

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

  obtenerProyectos(): Observable<ProyectoSin[]> {
    return this.http.get<ProyectoSin[]>(`${this.urlEndPoint}/noAsignados`, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (!this.authService.isAuthenticated()) {
            swal.fire('Error', 'Debes iniciar sesión', 'error');
            this.router.navigate(['/login']);
          } else if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          else {
            swal.fire('Error al acceder al contenido', e.error.mensaje, 'error');
            return throwError(e);
          }
        })
      );
  }

  update(proyecto: ProyectoSin): Observable<ProyectoSin> {
    let url: string = 'http://localhost:8080/api/proyecto/update';
    return this.http.put(`${url}/${proyecto.id}`, proyecto, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.proyecto as ProyectoSin),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  obteniendoTags():Observable<any>{
    let urlEndPoint = "http://localhost:8080/api/tags";
    return this.http.get(urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (!this.authService.isAuthenticated()) {
          swal.fire('Error', 'Debes iniciar sesión', 'error');
          this.router.navigate(['/login']);
        } else if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        else{
          swal.fire('Error al acceder al contenido', e.error.mensaje, 'error');
          return throwError(e);
        }
      })
    );
  }

  obteniendoCiclos():Observable<any>{
    let urlEndPoint = "http://localhost:8080/api/ciclos";
    return this.http.get(urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (!this.authService.isAuthenticated()) {
          swal.fire('Error', 'Debes iniciar sesión', 'error');
          this.router.navigate(['/login']);
        } else if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        else{
          swal.fire('Error al acceder al contenido', e.error.mensaje, 'error');
          return throwError(e);
        }
      })
    );
  }

  obteniendoConvocatorias():Observable<any>{
    let urlEndPoint = "http://localhost:8080/api/convocatorias";
    return this.http.get(urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (!this.authService.isAuthenticated()) {
          swal.fire('Error', 'Debes iniciar sesión', 'error');
          this.router.navigate(['/login']);
        } else if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        else{
          swal.fire('Error al acceder al contenido', e.error.mensaje, 'error');
          return throwError(e);
        }
      })
    );
  }
}
