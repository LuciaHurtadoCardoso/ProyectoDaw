package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IPublicacionDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Publicacion;

@Service
public class PublicacionService implements IPublicacionService{

	@Autowired
	private IPublicacionDao publicacionDao;

	@Override
	@Transactional(readOnly = true)
	public List<Publicacion> publicacionesByProyecto(Integer id) {
		return publicacionDao.publicacionesByProyecto(id);
	}
	
	@Override
	@Transactional
	public Publicacion save(Publicacion publicacion) {
		return publicacionDao.save(publicacion);
	}
	
	@Override
	public Publicacion findById(Integer id) {
		return publicacionDao.findById(id).orElse(null);
	}
}
