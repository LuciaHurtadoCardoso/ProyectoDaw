package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Convocatoria;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IConvocatoriaService;

@RestController
@RequestMapping("/api")
public class ConvocatoriaRestController {

	@Autowired
	private IConvocatoriaService convocatoriaService;
	
	@GetMapping("/convocatorias")
	public List<Convocatoria> index(){
		return convocatoriaService.findAll();
	}
}
