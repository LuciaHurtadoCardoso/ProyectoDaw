package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class TagProyecto implements Serializable {

	@Column(name = "tag_id")
    Integer tagId;
 
    @Column(name = "proyecto_id")
    Integer proyectoId;
    
    public Integer getTagId() {
		return tagId;
	}

	public void setTagId(Integer tagId) {
		this.tagId = tagId;
	}
	
	public Integer getProyectoId() {
		return proyectoId;
	}

	public void setProyectoId(Integer proyectoId) {
		this.proyectoId = proyectoId;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
