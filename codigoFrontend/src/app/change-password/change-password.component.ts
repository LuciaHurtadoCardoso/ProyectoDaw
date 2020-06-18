import { Component, OnInit } from '@angular/core';
declare var $: any;
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {ChangePasswordService} from './change-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  faEye=faEye;
  faEyeSlash=faEyeSlash;
  email:string;
  errores:string[];

  constructor(private changePasswordService:ChangePasswordService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let email: string = params.get('email');
        this.email = email;
    });
  }

  mostrarPassword(): void {
    if ($("#password").attr("type") == "password") {
      $("#password").attr("type", "text");
      $("#sinMostrarpass").css("display", "none");
      $("#mostradopass").css("display", "block");
    } else if ($("#password").attr("type") == "text") {
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

  verification(): void {
    if($("#repeatPassword").val() != $("#password").val()){
      swal.fire("Las contraseñas no coinciden", "", "error")
    }else{
      this.changePasswordService.update(this.email, $("#password").val()).subscribe(email => {
        swal.fire('Contraseña restablecida', `Su contraseña ha sido restablecida con éxito, ya puedes iniciar sesión.`, 'success');
        this.router.navigate(['/login']);
        this.errores = [];
      },
        err => {
          this.errores = err.error.errors as string[];
        });
    }
    
  }

}
