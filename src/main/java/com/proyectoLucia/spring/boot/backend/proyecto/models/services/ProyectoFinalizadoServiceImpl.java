package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IProyectoFinalizadoDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.ProyectoFinalizado;

@Service
public class ProyectoFinalizadoServiceImpl implements IProyectoFinalizadoService{
	
	@Autowired
	private IProyectoFinalizadoDao proyectoFinalizadoDao;
	
	@Override
	public List<ProyectoFinalizado> findAll() {
		return proyectoFinalizadoDao.findAll();
	}
	
	@Override
	@Transactional
	public ProyectoFinalizado save(ProyectoFinalizado proyectoFinalizado) {
		return proyectoFinalizadoDao.save(proyectoFinalizado);
	}

	@Override
	public ProyectoFinalizado findById(Integer id) {
		return proyectoFinalizadoDao.findById(id).orElse(null);
	}

}
