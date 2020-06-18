import { Alumno } from 'src/app/alumno/alumno';
import { Profesor } from '../profesor';

export class ProyectosAsignados {
    id: number;    
    titulo: string;
    descripcion: string;
    horas:number;
    nota:number;
    estado_proyecto:boolean;
    urlGitHub:string;
    anio:number;
    convocatoria:number;
    ciclo_siglas:string;
    alumno:Alumno;
    profesor:Profesor;
    proyectoEtiqueta:any;
}

