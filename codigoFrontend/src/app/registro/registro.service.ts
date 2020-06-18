import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';
import { Alumno } from '../alumno/alumno';
import { Profesor } from '../profesor/profesor';
import {Codigo} from './codigo';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

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

  createAlumno(usuario:Usuario):Observable<Usuario>{
    let urlEndPoint = "http://localhost:8080/api/newAlumno";
    return this.http.post(urlEndPoint, usuario, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.alumno as Alumno),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  createProfesor(usuario:Usuario, codigo:string):Observable<Usuario>{
    let urlEndPoint = "http://localhost:8080/api/newProfesor?codigo="+codigo;
    return this.http.post(urlEndPoint, usuario, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.profesor as Profesor),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  enviarEmail(email:String):Observable<any>{
    return this.http.post("http://localhost:8080/api/enviarEmail", email, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  
  verCodigo(rol:String):Observable<any>{
    let url = "http://localhost:8080/api/codigo/" + rol;
    return this.http.get(url, {headers: this.agregarAuthorizationHeader()}).pipe(
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
