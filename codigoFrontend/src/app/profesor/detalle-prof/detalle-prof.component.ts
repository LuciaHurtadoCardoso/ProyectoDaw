import { Component, OnInit, Input } from '@angular/core';
import { Profesor } from '../profesor';
import { ProfesorService } from '../profesor.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './modalProf.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/login/auth.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detalle-prof',
  templateUrl: './detalle-prof.component.html',
  styleUrls: ['./detalle-prof.component.css']
})
export class DetalleProfComponent implements OnInit {

  @Input() profesor: Profesor;
  titulo: string = "Editar el perfil";
  private fotoSeleccionada: File;
  private errores: string[];
  faTimes = faTimes;

  constructor(private profesorService: ProfesorService,
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
      this.profesorService.subirFoto(this.fotoSeleccionada, this.profesor.id)
        .subscribe(event => {
          if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.profesor = response.profesor as Profesor;
            this.modalService.notificarSubida.emit(this.profesor);
            // swal.fire('La foto se ha subido correctamente!', response.mensaje, 'success');
          }
        });
    }
  }

  update(): void {
    this.profesorService.update(this.profesor).subscribe(profesor => {
      swal.fire('Perfil actualizado', `El profesor ${profesor.nombre} ha sido actualizado con éxito`, 'success');
      this.actualizarUsuario(profesor);
      this.modalService.cerrarModal();
      this.errores = [];
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

  actualizarUsuario(profesor): void {
    this.authService.usuario.nombre = profesor.nombre;
    this.authService.usuario.apellidos = profesor.apellidos;
    this.authService.usuario.foto = profesor.foto;
  }
}
