package com.proyectoLucia.spring.boot.backend.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Admin;

public interface IAdminDao extends JpaRepository<Admin, Integer>{

	@Query("SELECT a FROM Admin a WHERE a.email = ?1")
	public Admin findByEmail(String email);

}
