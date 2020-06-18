package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Admin;

public interface IAdminService {

	public Admin findById(Integer id);

	public Admin findByEmail(String email);
	
	public Admin save(Admin admin);
}
