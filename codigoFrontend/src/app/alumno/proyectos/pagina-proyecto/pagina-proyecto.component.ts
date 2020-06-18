import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginaProyectoService } from './pagina-proyecto.service';
import { AuthService } from 'src/app/login/auth.service';
import { Proyecto } from '../proyecto';
import {CrearPublicacionService} from 'src/app/alumno/proyectos/pagina-proyecto/publicaciones/crear-publicacion/crear-publicacion.service'
import { Alumno } from '../../alumno';
import { Profesor } from 'src/app/profesor/profesor';
import swal from "sweetalert2";

@Component({
  selector: 'app-pagina-proyecto',
  templateUrl: './pagina-proyecto.component.html',
  styleUrls: ['./pagina-proyecto.component.css']
})
export class PaginaProyectoComponent implements OnInit {

  proyecto: Proyecto;

  constructor(private activatedRoute: ActivatedRoute, private paginaProyectoService: PaginaProyectoService, 
     private authService: AuthService, private router: Router,
     private crearPublicacionService: CrearPublicacionService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.paginaProyectoService.getProyecto(id).subscribe(proyecto => {
          this.proyecto = proyecto;
          if(this.proyecto.alumno.id != this.authService.usuario.id || this.proyecto.profesor.id != this.authService.usuario.id){
            swal.fire("Acceso denegado", "No tienes acceso a este contenido", "warning");
            this.router.navigate([this.authService.usuario.rol +'/' + this.authService.usuario.id]);
          }else{
            this.router.navigate(['proyecto/ver/' + this.proyecto.id]);
          }
        })
      }
    });
  }

  abrirCrearPubli():void{
    this.crearPublicacionService.abrirModal();
  }

}
