package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name="ciclo")
public class Ciclo implements Serializable{

	@Id
	private String siglas;
	
	@NotEmpty(message="no puede estar vacío")
	private String nombre;
	
	@NotEmpty(message="no puede estar vacío")
	private String categoria;
	
	public String getSiglas() {
		return siglas;
	}
	
	public void setSiglas(String siglas) {
		this.siglas = siglas;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
