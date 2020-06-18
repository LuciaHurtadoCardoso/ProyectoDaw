import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Profesor } from './profesor';
import { ProfesorService } from './profesor.service';
import { AuthService } from '../login/auth.service';
import swal from 'sweetalert2';
import { faUserEdit, faCheck, faKey } from '@fortawesome/free-solid-svg-icons';
import { HttpEventType } from '@angular/common/http';
import {ModalService} from './detalle-prof/modalProf.service';
import { CalificarService } from './proyectos-asignados/calificar/calificar.service';
import {PasswordProfService} from './password-prof/password-prof.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  profesor:Profesor;
  profesorSeleccionado:Profesor;
  private errores:string[];
  faUserEdit = faUserEdit;
  faCheck = faCheck;
  faKey=faKey;

  constructor(private activatedRoute: ActivatedRoute, private profesorService:ProfesorService,
    private authService:AuthService, private router: Router,  private modalService : ModalService,
    private calificarService:CalificarService, private passwordProfService:PasswordProfService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id:number = +params.get('id');
      if(id){
        if(this.authService.usuario.rol == "admin"){
          this.profesorService.getProfesor(id).subscribe(profesor =>{
            this.profesor = profesor;
            this.router.navigate(['/profesor/' + profesor.id]);
          })
        }else{
          this.profesorService.getProfesor(this.authService.usuario.id).subscribe(profesor =>{
            this.profesor = profesor;
            this.router.navigate(['/profesor/' + this.profesor.id]);
          })
        }
      }
    });

    this.modalService.notificarSubida.subscribe(profesor => {
      if (this.profesor.id == profesor.id) {
        this.profesor.foto = profesor.foto;
      }
      return this.profesor;
    });
  }

  abrirModal(profesor : Profesor){
    this.profesorSeleccionado = profesor;
    this.modalService.abrirModal();
  }

  abrirChange(profesor : Profesor){
    this.profesorSeleccionado = profesor;
    this.passwordProfService.abrirChange();
  }

  sinAsignarLink():void{
    location.href = "/proyectos/sinAsignar";
  }

}
