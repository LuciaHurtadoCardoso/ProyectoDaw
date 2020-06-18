import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import swal from 'sweetalert2';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { HttpEventType } from '@angular/common/http';
import { VerificationService } from './verification.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  email: string;
  errores: string[];

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService, private router: Router, private verificationService: VerificationService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let email: string = params.get('email');
        this.email = email;
    });
  }

  verification(): void {
    this.verificationService.update(this.email).subscribe(email => {
      swal.fire('Cuenta verificada', `Su cuenta ha sido verificada con éxito, ya puedes iniciar sesión.`, 'success');
      this.router.navigate(['/login']);
      this.errores = [];
    },
      err => {
        this.errores = err.error.errors as string[];
      });
  }

}
