package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="proyecto_finalizado")
public class ProyectoFinalizado implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message="no puede estar vacío")
	private String url;
	
	@NotEmpty(message="no puede estar vacío")
	private String descripcion;
	
	@NotEmpty(message="no puede estar vacío")
	private String titulo;
	
	private Integer anio;
	
	@NotEmpty(message="no puede estar vacío")
	private String ciclo;
	
	@NotEmpty(message="no puede estar vacío")
	private String alumno;
	
	@NotEmpty(message="no puede estar vacío")
	private String tutor;
	
	private Integer horas;
	
	@NotEmpty(message="no puede estar vacío")
	private String convocatoria;
	
	private Boolean mostrado;
	
	private String tags;
	
	private String archivo;
	
	@Transient
	private List<String> archivos;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}

	public String getCiclo() {
		return ciclo;
	}

	public void setCiclo(String ciclo) {
		this.ciclo = ciclo;
	}

	public String getAlumno() {
		return alumno;
	}

	public void setAlumno(String alumno) {
		this.alumno = alumno;
	}

	public String getTutor() {
		return tutor;
	}

	public void setTutor(String tutor) {
		this.tutor = tutor;
	}

	public Integer getHoras() {
		return horas;
	}

	public void setHoras(Integer horas) {
		this.horas = horas;
	}

	public String getConvocatoria() {
		return convocatoria;
	}

	public void setConvocatoria(String convocatoria) {
		this.convocatoria = convocatoria;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getArchivo() {
		return archivo;
	}

	public void setArchivo(String archivo) {
		this.archivo = archivo;
	}

	public List<String> getArchivos() {
		return archivos;
	}

	public void setArchivos(List<String> archivos) {
		this.archivos = archivos;
	}

	public Boolean isMostrado() {
		return mostrado;
	}

	public void setMostrado(Boolean mostrado) {
		this.mostrado = mostrado;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
}
