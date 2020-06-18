import { Injectable, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import swal from 'sweetalert2';
import { AuthService } from '../../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoNewService {

  new:boolean = false;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private _notificarNewProyecto = new EventEmitter<any>();

  constructor(private http: HttpClient,private authService: AuthService) { }

  get notificarNewProyecto():EventEmitter<any>{
    return this._notificarNewProyecto;
  }

  abrirModalProy(){
    this.new = true;
  }

  cerrarModalProy(){
    this.new = false;
  }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
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
