import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Profesor } from './profesor';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private urlEndPoint: string = 'http://localhost:8080/api/profesor';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  private profesor:Profesor;

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

  getProfesorByEmail(email: string): Observable<Profesor> {
    if (email != this.authService.usuario.email) {
      swal.fire('Error', 'No puedes acceder a esta información', 'error');
    } else {
      return this.http.get<Profesor>(`${this.urlEndPoint}?email=${email}`, { headers: this.agregarAuthorizationHeader() }).pipe(
        catchError(e => {
          // this.router.navigate(['/profesors']);
          swal.fire('Error', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }
  }

  getProfesor(id): Observable<Profesor> {
    if (id != this.authService.usuario.id && this.authService.usuario.rol != "admin") {
      swal.fire('Error', 'No puedes acceder a esta información', 'error');
    } else {
      return this.http.get<Profesor>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
        catchError(e => {
          if (!this.authService.isAuthenticated()) {
            swal.fire('Error', 'Debes iniciar sesión', 'error');
            this.router.navigate(['/login']);
          } else if(this.isNoAutorizado(e)){
            return throwError(e);
          }
          else{
            swal.fire('Error al acceder al profesor con id ' + id, e.error.mensaje, 'error');
            return throwError(e);
          }
        })
      );
    }
  }

  update(profesor: Profesor): Observable<Profesor> {
    let url: string = 'http://localhost:8080/api/profesor/update';
    return this.http.put(`${url}/${this.authService.usuario.id}`, profesor, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.profesor as Profesor),
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' +token);
    }
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
