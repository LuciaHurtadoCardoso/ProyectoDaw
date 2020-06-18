package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="proyecto")
public class Proyecto implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message="no puede estar vacío")
	private String titulo;
	
	private Integer horas;
	
	@NotEmpty(message="no puede estar vacío")
	private String descripcion;
	
	private Integer nota;
	
//	@NotEmpty(message="no puede estar vacío")
	private Boolean estado_proyecto;
	
	@NotEmpty(message="no puede estar vacío")
	private String urlGitHub;
	
	@NotNull(message="no puede estar vacío")
	private Integer anio;
	
	@NotNull(message="no puede estar vacío")
	private String convocatoria_mes;
	
	@JoinColumn(name="ciclo_siglas")
	@NotNull(message="no puede estar vacío")
	private String ciclo_siglas;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="alumno_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Alumno alumno;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="profesor_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Profesor profesor;
	
	@ManyToMany
	@JoinTable(
	  name = "tag_etiqueta_proyecto", 
	  joinColumns = @JoinColumn(name = "proyecto_id"), 
	  inverseJoinColumns = @JoinColumn(name = "tag_id"))
	Set<Tag> proyectoEtiqueta;
	
	@OneToMany(mappedBy = "proyecto")
	Set <TagProyectoEtiqueta> relacion;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Integer getHoras() {
		return horas;
	}

	public void setHoras(Integer horas) {
		this.horas = horas;
	}
	
	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Integer getNota() {
		return nota;
	}

	public void setNota(Integer nota) {
		this.nota = nota;
	}

	public Boolean getEstado_proyecto() {
		return estado_proyecto;
	}

	public void setEstado_proyecto(Boolean estado_proyecto) {
		this.estado_proyecto = estado_proyecto;
	}

	public String getUrlGitHub() {
		return urlGitHub;
	}

	public void setUrlGitHub(String urlGitHub) {
		this.urlGitHub = urlGitHub;
	}
	

	public Alumno getAlumno() {
		return alumno;
	}

	public void setAlumno(Alumno alumno) {
		this.alumno = alumno;
	}

	public Profesor getProfesor() {
		return profesor;
	}

	public void setProfesor(Profesor profesor) {
		this.profesor = profesor;
	}

	public Set<Tag> getProyectoEtiqueta() {
		return proyectoEtiqueta;
	}

	public void setProyectoEtiqueta(Set<Tag> proyectoEtiqueta) {
		this.proyectoEtiqueta = proyectoEtiqueta;
	}

	public Integer getAnio() {
		return anio;
	}

	public void setAnio(Integer anio) {
		this.anio = anio;
	}

	public String getConvocatoria() {
		return convocatoria_mes;
	}

	public void setConvocatoria(String convocatoria_mes) {
		this.convocatoria_mes = convocatoria_mes;
	}

	public String getCiclo_siglas() {
		return ciclo_siglas;
	}

	public void setCiclo_siglas(String ciclo_siglas) {
		this.ciclo_siglas = ciclo_siglas;
	}


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
