import { Component, OnInit, Input } from '@angular/core';
import { Alumno } from '../alumno';
import { AlumnoService } from '../alumno.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/login/auth.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() alumno: Alumno;
  titulo: string = "Editar el perfil";
  private fotoSeleccionada: File;
  private errores: string[];
  faTimes=faTimes;

  constructor(private alumnoService: AlumnoService,
    private activatedRouter: ActivatedRoute,
    private modalService: ModalService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error:', `Debe seleccionar una imagen`, 'error');
      this.fotoSeleccionada = null;
    }else{
      this.subirFoto();
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error:', `Debe seleccionar una foto`, 'error');
    } else {
      this.alumnoService.subirFoto(this.fotoSeleccionada, this.alumno.id)
        .subscribe(event => {
          if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.alumno = response.alumno as Alumno;
            this.modalService.notificarSubida.emit(this.alumno);
            // swal.fire('La foto se ha subido correctamente!', response.mensaje, 'success');
          }
        });
    }
  }

  update(): void {
    this.alumnoService.update(this.alumno).subscribe(alumno => {
      swal.fire('Perfil actualizado', `El alumno ${alumno.nombre} ha sido actualizado con éxito`, 'success');
      this.actualizarUsuario(alumno);
      this.modalService.cerrarModal();
      this.errores = [];
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

  actualizarUsuario(alumno): void {
    this.authService.usuario.nombre = alumno.nombre;
    this.authService.usuario.apellidos = alumno.apellidos;
    this.authService.usuario.urlGitHub = alumno.urlGitHub;
    this.authService.usuario.foto = alumno.foto;
  }
}
