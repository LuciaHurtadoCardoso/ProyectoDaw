import { Component, OnInit } from '@angular/core';
import { ProyectoFinalizado } from './proyecto-finalizado';
import { ProyectoFinalizadoService } from './proyecto-finalizado.service';
import { FooterComponent } from '../footer/footer.component';
declare var $: any;
import swal from "sweetalert2";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-proyecto-finalizado',
  templateUrl: './proyecto-finalizado.component.html',
  styleUrls: ['./proyecto-finalizado.component.css']
})
export class ProyectoFinalizadoComponent implements OnInit {

  allProyectos: ProyectoFinalizado[];
  proyectos: ProyectoFinalizado[];
  tags: string[] = [];
  urlDescarga: string;
  convocatorias: [];
  allTag: any[];
  ciclos: [];
  anios: any[];
  cicloFilter: string;
  convocatoriaFilter: string;
  anioFilter: string;
  tagFilter: [];
  errores:string[];
  faEyeSlash=faEyeSlash;

  constructor(private proyectoFinalizado: ProyectoFinalizadoService,private authService: AuthService) { }

  ngOnInit() {
    this.anios = [];
    this.proyectoFinalizado.obtenerProyectos().subscribe(proyectos => {
      this.proyectos = proyectos;
      this.allProyectos = proyectos;
      for (let i = 0; i < Object.keys(proyectos).length; i++) {
        if (this.anios.indexOf(proyectos[i].anio) == -1) {
          this.anios.push(proyectos[i].anio);
        }
      }
    })
    this.obteniendoCiclos();
    this.obteniendoConvocatorias();
    this.obteniendoTags();

    setTimeout(() => {
      $(".bs-select-all").hide();
    }, 400);

    this.cicloFilter = "";
    this.convocatoriaFilter = "";
    this.anioFilter = "";
    this.tagFilter = [];
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
    this.proyectoFinalizado.obteniendoTags().subscribe(tags => {
      this.allTag = tags;
    })
  }

  obteniendoCiclos(): void {
    this.proyectoFinalizado.obteniendoCiclos().subscribe(ciclos => {
      this.ciclos = ciclos;
    })
  }

  obteniendoConvocatorias(): void {
    this.proyectoFinalizado.obteniendoConvocatorias().subscribe(convocatorias => {
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
    this.proyectoFinalizado.mostrarProyecto(proyecto).subscribe(proyecto => {
      swal.fire('Proyecto mostrado con éxito', `El proyecto "${proyecto.titulo}" se encuentra publico de nuevo`, 'success');
      this.ngOnInit();
      this.errores = [];
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }
}
