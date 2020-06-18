package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.ProyectoFinalizado;

public interface IProyectoFinalizadoDao extends JpaRepository<ProyectoFinalizado, Integer>{
	
}
