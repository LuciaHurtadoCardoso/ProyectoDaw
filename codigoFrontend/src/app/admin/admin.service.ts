import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Admin} from './admin';
import { ProyectoFinalizado } from '../proyecto-finalizado/proyecto-finalizado';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private urlEndPoint: string = 'http://localhost:8080/api/admin';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  private isNoAutorizado(e):boolean{
    if(e.status==401){
      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if(e.status==403){
      this.router.navigate(['/'+ this.authService.usuario.rol +'/'+this.authService.usuario.id]);
      swal.fire('Acceso denegado', 'No tienes acceso al contenido solicitado', 'warning');
      return true;
    }
    return false;
  }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getAdmin(id): Observable<Admin> {
    return this.http.get<Admin>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (!this.authService.isAuthenticated()) {
            swal.fire('Error', 'Debes iniciar sesión', 'error');
            this.router.navigate(['/login']);
          } else if(this.isNoAutorizado(e)){
            return throwError(e);
          }
          else{
            swal.fire('Error al acceder al admin con id ' + id, e.error.mensaje, 'error');
            return throwError(e);
          }
        })
      );
  }

  obtenerProyectos(): Observable<ProyectoFinalizado[]> {
    let urlEndPoint = 'http://localhost:8080/api/proyectosFinalizadosAll';
    return this.http.get<ProyectoFinalizado[]>(urlEndPoint, { headers: this.agregarAuthorizationHeader() })
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
