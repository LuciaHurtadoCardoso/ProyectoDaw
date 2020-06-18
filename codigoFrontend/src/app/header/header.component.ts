import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Alumno } from '../alumno/alumno';
import { AlumnoService } from '../alumno/alumno.service';
import {faLightbulb} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  alumno:Alumno;
  titulo:string = 'Proyecto de proyectos';
  faLightbulb=faLightbulb;
  // perfil: string = `/${this.authService.usuario.rol}/${this.authService.usuario.id}`;

  constructor(private authService:AuthService,private router: Router,  private alumnoService:AlumnoService) { }

  ngOnInit() {
  }

  logout():void{
    let nombre = this.authService.usuario.nombre;
    this.authService.logout();
    swal.fire('Sesión cerrada con éxito', `${nombre} tu sesión ha sido cerrada con éxito`, 'success');
    this.router.navigate(['/login']);
  }
}
