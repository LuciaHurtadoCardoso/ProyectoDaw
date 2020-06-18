package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Proyecto;

public interface IProyectoDao extends JpaRepository<Proyecto, Integer>{
	
	@Query( value = "SELECT * FROM Proyecto where alumno_id=?1", 
			  nativeQuery = true)
	public List<Proyecto> findAllProyectosByAlumno(Integer id);
	
	@Query( value = "SELECT * FROM Proyecto where profesor_id=?1 and estado_proyecto = 1", 
			  nativeQuery = true)
	public List<Proyecto> findAllProyectosByProfesor(Integer id);
	
	@Query( value = "SELECT * FROM proyecto_proyectos.proyecto where profesor_id is null  and estado_proyecto = 1;", 
			  nativeQuery = true)
	public List<Proyecto> findAllProyectosSinAsignar();
	
	@Modifying
	@Query(value = "DELETE FROM `proyecto_proyectos`.`tag_etiqueta_proyecto` WHERE (`tag_id` = :tag_id) and (`proyecto_id` = :proyecto_id);",
			nativeQuery = true)
	public void eliminarTag(@Param("tag_id")Integer tag_id, @Param("proyecto_id")Integer proyecto_id);
}