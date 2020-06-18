import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Alumno } from './alumno';
import { AuthService } from '../login/auth.service';
import { UserGeneric } from '../login/user-generic';
import { Proyecto } from './proyectos/proyecto';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private urlEndPoint: string = 'http://localhost:8080/api/alumno';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private alumno: Alumno;

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

  getAlumnoByEmail(email: string): Observable<Alumno> {
    // if (email != this.authService.usuario.email) {
    //   swal.fire('Error', 'No puedes acceder a esta información', 'error');
    // } else {
    return this.http.get<Alumno>(`${this.urlEndPoint}?email=${email}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        // this.router.navigate(['/alumnos']);
        swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
    // }
  }

  getAlumno(id): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (!this.authService.isAuthenticated()) {
            swal.fire('Error', 'Debes iniciar sesión', 'error');
            this.router.navigate(['/login']);
          } else if(this.isNoAutorizado(e)){
            return throwError(e);
          }
          else{
            swal.fire('Error al acceder al alumno con id ' + id, e.error.mensaje, 'error');
            return throwError(e);
          }
        })
      );
  }

  update(alumno: Alumno): Observable<Alumno> {
    let url: string = 'http://localhost:8080/api/alumno/update';
    return this.http.put(`${url}/${this.authService.usuario.id}`, alumno, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.alumno as Alumno),
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

  createProy(proyecto: Proyecto): Observable<Proyecto> {
    let urlEndPoint = "http://localhost:8080/api/proyectos";
    return this.http.post(urlEndPoint, proyecto, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.proyecto as Proyecto),
      catchError(e => {
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
