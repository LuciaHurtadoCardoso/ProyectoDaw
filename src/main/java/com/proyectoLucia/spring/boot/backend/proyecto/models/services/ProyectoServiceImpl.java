package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IProyectoDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Proyecto;

@Service
public class ProyectoServiceImpl implements IProyectoService{
	
	@Autowired
	private IProyectoDao proyectoDao;

	@Override
	public Proyecto findById(Integer id) {
		return proyectoDao.findById(id).orElse(null);
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<Proyecto> findAllProyectosByAlumno(Integer id) {
		return proyectoDao.findAllProyectosByAlumno(id);
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<Proyecto> findAllProyectosByProfesor(Integer id) {
		return proyectoDao.findAllProyectosByProfesor(id);
	}
	
	@Override
	@Transactional
	public Proyecto save(Proyecto proyecto) {
		return proyectoDao.save(proyecto);
	}
	
	@Override
	public List<Proyecto> findAll() {
		return proyectoDao.findAll();
	}
	
	@Override
	public List<Proyecto> findAllProyectosSinAsignar(){
		return proyectoDao.findAllProyectosSinAsignar();
	}

	@Override
	@Transactional
	public void eliminarTag(Integer tag_id, Integer proyecto_id) {
		proyectoDao.eliminarTag(tag_id, proyecto_id);
	}

}
