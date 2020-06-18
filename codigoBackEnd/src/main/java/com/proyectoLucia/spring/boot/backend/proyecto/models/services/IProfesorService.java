package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;

public interface IProfesorService {

	public List<Profesor> findAll();

	public Profesor findById(Integer id);

	public Profesor findByEmail(String email);
	
	public Profesor save(Profesor profesor);
}
