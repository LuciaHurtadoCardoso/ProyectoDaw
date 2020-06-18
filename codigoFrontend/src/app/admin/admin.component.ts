import { Component, OnInit } from '@angular/core';
import { Admin } from './admin';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import {AdminService} from './admin.service';
import swal from "sweetalert2";
import { ProyectoFinalizado } from '../proyecto-finalizado/proyecto-finalizado';
declare var $: any;
import { faEye, faKey, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import {PasswordAdmService} from './password-adm/password-adm.service';
import {ChangeCodigoService} from './change-codigo/change-codigo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allProyectos: ProyectoFinalizado[];
  proyectos: ProyectoFinalizado[];
  faKey=faKey;
  faFingerprint=faFingerprint;
  urlDescarga: string;
  admin:Admin;
  tags: string[] = [];
  convocatorias: [];
  allTag: any[];
  ciclos: [];
  anios: any[];
  cicloFilter: string;
  convocatoriaFilter: string;
  anioFilter: string;
  tagFilter: [];
  errores:string[];
  faEye=faEye;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private adminService:AdminService,
    private router: Router, private passwordAdmService:PasswordAdmService, private changeCode:ChangeCodigoService) { }

  ngOnInit() {
    this.anios = [];
    this.obteniendoCiclos();
    this.obteniendoConvocatorias();
    this.obteniendoTags();

    this.adminService.obtenerProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
      this.allProyectos = proyectos;
      for (let i = 0; i < Object.keys(proyectos).length; i++) {
        if (this.anios.indexOf(proyectos[i].anio) == -1) {
          this.anios.push(proyectos[i].anio);
        }
      }
    })

    setTimeout(() => {
      $(".bs-select-all").hide();
    }, 400);

    this.cicloFilter = "";
    this.convocatoriaFilter = "";
    this.anioFilter = "";
    this.tagFilter = [];

    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        if (this.authService.usuario.rol == "admin") {
          this.adminService.getAdmin(this.authService.usuario.id).subscribe(admin => {
            this.admin = admin;
            this.router.navigate(['/admin/' + this.admin.id]);
          })
        }else{
          swal.fire("Acceso denegado", "No tienes acceso a este contenido", "warning");
          this.router.navigate(['/'+ this.authService.usuario.rol +'/' + this.authService.usuario.id]);
        }
      }
    });
  }

  abrirChange(admin : Admin){
    this.passwordAdmService.abrirChange();
  }

  abrirCode(){
    this.changeCode.abrirCode();
  }

  obtenerTags(proyectoFinalizado: ProyectoFinalizado): boolean {
    this.tags = proyectoFinalizado.tags.split(",");
    if (this.tags.length != 0) {
      return true;
    } else {
      return false;
    }
  }

  obtenerUrl(proyectoFinalizado: ProyectoFinalizado) {
    this.urlDescarga = "http://localhost:8080/api/final/" + proyectoFinalizado.archivo;
  }

  obteniendoTags(): void {
    this.adminService.obteniendoTags().subscribe(tags => {
      this.allTag = tags;
    })
  }

  obteniendoCiclos(): void {
    this.adminService.obteniendoCiclos().subscribe(ciclos => {
      this.ciclos = ciclos;
    })
  }

  obteniendoConvocatorias(): void {
    this.adminService.obteniendoConvocatorias().subscribe(convocatorias => {
      this.convocatorias = convocatorias;
    })
  }

  filter(id: string): void {
    let values = $(`#${id}`).val();
    this.proyectos = [];

    if (id == "ciclo") {
      if (values.length == 0) {
        this.cicloFilter = "";
      } else {
        this.cicloFilter = values;
      }
    } else if (id == "convocatoria") {
      if (values.length == 0) {
        this.convocatoriaFilter = "";
      } else {
        this.convocatoriaFilter = values;
      }
    } else if (id == "anio") {
      if (values.length == 0) {
        this.anioFilter = "";
      } else {
        this.anioFilter = values;
      }
    } else if (id == "tags") {
      if (values.length == 0) {
        this.tagFilter = [];
      } else {
        console.log(values)
        this.tagFilter = values;
      }
    }
    for (let i = 0; i < this.allProyectos.length; i++) {
      if ((this.cicloFilter == "" || this.allProyectos[i].ciclo == this.cicloFilter)
        && (this.convocatoriaFilter == "" || this.allProyectos[i].convocatoria == this.convocatoriaFilter)
        && (this.anioFilter == "" || this.allProyectos[i].anio == parseInt(this.anioFilter))) {
        if(this.tagFilter.length > 0){
          let aux = 0;
          for(let k = 0; k < this.tagFilter.length; k++){
            if(this.allProyectos[i].tags.includes(this.tagFilter[k])){
              aux++;
            }
          }
          if(aux > 0){
            this.proyectos.push(this.allProyectos[i]);
          }
        }else{
          this.proyectos.push(this.allProyectos[i]);
        }
      }
    }
  }

  update(proyecto:ProyectoFinalizado): void {
    this.adminService.mostrarProyecto(proyecto).subscribe(proyecto => {
      swal.fire('Proyecto mostrado con éxito', `El proyecto "${proyecto.titulo}" se encuentra publico de nuevo`, 'success');
      this.ngOnInit();
      this.errores = [];
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }
}
