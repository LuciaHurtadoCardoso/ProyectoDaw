package com.proyectoLucia.spring.boot.backend.proyecto.models.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name="tag_etiqueta_proyecto")
public class TagProyectoEtiqueta {

	@EmbeddedId
	TagProyecto id;
	
	@ManyToOne
	@MapsId("proyecto_id")
	@JoinColumn(name="proyecto_id")
	Proyecto proyecto;
	
	@ManyToOne
	@MapsId("tag_id")
	@JoinColumn(name="tag_id")
	Tag tag;
	
	int relacion;

	public TagProyecto getId() {
		return id;
	}

	public void setId(TagProyecto id) {
		this.id = id;
	}

	public Proyecto getProyecto() {
		return proyecto;
	}

	public void setProyecto(Proyecto proyecto) {
		this.proyecto = proyecto;
	}

	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

	public int getRelacion() {
		return relacion;
	}

	public void setRelacion(int relacion) {
		this.relacion = relacion;
	}
	
	
}
