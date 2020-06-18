import { Alumno } from '../alumno';
import { Profesor } from 'src/app/profesor/profesor';

export class Proyecto {
    id: number;    
    titulo: string;
    descripcion: string;
    horas:number;
    nota:number;
    estado_proyecto:boolean;
    urlGitHub:string;
    anio:number;
    convocatoria:string;
    ciclo_siglas:string;
    alumno:Alumno;
    profesor:Profesor;
    proyectoEtiqueta:any;
}
