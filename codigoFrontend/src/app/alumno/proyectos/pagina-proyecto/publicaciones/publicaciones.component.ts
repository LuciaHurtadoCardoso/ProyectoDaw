import { Component, OnInit } from '@angular/core';
import { Publicacion } from './publicacion';
import { PublicacionesService } from './publicaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearPublicacionService } from './crear-publicacion/crear-publicacion.service';
import { PaginaProyectoService } from '../pagina-proyecto.service';
import { Alumno } from 'src/app/alumno/alumno';
import { Profesor } from 'src/app/profesor/profesor';
import { faComments, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/login/auth.service';
import swal from 'sweetalert2';
import { Proyecto } from '../../proyecto';
declare var $: any;

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  publicaciones: Publicacion;
  publicacionesReverse: any;
  private id: number;
  url: string;
  alumno: Alumno;
  profesor: Profesor;
  faComments = faComments;
  faMapPin = faMapPin;
  aux : string[];
  comentarioNew = new Object();
  errores:string[];
  proyecto:Proyecto;

  constructor(private publicacionesService: PublicacionesService, private activatedRoute: ActivatedRoute,
    private crearPubliService: CrearPublicacionService, private paginaProyectoService: PaginaProyectoService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      if (this.id) {
        this.publicacionesService.obtenerPublicaciones(this.id).subscribe(publicaciones => {
          this.publicaciones = publicaciones;
          this.reversePublicaciones();
          console.log(this.publicacionesReverse)
        })
        this.paginaProyectoService.getProyecto(this.id).subscribe(proyecto => {
          this.proyecto = proyecto;
          this.alumno = proyecto.alumno;
          this.profesor = proyecto.profesor;
        })
      }
    });

    this.crearPubliService.notificarNuevaPubli.subscribe(publicacion => {
      this.publicacionesService.obtenerPublicaciones(this.id).subscribe(publicaciones => {
        this.publicaciones = publicaciones;
        this.reversePublicaciones();
      })
    })

    this.publicacionesService.notificarNewComentario.subscribe(comentario => {
      this.publicacionesService.obtenerPublicaciones(this.id).subscribe(publicaciones => {
        this.publicaciones = publicaciones;
        this.reversePublicaciones();
      })
    })
  }

  reversePublicaciones(): void {
    let objAux = [];
    for (let i = Object.keys(this.publicaciones).length - 1; i >= 0; i--) {
      objAux.push(this.publicaciones[i]);
      // if (this.publicaciones[i].comentarios.length > 0) {
      //   this.reverseComentarios(this.publicaciones[i]);
      // }
    }
    this.publicacionesReverse = objAux;
  }

  reverseComentarios(publicacion): void {
    let objAux = [];
    for (let i = 0; i < publicacion.comentarios.length; i++) {
      objAux.push(publicacion.comentarios[i]);
    }
    publicacion.comentarios = objAux;
  }

  obtenerUrl(publicacion: Publicacion) {
    this.url = "http://localhost:8080/api/upload/archivo/" + publicacion.archivo + "?id=" + this.proyecto.id;
  }

  createComentario(id: number) {
    if($("#comentario"+id).val() == ""){
      swal.fire("Error al enviar el comentario", "El comentario no puede ir vacío", "error");
    }else{
      this.comentarioNew["publicacion_id"] = id;
      this.comentarioNew["id_usuario"] = this.authService.usuario.id;
      this.comentarioNew["role"] = this.authService.usuario.rol;
      this.comentarioNew["fecha"] = new Date();
      this.comentarioNew["texto"] = $('#comentario'+id).val();
      this.publicacionesService.crearNuevoComentario(this.comentarioNew).subscribe(comentario => {
        this.publicacionesService.notificarNewComentario.emit(this.comentarioNew);
        this.errores = [];
        this.router.navigate([`proyecto/ver/${this.proyecto.id}`]);
      },
        err => {
          this.errores = err.error.errors as string[];
        });
    }
  }

  mostrarTodosComentarios(idPublicacion:number){
    let escondidos = document.getElementsByClassName("escondidos"+idPublicacion);
    for(let i = 0; i < escondidos.length; i++){
      escondidos[i].setAttribute("style", "display: block !important");
    }
    $("#buton"+idPublicacion).css("display", "none");
    $("#ocultar"+idPublicacion).css("display", "block");
  }

  ocultarComentarios(idPublicacion:number){
    let escondidos = document.getElementsByClassName("escondidos"+idPublicacion);
    for(let i = 0; i < escondidos.length; i++){
      escondidos[i].setAttribute("style", "display: none !important");
    }
    $("#buton"+idPublicacion).css("display", "block");
    $("#ocultar"+idPublicacion).css("display", "none");
  }
}
