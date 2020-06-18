import { Injectable, EventEmitter } from '@angular/core';
import { Publicacion } from './publicacion';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../login/auth.service';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  private urlEndPoint: string = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  publicaciones : Publicacion;
  private _notificarNewComentario = new EventEmitter<any>();

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  get notificarNewComentario():EventEmitter<any>{
    return this._notificarNewComentario;
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

  obtenerPublicaciones(id:number):Observable<Publicacion>{
    return this.http.get<Publicacion>(`${this.urlEndPoint}/publicaciones/${id}`, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (!this.authService.isAuthenticated()) {
            swal.fire('Error', 'Debes iniciar sesión', 'error');
            this.router.navigate(['/login']);
          } else if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          else {
            swal.fire('Error al acceder a la publicacion con id ' + id, e.error.mensaje, 'error');
            return throwError(e);
          }
        })
      );
  }

  crearNuevoComentario(comentario:Object):Observable<Object>{
    let urlEndPoint = "http://localhost:8080/api/nuevoComentario";
    return this.http.post(urlEndPoint, comentario, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.comentario as Object),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }


}
