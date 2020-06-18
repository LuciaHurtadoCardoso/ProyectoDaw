import { PipeTransform, Pipe } from '@angular/core';
import { AuthService } from '../login/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Pipe({
    name: 'ObteniendoImagen'
})
export class ObteniendoImagen implements PipeTransform {
    constructor(
        private http: HttpClient,
        private auth: AuthService
      ) {}
    
      async transform(src: string): Promise<string> {
        const token = this.auth.token;
        const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        const imageBlob = await this.http.get(src, {headers, responseType: 'blob'}).toPromise();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageBlob);
        });
      }
}
