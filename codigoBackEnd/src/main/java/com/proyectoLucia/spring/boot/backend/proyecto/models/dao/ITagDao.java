package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Tag;

public interface ITagDao  extends JpaRepository<Tag, Integer>{

}
