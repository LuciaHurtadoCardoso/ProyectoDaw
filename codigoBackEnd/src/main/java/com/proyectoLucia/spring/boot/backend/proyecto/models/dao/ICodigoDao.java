package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Codigo;

public interface ICodigoDao  extends JpaRepository<Codigo, String>{

	@Query("SELECT a FROM Codigo a WHERE a.rol = ?1")
	public Codigo findByRol(String rol);
}
