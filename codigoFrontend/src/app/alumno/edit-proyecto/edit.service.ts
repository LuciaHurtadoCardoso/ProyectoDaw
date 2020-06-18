import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {Proyecto} from '../proyectos/proyecto'
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  _proyecto:Proyecto;
  abierto:boolean = false;
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

  eliminarTag(tag_id): Observable<Proyecto>{
    let url:string = 'http://localhost:8080/api/proyecto/deleteTag/'+this._proyecto.id+'?tag_id='+tag_id;
    return this.http.delete(`${url}`).pipe(
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

  nuevosTag(tag:string):Observable<any>{
    let url:string = 'http://localhost:8080/api/newTag?tag='+tag;
    return this.http.post(url, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.tag as []),
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
