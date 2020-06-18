package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Convocatoria;

public interface IConvocatoriaService {
	public List<Convocatoria> findAll();
}
