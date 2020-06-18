import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';
import { AuthService } from '../login/auth.service';
import swal from 'sweetalert2';
import { faUserEdit, faKey } from '@fortawesome/free-solid-svg-icons';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './detalle/modal.service';
import { ProyectoNewService } from './proyecto-new/proyecto-new.service';
import {EditService} from './edit-proyecto/edit.service'
import {PasswordAlService} from './password-al/password-al.service';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  alumno: Alumno;
  alumnoSeleccionado: Alumno;
  private errores: string[];
  faUserEdit = faUserEdit;
  faKey=faKey;

  constructor(private activatedRoute: ActivatedRoute, private alumnoService: AlumnoService,
    private authService: AuthService, private router: Router, private modalService: ModalService,
    private proyectoNewService: ProyectoNewService, private editService: EditService,
    private passwordAlService:PasswordAlService) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        if (this.authService.usuario.rol == "alumno") {
          this.alumnoService.getAlumno(this.authService.usuario.id).subscribe(alumno => {
            this.alumno = alumno;
            this.router.navigate(['/alumno/' + this.alumno.id]);
          })
        } else {
          this.alumnoService.getAlumno(id).subscribe(alumno => {
            this.alumno = alumno;
            this.router.navigate(['/alumno/' + this.alumno.id]);
          })
        }
      }
    });

    this.modalService.notificarSubida.subscribe(alumno => {
      if (this.alumno.id == alumno.id) {
        this.alumno.foto = alumno.foto;
      }
      return this.alumno;
    });
  }

  abrirModal(alumno: Alumno) {
    this.alumnoSeleccionado = alumno;
    this.modalService.abrirModal();
  }

  abrirChange(alumno: Alumno) {
    this.alumnoSeleccionado = alumno;
    this.passwordAlService.abrirChange();
  }

  // update():void{
  //   this.alumnoService.update(this.alumno).subscribe(alumno => {
  //     swal.fire('Perfil actualizado', `El alumno ${this.alumno.nombre} ha sido actualizado con éxito`, 'success');
  //     this.actualizarUsuario(this.alumno);
  //   }, 
  //   err => {
  //     this.errores = err.error.errors as string[];
  //   });
  // }

  // actualizarUsuario(alumno):void{
  //   this.authService.usuario.nombre = alumno.nombre;
  //   this.authService.usuario.apellidos = alumno.apellidos;
  //   this.authService.usuario.urlGitHub = alumno.urlGitHub;
  //   this.authService.usuario.foto = alumno.foto;
  // }
}
