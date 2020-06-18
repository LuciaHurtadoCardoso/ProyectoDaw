import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserGeneric } from './user-generic';
import { Alumno } from '../alumno/alumno';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: UserGeneric;
  private _token: string;
  alumno: Alumno;


  constructor(private http: HttpClient) { }
  public get usuario(): UserGeneric {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as UserGeneric;
      return this._usuario;
    }
    return new UserGeneric();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: UserGeneric): Observable<any> {
    const urlEndPoint = "http://localhost:8080/oauth/token";

    const credenciales = btoa('proyectoProyectos' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.email);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  b64_to_utf8( datos ) {
    let str = datos.toString().replace(/\s/g, '');    
    return decodeURIComponent(escape(window.atob( str )));
  }

  guardarUsuario(accessToken: string): void {
    let datos = this.obtenerDatosToken(accessToken);
    this._usuario = new UserGeneric();
    this._usuario.email = datos.user_name;
    this._usuario.id = datos.id_usuario;
    this._usuario.nombre = datos.nombre_usuario;
    this._usuario.apellidos = datos.apellidos_usuario;
    this._usuario.foto = datos.foto;
    this._usuario.urlGitHub = datos.urlGit;
    this._usuario.rol = datos.authorities[0];
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(this.b64_to_utf8(accessToken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean {
    let datos = this.obtenerDatosToken(this.token);
    if (datos != null && datos.user_name && datos.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    if (this.usuario.rol.includes(role)) {
      return true;
    }
    return false;
  }
}
