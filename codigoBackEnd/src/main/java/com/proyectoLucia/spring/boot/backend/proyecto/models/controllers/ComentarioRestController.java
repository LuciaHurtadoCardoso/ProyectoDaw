package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Comentario;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IComentarioService;

@RestController
@RequestMapping("/api")
public class ComentarioRestController {

	@Autowired
	IComentarioService comentarioService;
	private final Logger log = LoggerFactory.getLogger(AlumnoRestController.class);
	
	@GetMapping("/comentarios/{id}")
	public List<Comentario> comentariosByPublicacion(@PathVariable Integer id){
		return comentarioService.comentarioByPublicacion(id);
	}
	
	@PostMapping("/nuevoComentario")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Comentario comentario, BindingResult result) {
		
		Comentario comentarioNew = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
				.stream()
				.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
				.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			comentarioNew = comentarioService.save(comentario);
		}catch(DataAccessException e){
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El comentario ha sido creado con éxito!");
		response.put("comentario", comentarioNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
}
