package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Comentario;

public interface IComentarioDao extends JpaRepository<Comentario, Integer>{

	@Query( value = "SELECT * FROM Comentario where publicacion_id=?1", 
			  nativeQuery = true)
	public List<Comentario> comentarioByPublicacion(Integer id);
}
