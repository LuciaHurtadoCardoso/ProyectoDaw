package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="publicacion")
public class Publicacion implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer id;
	
	private String archivo;
	
	@NotNull(message="no puede estar vacío")
	@Column(name="fecha")
	@Temporal(TemporalType.DATE)
	private Date fecha;
	
	@NotEmpty(message="no puede estar vacío")
	private String texto;
	
	private Integer proyecto_id;
	
	@Transient
	public List<Comentario> comentarios;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getArchivo() {
		return archivo;
	}

	public void setArchivo(String archivo) {
		this.archivo = archivo;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Integer getProyecto() {
		return proyecto_id;
	}

	public void setProyecto(Integer proyecto_id) {
		this.proyecto_id = proyecto_id;
	}

	public List<Comentario> getComentarios() {
		return comentarios;
	}

	public void setComentarios(List<Comentario> comentarios) {
		this.comentarios = comentarios;
	}



	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
