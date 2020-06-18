package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.ICicloDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Ciclo;

@Service
public class CicloServiceImpl implements ICicloService{

	@Autowired
	private ICicloDao cicloDao;
	
	@Override
	public List<Ciclo> findAll() {
		return cicloDao.findAll();
	}

}
