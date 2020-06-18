package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IAdminDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Admin;

@Service
public class AdminServiceImpl implements IAdminService{
	
	@Autowired
	private IAdminDao adminDao;

	@Override
	public Admin findById(Integer id) {
		return adminDao.findById(id).orElse(null);
	}

	@Override
	public Admin findByEmail(String email) {
		return adminDao.findByEmail(email);
	}

	@Override
	public Admin save(Admin admin) {
		return adminDao.save(admin);
	}
}
