package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Comentario;

public interface IComentarioService {

	public List<Comentario> comentarioByPublicacion(Integer id);
	
	public Comentario save(Comentario comentario);
}
