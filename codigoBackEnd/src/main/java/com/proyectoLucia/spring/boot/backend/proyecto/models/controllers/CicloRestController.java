package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Ciclo;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.ICicloService;

@RestController
@RequestMapping("/api")
public class CicloRestController {

	@Autowired
	private ICicloService cicloService;
	
	@GetMapping("/ciclos")
	public List<Ciclo> index(){
		return cicloService.findAll();
	}
}
