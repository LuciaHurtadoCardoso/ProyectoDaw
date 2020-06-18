import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from './usuario';
declare var $: any;
import swal from 'sweetalert2';
import { RegistroService } from './registro.service';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
declare var $: any;
import {Codigo} from './codigo';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  titulo: string = 'Registro';
  usuario:Usuario;
  codigo:string;
  codigoBackend:String;
  rol:string;
  faEye=faEye;
  faEyeSlash=faEyeSlash;

  constructor(private registroService:RegistroService, private router: Router) {
    this.usuario = new Usuario();
    this.codigo="";
    this.rol="";
  }

  ngOnInit() {
    this.cargarSelect();
  }

  registro():void{
    this.verCodigo();
    if($("#password").val() != $("#repeatPassword").val()){
      swal.fire("Error", "Las contraseñas no coinciden", "error");
    }else if(this.codigoBackend != this.codigo){
      swal.fire("Error", "El código no es correcto", "error");
    }else{
      if(this.rol == "profesor"){
        this.registroService.createProfesor(this.usuario, this.codigo).subscribe(profesor =>{
          swal.fire("Usuario creado con éxito", "El usuario ha sido creado con éxito, ahora debes verificar el correo, para poder iniciar sesión.", "success");
          this.router.navigate(['/login']);
          this.registroService.enviarEmail(profesor.email).subscribe();
        });
      }else if(this.rol == "alumno"){
        this.registroService.createAlumno(this.usuario).subscribe(alumno =>{
          swal.fire("Usuario creado con éxito", "El usuario ha sido creado con éxito, ahora debes verificar el correo, para poder iniciar sesión.", "success");
          this.router.navigate(['/login']);
          this.registroService.enviarEmail(alumno.email).subscribe();
        });
      }
    }
  }

  cargarSelect(): void {
    $(document).ready(() => {
      $('select').selectpicker({
        size: 6,
        width: '100%'
      });
    });
  }

  mostrarPassword():void{
    if($("#password").attr("type") == "password"){
      $("#password").attr("type", "text");
      $("#sinMostrarpass").css("display", "none");
      $("#mostradopass").css("display", "block");
    }else if($("#password").attr("type") == "text"){
      $("#password").attr("type", "password");
      $("#mostradopass").css("display", "none");
      $("#sinMostrarpass").css("display", "block");
    }
  }

  mostrarRepeat():void{
    if($("#repeatPassword").attr("type") == "password"){
      $("#repeatPassword").attr("type", "text");
      $("#sinMostrarrepeat").css("display", "none");
      $("#mostradorepeat").css("display", "block");
    }else if($("#repeatPassword").attr("type") == "text"){
      $("#repeatPassword").attr("type", "password");
      $("#mostradorepeat").css("display", "none");
      $("#sinMostrarrepeat").css("display", "block");
    }
  }

  verCodigo():void{
    this.registroService.verCodigo(this.rol).subscribe(codigo =>{
      this.codigoBackend = codigo.codigo;
    });
  }

}
