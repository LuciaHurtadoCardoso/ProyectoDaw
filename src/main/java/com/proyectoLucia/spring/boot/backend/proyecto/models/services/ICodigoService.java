package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Codigo;

public interface ICodigoService {

	public Codigo findByRol(String rol);
	
	public Codigo save(Codigo codigo);
}
