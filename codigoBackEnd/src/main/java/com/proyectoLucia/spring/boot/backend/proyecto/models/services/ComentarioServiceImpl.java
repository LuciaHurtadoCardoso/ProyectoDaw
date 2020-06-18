package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IComentarioDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Comentario;

@Service
public class ComentarioServiceImpl implements IComentarioService{

	@Autowired
	private IComentarioDao comentarioDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Comentario> comentarioByPublicacion(Integer id){
		return comentarioDao.comentarioByPublicacion(id);
	}

	@Override
	public Comentario save(Comentario comentario) {
		return comentarioDao.save(comentario);
	}
}
