package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Publicacion;

public interface IPublicacionService {

	public List<Publicacion> publicacionesByProyecto(Integer id);
	
	public Publicacion save(Publicacion publicacion);
	
	public Publicacion findById(Integer id);
}
