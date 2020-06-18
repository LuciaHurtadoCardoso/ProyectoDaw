package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Proyecto;

public interface IProyectoService {

	public List<Proyecto> findAllProyectosByAlumno(Integer id);
	
	public List<Proyecto> findAllProyectosByProfesor(Integer id);
	
	public List<Proyecto> findAllProyectosSinAsignar();
	
	public List<Proyecto> findAll();
	
	public Proyecto findById(Integer id);
	
	public Proyecto save(Proyecto proyecto);
	
	public void eliminarTag(Integer tag_id, Integer proyecto_id);
}
