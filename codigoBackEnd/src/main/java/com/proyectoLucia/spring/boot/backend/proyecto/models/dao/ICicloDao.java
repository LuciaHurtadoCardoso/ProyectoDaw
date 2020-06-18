package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Ciclo;

public interface ICicloDao extends JpaRepository<Ciclo, String>{

}
