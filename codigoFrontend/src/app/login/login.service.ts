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
export class LoginService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e):boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
}
