package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Ciclo;

public interface ICicloService {

	public List<Ciclo> findAll();
}
