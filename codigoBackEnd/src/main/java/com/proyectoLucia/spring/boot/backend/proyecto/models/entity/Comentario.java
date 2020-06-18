package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="comentario")
public class Comentario implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull(message="no puede estar vacío")
	private String texto;
	
	@NotNull(message="no puede estar vacío")
	private String role;
	
	@NotNull(message="no puede estar vacío")
	private Integer id_usuario;
	
	@NotNull(message="no puede estar vacío")
	@Column(name="fecha")
	@Temporal(TemporalType.DATE)
	private Date fecha;
	
	@NotNull(message="no puede estar vacío")
	private Integer publicacion_id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(Integer id_usuario) {
		this.id_usuario = id_usuario;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Integer getPublicacion_id() {
		return publicacion_id;
	}

	public void setPublicacion_id(Integer publicacion_id) {
		this.publicacion_id = publicacion_id;
	}
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
