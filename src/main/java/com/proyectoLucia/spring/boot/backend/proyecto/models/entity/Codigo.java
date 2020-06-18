package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="codigo")
public class Codigo implements Serializable{

	@Id
	private Integer id;
	
	@NotEmpty(message="no puede estar vacío")
	private String rol;
	
	@NotEmpty(message="no puede estar vacío")
	private String codigo;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
