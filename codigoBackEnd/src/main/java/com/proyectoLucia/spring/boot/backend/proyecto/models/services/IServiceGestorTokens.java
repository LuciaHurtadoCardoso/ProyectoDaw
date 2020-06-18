package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import org.springframework.data.jpa.repository.Query;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Admin;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Alumno;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;

public interface IServiceGestorTokens {

	@Query("SELECT a FROM Alumno a WHERE a.email = ?1")
	public Alumno findByEmailA(String email);
	
	@Query("SELECT p FROM Profesor p WHERE p.email = ?1")
	public Profesor findByEmailP(String email);

	@Query("SELECT p FROM Admin p WHERE p.email = ?1")
	public Admin findByEmailAd(String email);
}
