package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Publicacion;

public interface IPublicacionDao extends JpaRepository<Publicacion, Integer>{

	@Query( value = "SELECT * FROM Publicacion where proyecto_id=?1", 
			  nativeQuery = true)
	public List<Publicacion> publicacionesByProyecto(Integer id);
}
