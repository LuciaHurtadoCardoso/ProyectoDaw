package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name="profesor")
public class Profesor implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message="no puede estar vacío")
	@Size(min=4, max=12, message="debe estar comprendido entre 4 y 12 caracteres")
	private String nombre;
	
	@NotEmpty(message="no puede estar vacío")
	private String apellidos;
	
	@NotEmpty(message="no puede estar vacío")
	@Email(message="no es una dirreción de correo válida")
	@Column(unique=true)
	private String email;
	
	@Column(length=60)
	private String password;
	
	
	private Boolean enabled;
	private String foto;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getFoto() {
		return foto;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
