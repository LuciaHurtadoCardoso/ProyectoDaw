package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.ProyectoFinalizado;

public interface IProyectoFinalizadoService {

	public List<ProyectoFinalizado> findAll();
	
	public ProyectoFinalizado findById(Integer id);
	
	public ProyectoFinalizado save(ProyectoFinalizado proyectoFinalizado); 
}
