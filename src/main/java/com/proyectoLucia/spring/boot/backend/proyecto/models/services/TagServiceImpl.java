package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.ITagDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Tag;

@Service
public class TagServiceImpl implements ITagService{
	
	@Autowired
	private ITagDao tagDao;
	
	@Override
	public List<Tag> findAll() {
		return tagDao.findAll();
	}
	
	@Override
	public Tag findById(Integer id) {
		return tagDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Tag save(Tag tag) {
		return tagDao.save(tag);
	}
	
	
}
