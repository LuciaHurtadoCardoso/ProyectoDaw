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
export class VerificationService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  update(email: String): Observable<any> {
    let url: string = 'http://localhost:8080/api/verification';
    return this.http.put(url, email, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  enviarEmail(email: String): Observable<any> {
    let url: string = 'http://localhost:8080/api/sendEmailPass?email='+email;
    return this.http.post(url, { headers: this.agregarAuthorizationHeader() }).pipe(
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
