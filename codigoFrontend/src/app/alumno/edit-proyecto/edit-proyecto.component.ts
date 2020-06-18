import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from '../proyectos/proyecto'
import { EditService } from './edit.service'
import swal from 'sweetalert2';
import { AlumnoService } from '../alumno.service';
declare var $: any;
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  proyecto: Proyecto;
  proyectoSeleccionado: Proyecto;
  encabezado: string = "Editar proyecto";
  private errores: string[];
  private tags: any[];
  private soloTags: string[];
  private ciclos: string[];
  private convocatorias: string[];
  private auxObj: string[];
  faTimes = faTimes;
  tagsNew: string;
  tagsNewId: any[];
  private allTags: any[];
  private allTagProyecto: string[];

  constructor(private editService: EditService, private alumnoService: AlumnoService) {
    this.tagsNew = "";
  }

  ngOnInit() {
    document.body.style.overflow = "hidden";
    this.tagsNewId = [];
    this.tags = [];
    this.soloTags = [];
    this.allTags = [];
    this.allTagProyecto = [];
    this.obteniendoTags();
    this.obteniendoCiclos();
    this.obteniendoConvocatorias();
    this.proyecto = this.editService.proyecto;
    for (let i = 0; i < this.proyecto.proyectoEtiqueta.length; i++) {
      this.allTagProyecto.push(this.proyecto.proyectoEtiqueta[i].tag.toUpperCase());
    }
  }

  update(proyecto: Proyecto): void {
    if (this.tagsNew != "") {
      this.newTags();
      setTimeout(() => {
        for (let i = 0; i < this.tagsNewId.length; i++) {
          let obj = new Object();
          obj["id"] = parseInt(this.tagsNewId[i].id);
          obj["tag"] = this.tagsNewId[i].tag;
          this.proyecto.proyectoEtiqueta.push(obj);
        }
      }, 500);
    }
    setTimeout(() => {
      this.auxObj = $('#selectTag').val();
      if (this.auxObj.length > 0) {
        let objAux = [];
        for (let i = 0; i < this.auxObj.length; i++) {
          let aux = this.auxObj[i].split(",");
          let obj = new Object();
          obj["id"] = parseInt(aux[0]);
          obj["tag"] = aux[1];
          objAux.push(obj);
        }
        for (let i = 0; i < objAux.length; i++) {
          this.proyecto.proyectoEtiqueta.push(objAux[i]);
        }
      }
    }, 500);
    setTimeout(() => {
      this.editService.update(this.proyecto).subscribe(proyecto => {
        swal.fire('Proyecto actualizado', `El proyecto ${proyecto.titulo} ha sido actualizado con éxito`, 'success');
        this.editService.cerrarEdit();
        this.errores = [];
      },
        err => {
          this.errores = err.error.errors as string[];
        });
    }, 600);

  }

  obteniendoTags(): void {
    this.alumnoService.obteniendoTags().subscribe(tags => {
      this.allTags = tags;
      let objAux = [];
      for (let i = 0; i < Object.keys(tags).length; i++) {
        if (this.proyecto.proyectoEtiqueta.findIndex(x => x.id === tags[i].id) == -1) {
          let obj = new Object();
          obj["id"] = tags[i].id;
          obj["tag"] = tags[i].tag;
          objAux.push(obj);
        }
      }
      this.tags = objAux;

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
        size: 4,
        liveSearch: true,
        width: '100%'
      });
    });
  }

  eliminarTag(tag): void {

    this.editService.eliminarTag(tag.id).subscribe(proyecto => {
      this.proyecto.proyectoEtiqueta = proyecto.proyectoEtiqueta;
      let obj = new Object();
      obj["id"] = tag.id;
      obj["tag"] = tag.tag;
      this.tags.push(obj);
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 500);

    })
  }

  newTags(): void {
    if (this.tagsNew.indexOf(",") != -1) {
      let newTag: string[] = this.tagsNew.split(",");
      for (let i = 0; i < newTag.length; i++) {
        newTag[i] = newTag[i].trim();
        if (this.soloTags.indexOf(newTag[i].toUpperCase()) != -1) {
          console.log("2")
          if (this.allTagProyecto.indexOf(newTag[i].toUpperCase()) == -1) {
            console.log("3")
            let obj = new Object();
            let position = this.soloTags.indexOf(newTag[i].toUpperCase());
            obj["id"] = this.allTags[position].id;
            obj["tag"] = this.allTags[position].tag;
            this.tagsNewId.push(obj);
          }
        } else {
          this.editService.nuevosTag(newTag[i]).subscribe(tag => {
            let obj = new Object();
            obj["id"] = tag.id;
            obj["tag"] = tag.tag;
            this.tagsNewId.push(obj);
          });
        }
      }
    } else {
      console.log(this.soloTags.indexOf(this.tagsNew.toUpperCase()) != -1)
      console.log(this.soloTags)
      console.log(this.tagsNew.toUpperCase())
      
      if (this.soloTags.indexOf(this.tagsNew.toUpperCase()) != -1) {
        if (this.allTagProyecto.indexOf(this.tagsNew.toUpperCase()) == -1) {
          let obj = new Object();
          let position = this.soloTags.indexOf(this.tagsNew.toUpperCase());
          obj["id"] = this.allTags[position].id;
          obj["tag"] = this.allTags[position].tag;
          this.tagsNewId.push(obj);
        }
      } else {
        this.editService.nuevosTag(this.tagsNew).subscribe(tag => {
          let obj = new Object();
          obj["id"] = tag.id;
          obj["tag"] = tag.tag;
          this.tagsNewId.push(obj);
        });
      }
    }
  }
}
