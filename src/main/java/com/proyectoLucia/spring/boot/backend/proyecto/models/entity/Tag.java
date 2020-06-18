package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;


@Entity
@Table(name="tag")
public class Tag implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message="no puede estar vacío")
	private String tag;
	
//	@ManyToMany(mappedBy="proyectoEtiqueta")
//	Set<Proyecto> etiquetaProyecto;
	
	@OneToMany(mappedBy = "tag")
	Set <TagProyectoEtiqueta> relacion;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}
	
//	public Set<Proyecto> getEtiquetaProyecto() {
//		return etiquetaProyecto;
//	}
//
//	public void setEtiquetaProyecto(Set<Proyecto> etiquetaProyecto) {
//		this.etiquetaProyecto = etiquetaProyecto;
//	}



	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
