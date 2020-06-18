import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../publicacion';
import { CrearPublicacionService } from './crear-publicacion.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../../../../login/auth.service';
import { HttpEventType } from '@angular/common/http';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent implements OnInit {

  publicacion : Publicacion;
  private publicacionNew: Publicacion = new Publicacion();
  tituloNew:string="Crear una nueva publicación"
  errores:string[];
  private archivoSeleccionado: File;
  private idProyecto:number;
  faTimes=faTimes;

  constructor(private router: Router, private crearPublicacionService : CrearPublicacionService, 
    private authService:AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idProyecto = +params.get('id');
    });
  }

  create(): void {
    let fecha = new Date();
    this.publicacionNew.fecha = fecha;
    this.publicacionNew.proyecto = this.idProyecto;
    this.crearPublicacionService.createPublicacion(this.publicacionNew).subscribe(publicacion => {
      this.crearPublicacionService.notificarNuevaPubli.emit(publicacion);
      console.log(publicacion)
      this.publicacionNew.id = publicacion.id;
      swal.fire('Publicación creado con éxito', `¡A POR TODAS!`, 'success');
      if(this.archivoSeleccionado != null){
        this.subirArchivo();
      }
      this.crearPublicacionService.cerrarModal();
      this.errores = [];
      this.router.navigate([`proyecto/ver/${publicacion.proyecto}`]);
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirArchivo() {
    if (!this.archivoSeleccionado) {
      swal.fire('Error:', `Debe seleccionar un archivo`, 'error');
    } else {
      this.crearPublicacionService.subirArchivo(this.archivoSeleccionado, this.publicacionNew.id)
        .subscribe(event => {
          if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.publicacion = response.publicacion as Publicacion;
            this.crearPublicacionService.notificarNuevaPubli.emit(this.publicacion);
          }
        });
    }
  }
}
