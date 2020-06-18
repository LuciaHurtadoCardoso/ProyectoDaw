import { Component, OnInit, Input } from '@angular/core';
import { ProyectoNewService } from './proyecto-new.service';
import { ProyectosService } from '../proyectos/proyectos.service'
import { Proyecto } from '../proyectos/proyecto';
import { ProyectosComponent } from '../proyectos/proyectos.component';
import swal from 'sweetalert2';
import { AlumnoService } from '../alumno.service';
import { AuthService } from 'src/app/login/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
declare var $: any;

@Component({
  selector: 'app-proyecto-new',
  templateUrl: './proyecto-new.component.html',
  styleUrls: ['./proyecto-new.component.css']
})
export class ProyectoNewComponent implements OnInit {

  @Input() proyectos: Proyecto;
  private proyecto: Proyecto = new Proyecto();
  private errores: string[];
  private tags: any[];
  private ciclos: string[];
  private convocatorias: string[];
  tituloNew: string = "Nuevo Proyecto";
  private auxObj: string[];
  faTimes = faTimes;
  tagsNewId: any[];
  tagsNew: string;
  private soloTags: string[];

  constructor(private proyectoNewService: ProyectoNewService,
    private alumnoService: AlumnoService,
    private authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private proyectosService: ProyectosService) { this.tagsNew = ""; }

  ngOnInit() {
    this.tagsNewId = [];
    this.tags = [];
    this.soloTags = [];
    this.obteniendoTags();
    this.obteniendoCiclos();
    this.obteniendoConvocatorias();
    this.proyectosService.obtenerProyectos(this.authService.usuario.id).subscribe(proyectos => {
      this.proyectos = proyectos;
    })
  }

  create(): void {
    let objAux = [];
    if (this.tagsNew != "") {
      this.newTags();
      setTimeout(() => {
        for (let i = 0; i < this.tagsNewId.length; i++) {
          let obj = new Object();
          obj["id"] = parseInt(this.tagsNewId[i].id);
          obj["tag"] = this.tagsNewId[i].tag;
          objAux.push(obj);
        }
      }, 500);
    }
    setTimeout(() => {
      this.auxObj = $('#selectTag').val();
      if (this.auxObj.length > 0) {
        for (let i = 0; i < this.auxObj.length; i++) {
          let aux = this.auxObj[i].split(",");
          let obj = new Object();
          obj["id"] = parseInt(aux[0]);
          obj["tag"] = aux[1];
          objAux.push(obj);
        }
      }
    }, 500);
    
    setTimeout(() => {
      this.proyecto.alumno = this.authService.usuario;
      console.log(objAux)
      this.proyecto.proyectoEtiqueta = objAux;
      this.proyecto.estado_proyecto = true;
      this.proyecto.anio = new Date().getFullYear();
      this.alumnoService.createProy(this.proyecto).subscribe(proyecto => {
        this.proyectoNewService.notificarNewProyecto.emit(this.proyecto);
        swal.fire('Proyecto creado con éxito', `¡A POR TODAS!`, 'success');
        this.proyectoNewService.cerrarModalProy();
        this.errores = [];
        this.router.navigate([`alumno/${this.authService.usuario.id}`]);
      },
        err => {
          this.errores = err.error.errors as string[];
        });
    }, 600);
  }

  obteniendoTags(): void {
    this.alumnoService.obteniendoTags().subscribe(tags => {
      this.tags = tags;
      for (let i = 0; i < Object.keys(tags).length; i++) {
        this.soloTags.push(tags[i].tag.toUpperCase());
      }
    })
  }

  obteniendoCiclos(): void {
    this.alumnoService.obteniendoCiclos().subscribe(ciclos => {
      this.ciclos = ciclos;
      this.cargarSelect();
    })
  }

  obteniendoConvocatorias(): void {
    this.alumnoService.obteniendoConvocatorias().subscribe(convocatorias => {
      this.convocatorias = convocatorias;
      this.cargarSelect();
    })
  }

  cargarSelect(): void {
    $(document).ready(() => {
      $('select').selectpicker({
        size: 6,
        liveSearch: true,
        width: '100%'
      });
    });
  }

  newTags(): void {
    if (this.tagsNew.indexOf(",") != -1) {
      let newTag: string[] = this.tagsNew.split(",");
      for (let i = 0; i < newTag.length; i++) {
        newTag[i] = newTag[i].trim();
        if (this.soloTags.indexOf(newTag[i].toUpperCase()) != -1) {
          let obj = new Object();
          let position = this.soloTags.indexOf(newTag[i].toUpperCase());
          obj["id"] = this.tags[position].id;
          obj["tag"] = this.tags[position].tag;
          this.tagsNewId.push(obj);
        } else {
          this.proyectoNewService.nuevosTag(newTag[i]).subscribe(tag => {
            let obj = new Object();
            obj["id"] = tag.id;
            obj["tag"] = tag.tag;
            this.tagsNewId.push(obj);
          });
        }
      }
    } else {
      if (this.soloTags.indexOf(this.tagsNew.toUpperCase()) != -1) {
        let obj = new Object();
        let position = this.soloTags.indexOf(this.tagsNew.toUpperCase());
        obj["id"] = this.tags[position].id;
        obj["tag"] = this.tags[position].tag;
        this.tagsNewId.push(obj);
      } else {
        this.proyectoNewService.nuevosTag(this.tagsNew).subscribe(tag => {
          let obj = new Object();
          obj["id"] = tag.id;
          obj["tag"] = tag.tag;
          this.tagsNewId.push(obj);
        });
      }
    }
  }
}
