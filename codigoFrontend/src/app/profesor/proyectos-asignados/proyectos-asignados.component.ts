import { Component, OnInit } from '@angular/core';
import { ProyectosAsignadosService } from './proyectos-asignados.service';
import { AuthService } from 'src/app/login/auth.service';
import { ProyectosAsignados } from './proyectos-asignados';
import { faUnlockAlt, faLock, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Proyecto } from 'src/app/alumno/proyectos/proyecto';
import { CalificarService } from './calificar/calificar.service';

@Component({
  selector: 'app-proyectos-asignados',
  templateUrl: './proyectos-asignados.component.html',
  styleUrls: ['./proyectos-asignados.component.css']
})
export class ProyectosAsignadosComponent implements OnInit {

  proyectos:ProyectosAsignados;
  faUnlockAlt = faUnlockAlt;
  faLock = faLock;
  faEdit = faEdit;
  faCheck = faCheck;
  proyectosReverse: any;
  proyectoSeleccionado : Proyecto;

  constructor(private proyectosService: ProyectosAsignadosService, private authService:AuthService,
    private calificarService:CalificarService) { }

  ngOnInit() {
    this.proyectosService.obtenerProyectosAsig(this.authService.usuario.id).subscribe(proyectos =>{
      this.proyectos = proyectos;
      this.reverseProyectos();
    })

    this.calificarService.notificarSubida.subscribe(proyecto => {
      this.proyectosService.obtenerProyectosAsig(this.authService.usuario.id).subscribe(proyectos => {
        this.proyectos = proyectos;
        this.reverseProyectos();
      })
      return this.proyectos;
    })
  }

  reverseProyectos(): void {
    let objAux = [];
    for (let i = Object.keys(this.proyectos).length - 1; i >= 0; i--) {
      objAux.push(this.proyectos[i]);
    }
    this.proyectosReverse = objAux;
  }

  abrirModal(proyecto : Proyecto){
    this.proyectoSeleccionado = proyecto;
    this.calificarService.abrirEdit(proyecto);
  }

}
