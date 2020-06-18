package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;

public interface IProfesorDao extends JpaRepository<Profesor, Integer>{

	@Query("select p from Profesor p where p.email=?1")
	public Profesor findByEmail(String email);
}
