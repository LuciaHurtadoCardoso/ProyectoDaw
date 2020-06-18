package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IAlumnoDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Alumno;

@Service
public class AlumnoServiceImpl implements IAlumnoService{
	

	@Autowired
	private IAlumnoDao alumnoDao;
	
	
	@Override
	public List<Alumno> findAll() {
		return alumnoDao.findAll();
	}
	
	@Override
	public Alumno findById(Integer id) {
		return alumnoDao.findById(id).orElse(null);
	}

	@Override
	public Alumno findByEmail(String email) {
		return alumnoDao.findByEmail(email);
	}

	@Override
	@Transactional
	public Alumno save(Alumno alumno) {
		return alumnoDao.save(alumno);
	}
	
}
