import { Component, OnInit } from '@angular/core';
import { UserGeneric } from './user-generic';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlumnoService } from '../alumno/alumno.service';
import { ProfesorService } from '../profesor/profesor.service';
import { Alumno } from '../alumno/alumno';
import { Profesor } from '../profesor/profesor';
import { faAmericanSignLanguageInterpreting, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {VerificationService} from '../verification/verification.service';
declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Inicio de sesión';
  usuario: UserGeneric;
  faAmericanSignLanguageInterpreting = faAmericanSignLanguageInterpreting;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  tipo: string;

  constructor(private authService: AuthService, private router: Router, private alumnoService: AlumnoService, 
    private profesorService: ProfesorService, private verificationService : VerificationService) {
    this.usuario = new UserGeneric();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['../' + this.authService.usuario.rol + '/' + this.authService.usuario.id]);
      swal.fire('Ya has iniciado sesión', '', 'info');
    }

  }

  login(): void {
    if (this.usuario.email == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Email o contraseña vacíos', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {

      this.authService.guardarToken(response.access_token);
      this.authService.guardarUsuario(response.access_token);

      this.router.navigate(['/' + this.authService.usuario.rol + '/' + this.authService.usuario.id]);
      swal.fire('Sesión iniciada con éxito', `Hola ${this.authService.usuario.nombre}`, 'success');
    }, error => {
      if (error.status == 400) {
        if (error.error.error_description == "User is disabled") {
          swal.fire("Error", "Debes verificar el email para iniciar sesión", "error");
        } else{
          swal.fire('Error', 'Usuario o clave incorrectas', 'error');
        }
      }
    });
  }

  mostrarPassword(): void {
    if ($("#password").attr("type") == "password") {
      $("#password").attr("type", "text");
      $("#sinMostrar").css("display", "none");
      $("#mostrado").css("display", "block");
    } else if ($("#password").attr("type") == "text") {
      $("#password").attr("type", "password");
      $("#mostrado").css("display", "none");
      $("#sinMostrar").css("display", "block");
    }
  }

  enviarEmail(): void {
    swal.fire({
      title: 'Introduce tu correo',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#FF8B40',
      cancelButtonColor: '#FF4535',
      confirmButtonText: 'Enviar correo',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.emailService(login);
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        swal.fire('Correo enviado con éxito',`En breve, recibirás un correo que te permitirá cambiar tu contraseña`, 'success');
      }
    })
  }

  emailService(email:string):void{
    this.verificationService.enviarEmail(email).subscribe(response =>{
      console.log("Hola")
    });
  }

}
