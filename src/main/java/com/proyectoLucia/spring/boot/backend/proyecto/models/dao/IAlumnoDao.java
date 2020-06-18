package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Alumno;

public interface IAlumnoDao extends JpaRepository<Alumno, Integer>{
	
	@Query("SELECT a FROM Alumno a WHERE a.email = ?1")
	public Alumno findByEmail(String email);

}
