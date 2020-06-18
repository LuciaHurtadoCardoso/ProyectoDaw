package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Alumno;

public interface IAlumnoService {

	public List<Alumno> findAll();

	public Alumno findById(Integer id);

	public Alumno findByEmail(String email);
	
	public Alumno save(Alumno alumno);
}
