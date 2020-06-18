import { Component, OnInit } from '@angular/core';
import { faUnlockAlt, faLock, faEdit, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/login/auth.service';
import { ProySinService } from './proy-sin.service';
import { ProyectoSin } from './proyecto-sin';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-proy-sin-asignar',
  templateUrl: './proy-sin-asignar.component.html',
  styleUrls: ['./proy-sin-asignar.component.css']
})
export class ProySinAsignarComponent implements OnInit {

  proyectos: ProyectoSin[];
  allProyectos: ProyectoSin[];
  faUnlockAlt = faUnlockAlt;
  faLock = faLock;
  faEdit = faEdit;
  faPaperclip = faPaperclip;
  titulo: string = "Proyectos sin asignar";
  private errores: string[];
  convocatorias: [];
  allTag: any[];
  ciclos: [];
  anios: any[];
  cicloFilter: string;
  convocatoriaFilter: string;
  anioFilter: string;
  tagFilter: [];

  constructor(private authService: AuthService, private proyService: ProySinService) { }

  ngOnInit() {
    this.anios = [];
    this.obteniendoCiclos();
    this.obteniendoConvocatorias();
    this.obteniendoTags();
    this.proyService.obtenerProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
      this.allProyectos = proyectos;
      for (let i = 0; i < Object.keys(proyectos).length; i++) {
        if (!this.anios.includes(proyectos[i].anio)) {
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
  }

  obteniendoTags(): void {
    this.proyService.obteniendoTags().subscribe(tags => {
      this.allTag = tags;
    })
  }

  obteniendoCiclos(): void {
    this.proyService.obteniendoCiclos().subscribe(ciclos => {
      this.ciclos = ciclos;
    })
  }

  obteniendoConvocatorias(): void {
    this.proyService.obteniendoConvocatorias().subscribe(convocatorias => {
      this.convocatorias = convocatorias;
    })
  }

  asignarProyecto(proyecto): void {
    proyecto.profesor = this.authService.usuario;
    this.proyService.update(proyecto).subscribe(proyecto => {
      swal.fire('Proyecto asignado', `El proyecto ${proyecto.titulo} ha sido asignado a tu tutoría con éxito`, 'success');
      this.proyService.obtenerProyectos().subscribe(proyectos => {
        this.proyectos = proyectos;
      })
    },
      err => {
        this.errores = err.error.errors as string[];
      });
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
    }

    for (let i = 0; i < this.allProyectos.length; i++) {
      if ((this.cicloFilter == "" || this.allProyectos[i].ciclo_siglas == this.cicloFilter)
        && (this.convocatoriaFilter == "" || this.allProyectos[i].convocatoria == this.convocatoriaFilter)
        && (this.anioFilter == "" || this.allProyectos[i].anio == parseInt(this.anioFilter))) {
        this.proyectos.push(this.allProyectos[i]);
      }
    }
  }
}
