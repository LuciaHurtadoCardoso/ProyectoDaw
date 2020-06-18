import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Publicacion } from '../publicacion';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {AuthService} from '../../../../../login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrearPublicacionService {

  publi:boolean = false;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private _notificarNuevaPubli = new EventEmitter<any>();

  constructor(private authService:AuthService, private router: Router, private http: HttpClient) { }

  get notificarNuevaPubli():EventEmitter<any>{
    return this._notificarNuevaPubli;
  }

  abrirModal(){
    this.publi = true;
  }

  cerrarModal(){
    this.publi = false;
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

  createPublicacion(publicacion:Publicacion):Observable<Publicacion>{
    let urlEndPoint = "http://localhost:8080/api/crearPublicacion";
    return this.http.post(urlEndPoint, publicacion, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.publicacion as Publicacion),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  subirArchivo(archivo: File, id): Observable<HttpEvent<{}>> {
    let urlEndPoint: string = 'http://localhost:8080/api/publicacion/upload';
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' +token);
    }
    const req = new HttpRequest('POST', `${urlEndPoint}`, formData, {
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
