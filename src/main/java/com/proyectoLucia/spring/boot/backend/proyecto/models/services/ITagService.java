package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Tag;

public interface ITagService {

	public List<Tag> findAll();
	
	public Tag findById(Integer id);
	
	public Tag save(Tag tag);
}
