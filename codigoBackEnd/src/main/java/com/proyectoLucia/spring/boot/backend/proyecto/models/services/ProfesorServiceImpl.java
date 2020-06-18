package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IProfesorDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;

@Service
public class ProfesorServiceImpl implements IProfesorService{
	
	@Autowired
	private IProfesorDao profesorDao;
	
	@Override
	public List<Profesor> findAll() {
		return profesorDao.findAll();
	}

	@Override
	public Profesor findById(Integer id) {
		return profesorDao.findById(id).orElse(null);
	}
	
	@Override
	public Profesor findByEmail(String email) {
		return profesorDao.findByEmail(email);
	}
	
	@Override
	@Transactional
	public Profesor save(Profesor profesor) {
		return profesorDao.save(profesor);
	}


}
