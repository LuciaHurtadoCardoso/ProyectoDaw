import { Component, OnInit } from '@angular/core';
declare var $: any;
import { faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PasswordProfService } from './password-prof.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-password-prof',
  templateUrl: './password-prof.component.html',
  styleUrls: ['./password-prof.component.css']
})
export class PasswordProfComponent implements OnInit {

  titulo: string = "Cambiar contraseña";
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTimes = faTimes;
  email: string;
  errores: string[];

  constructor(private changePasswordService: PasswordProfService, private activatedRoute: ActivatedRoute,
    private router: Router, private authService: AuthService) { }

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

  mostrarRepeat(): void {
    if ($("#repeatPassword").attr("type") == "password") {
      $("#repeatPassword").attr("type", "text");
      $("#sinMostrarrepeat").css("display", "none");
      $("#mostradorepeat").css("display", "block");
    } else if ($("#repeatPassword").attr("type") == "text") {
      $("#repeatPassword").attr("type", "password");
      $("#mostradorepeat").css("display", "none");
      $("#sinMostrarrepeat").css("display", "block");
    }
  }

  change(): void {
    if ($("#repeatPassword").val() != $("#password").val()) {
      swal.fire("Las contraseñas no coinciden", "", "error");
    } else {
      this.changePasswordService.update(this.authService.usuario.email, $("#password").val()).subscribe(email => {
        swal.fire('Contraseña cambiada', `Su contraseña ha sido cambiada con éxito.`, 'success');
        this.changePasswordService.cerrarChange();
        this.errores = [];
      },
        err => {
          this.errores = err.error.errors as string[];
        });
    }
  }
}
