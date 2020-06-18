package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IConvocatoriaDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Convocatoria;

@Service
public class ConvocatoriaServiceImpl implements IConvocatoriaService{

	@Autowired
	private IConvocatoriaDao convocatoriaDao;
	
	@Override
	public List<Convocatoria> findAll() {
		return convocatoriaDao.findAll();
	}
}
