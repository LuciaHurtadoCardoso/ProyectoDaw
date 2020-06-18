import { Component, OnInit } from '@angular/core';
import { CalificarService } from './calificar.service';
import { Proyecto } from 'src/app/alumno/proyectos/proyecto';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import { ProyectoFinalizado } from 'src/app/proyecto-finalizado/proyecto-finalizado';
declare var $: any;

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css']
})
export class CalificarComponent implements OnInit {

  proyecto: Proyecto;
  private proyectoFinalizado:ProyectoFinalizado= new ProyectoFinalizado();
  faTimes = faTimes;
  encabezado: string = "Calificar proyecto";
  private errores: string[];
  private archivos: string[];
  archivosSeleccionados: string[];

  constructor(private calificarService: CalificarService, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.proyecto = this.calificarService.proyecto;
    document.body.style.overflow = "hidden";
    this.obtenerArchivos();
  }

  abrirSwal(): void {
    swal.fire({
      title: '¿Estás seguro?',
      text: "Al llevar a cabo la calificación del proyecto, este se cerrará y se hará publico en caso de que la nota sea igual o mayor al 5.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF8B40',
      cancelButtonColor: '#FF4535',
      confirmButtonText: 'Adelante!',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.update();
      }
    })
  }

  update(): void {
    this.proyecto.estado_proyecto = false;
    let objAux = [];
    $.each($("input[name='archivoSelected']:checked"), function () {
      let aux = new Object();
      aux = $(this).val();
      objAux.push(aux);
    });
    this.archivosSeleccionados = objAux;
    this.calificarService.update(this.proyecto).subscribe(proyecto => {
      this.calificarService.notificarSubida.emit(this.proyecto);
      swal.fire('Proyecto calificado', `El proyecto ${proyecto.titulo} ha sido calificado con éxito`, 'success');
      this.calificarService.cerrarEdit();
      if(proyecto.nota >= 5){
        this.create();
      }else{
        swal.fire('Proyecto suspenso', 'El proyecto no se publicará, ya que está suspenso', 'info');
      }
      this.errores = [];
      this.router.navigate([`profesor/${this.authService.usuario.id}`]);
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

  create():void{
    this.proyectoFinalizado.url = this.proyecto.urlGitHub;
    this.proyectoFinalizado.descripcion = this.proyecto.descripcion;
    this.proyectoFinalizado.titulo = this.proyecto.titulo;
    this.proyectoFinalizado.anio = this.proyecto.anio;
    this.proyectoFinalizado.ciclo = this.proyecto.ciclo_siglas;
    this.proyectoFinalizado.alumno = this.proyecto.alumno.apellidos + " " + this.proyecto.alumno.nombre;
    this.proyectoFinalizado.tutor = this.proyecto.profesor.apellidos + " " + this.proyecto.profesor.nombre;
    this.proyectoFinalizado.horas = this.proyecto.horas;
    this.proyectoFinalizado.convocatoria = this.proyecto.convocatoria;
    let tags:string = "";
    for(let i = 0; i < Object.keys(this.proyecto.proyectoEtiqueta).length; i++){
      if(i == Object.keys(this.proyecto.proyectoEtiqueta).length - 1){
        tags += this.proyecto.proyectoEtiqueta[i].tag;
      }else{
        tags += this.proyecto.proyectoEtiqueta[i].tag + ",";
      }
    }
    this.proyectoFinalizado.tags = tags;
    if(this.archivosSeleccionados.length != 0){
      this.proyectoFinalizado.archivos = this.archivosSeleccionados;
    }else{
      this.proyectoFinalizado.archivos = null;
    }
    this.calificarService.createFinal(this.proyectoFinalizado).subscribe(proyecto => {
      swal.fire('Proyecto publicado', 'El proyecto ha sido publicado con éxito', 'success');
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

  obtenerArchivos(): void {
    console.log(this.proyecto)
    this.calificarService.obtenerArchivos(this.proyecto).subscribe(archivos => {
      this.archivos = archivos;
      console.log(archivos)
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

}
