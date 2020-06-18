import { Injectable, EventEmitter } from '@angular/core';
import {Proyecto} from 'src/app/alumno/proyectos/proyecto';
import {ProyectoFinalizado} from 'src/app/proyecto-finalizado/proyecto-finalizado';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalificarService {

  abierto:boolean = false;
  _proyecto:Proyecto;
  _proyectoFinalizado:ProyectoFinalizado;
  private urlEndPoint: string = 'http://localhost:8080/api/alumno';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private _notificarSubida = new EventEmitter<any>();

  constructor(private http: HttpClient,private authService: AuthService, private router: Router) { }

  get notificarSubida():EventEmitter<any>{
    return this._notificarSubida;
  }

  get proyecto():Proyecto{
    return this._proyecto;
  }

  get proyectoFinalizado():ProyectoFinalizado{
    return this._proyectoFinalizado;
  }

  abrirEdit(proyecto:Proyecto){
    this._proyecto = proyecto;
    this.abierto = true;
  }

  cerrarEdit(){
    this.abierto = false;
    document.body.style.overflow = null;
  }

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

  update(proyecto: Proyecto): Observable<Proyecto> {
    let url: string = 'http://localhost:8080/api/proyecto/update';
    return this.http.put(`${url}/${proyecto.id}`, proyecto, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.proyecto as Proyecto),
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

  createFinal(proyecto: ProyectoFinalizado): Observable<ProyectoFinalizado> {
    let urlEndPoint = "http://localhost:8080/api/proyectosFinalizados";
    return this.http.post(urlEndPoint, proyecto, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.proyecto as ProyectoFinalizado),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  obtenerArchivos(proyecto:Proyecto):Observable<any>{
    let url: string = 'http://localhost:8080/api/proyecto/archivos';
    return this.http.get(`${url}/${proyecto.id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.archivos as string[]),
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
