import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  update(email: string, password:string): Observable<any> {
    let url: string = 'http://localhost:8080/api/restablecer?email='+email;
    return this.http.put(url, password, { headers: this.agregarAuthorizationHeader() }).pipe(
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
