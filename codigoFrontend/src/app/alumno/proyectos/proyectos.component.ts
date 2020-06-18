import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from './proyectos.service';
import { AuthService } from 'src/app/login/auth.service';
import { Proyecto } from './proyecto';
import { faUnlockAlt, faLock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ProyectoNewService } from '../proyecto-new/proyecto-new.service';
import {EditService} from '../edit-proyecto/edit.service'

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto;
  proyectosReverse: any;
  proyecto: Proyecto;
  proyectoSeleccionado: Proyecto;
  faUnlockAlt = faUnlockAlt;
  faLock = faLock;
  faEdit = faEdit;
  activos: boolean;

  constructor(private proyectosService: ProyectosService, private activatedRoute: ActivatedRoute, private authService: AuthService,
    private proyectoNewService: ProyectoNewService, private editService : EditService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        if (this.authService.usuario.rol == "alumno") {
          this.proyectosService.obtenerProyectos(this.authService.usuario.id).subscribe(proyectos => {
            this.proyectos = proyectos;
            this.activos = this.tieneActivo();
            this.reverseProyectos();
          })
        } else {
          this.proyectosService.obtenerProyectos(id).subscribe(proyectos => {
            this.proyectos = proyectos;
            this.reverseProyectos();
          })
        }
      }
    });

    this.proyectoNewService.notificarNewProyecto.subscribe(proyecto => {
      this.proyectosService.obtenerProyectos(this.authService.usuario.id).subscribe(proyectos => {
        this.proyectos = proyectos;
        this.activos = this.tieneActivo();
        this.reverseProyectos();
      })
      return this.proyectos;
    })

  }

  tieneActivo(): boolean {
    let length = Object.keys(this.proyectos).length;

    for (let i = 0; i < length; i++) {
      if (this.proyectos[i].estado_proyecto) {
        return true;
      }
    }
    return false;
  }

  abrirModalProy() {
    this.proyectoNewService.abrirModalProy();
  }

  abrirEdit(proyecto: Proyecto) {
    this.proyectoSeleccionado = proyecto;
    this.editService.abrirEdit(proyecto);
  }

  reverseProyectos(): void {
    let objAux = [];
    for (let i = Object.keys(this.proyectos).length - 1; i >= 0; i--) {
      objAux.push(this.proyectos[i]);
    }
    this.proyectosReverse = objAux;
  }
}
