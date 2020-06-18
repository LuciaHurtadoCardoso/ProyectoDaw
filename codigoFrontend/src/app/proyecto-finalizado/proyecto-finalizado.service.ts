import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ProyectoFinalizado } from './proyecto-finalizado';

@Injectable({
  providedIn: 'root'
})
export class ProyectoFinalizadoService {

  private proyectos:ProyectoFinalizado;
  private urlEndPoint: string = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private _notificarAsignacion = new EventEmitter<any>();

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

  obtenerProyectos(): Observable<ProyectoFinalizado[]> {
    return this.http.get<ProyectoFinalizado[]>(`${this.urlEndPoint}/proyectosFinalizadosAll`, { headers: this.agregarAuthorizationHeader() })
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

  mostrarProyecto(proyecto:ProyectoFinalizado):Observable<ProyectoFinalizado>{
    let urlEndPoint = "http://localhost:8080/api/proyectoFinalizado/update/"+proyecto.id;
    return this.http.put(urlEndPoint, proyecto, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.proyecto as ProyectoFinalizado),
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
}
