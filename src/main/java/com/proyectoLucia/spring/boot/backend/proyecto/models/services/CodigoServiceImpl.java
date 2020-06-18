package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.ICodigoDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Codigo;

@Service
public class CodigoServiceImpl implements ICodigoService{

	@Autowired
	private ICodigoDao codigoDao;
	
	@Override
	public Codigo findByRol(String rol) {
		return codigoDao.findByRol(rol);
	}

	@Override
	public Codigo save(Codigo codigo) {
		return codigoDao.save(codigo);
	}

}
