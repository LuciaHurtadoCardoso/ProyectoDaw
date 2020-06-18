package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Convocatoria;

public interface IConvocatoriaDao extends JpaRepository<Convocatoria, String>{

}
