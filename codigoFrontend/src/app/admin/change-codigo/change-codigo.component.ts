import { Component, OnInit } from '@angular/core';
declare var $: any;
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ChangeCodigoService } from './change-codigo.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-change-codigo',
  templateUrl: './change-codigo.component.html',
  styleUrls: ['./change-codigo.component.css']
})
export class ChangeCodigoComponent implements OnInit {

  title: string = "Cambiar código de acceso";
  faTimes = faTimes;
  rol: string;
  codigo: string;
  errores: string[];

  constructor(private changeCode: ChangeCodigoService, private activatedRoute: ActivatedRoute,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.rol = "";
    this.codigo = "";
    this.cargarSelect();
  }

  cargarSelect(): void {
    $(document).ready(() => {
      $('select').selectpicker({
        size: 6,
        width: '100%'
      });
    });
  }

  cerrarCode():void{
    this.changeCode.cerrarCode();
  }

  changeCodeAsRol():void{
    this.changeCode.update(this.rol, this.codigo).subscribe(codigo => {
      swal.fire('Código cambiado', `El código de acceso para el rol ${this.rol} ha sido cambiado con éxito.`, 'success');
      this.changeCode.cerrarCode();
      this.errores = [];
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

}
