package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Codigo;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.ICodigoService;

@RestController
@RequestMapping("/api")
public class CodigoRestController {

	@Autowired
	private ICodigoService codigoService;
	
	@GetMapping("/codigo/{rol}")
	public ResponseEntity<?> show(@PathVariable String rol) {
		
		Codigo codigo = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			codigo = codigoService.findByRol(rol);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(codigo == null) {
			response.put("mensaje", "El codigo con rol: ".concat(rol.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Codigo>(codigo, HttpStatus.OK);
	}
	
	@PutMapping("/codigo/update/{rol}")
	public ResponseEntity<?> update(@Valid @RequestBody String codigo, BindingResult result, @PathVariable String rol) {
		Codigo codigoActual = codigoService.findByRol(rol);
		Codigo codigoUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
				.stream()
				.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
				.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(codigoActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el codigo con rol: ".concat(rol.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			codigoActual.setCodigo(codigo);
			
			codigoUpdated = codigoService.save(codigoActual);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar el codigo en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El codigo ha sido actualizado con éxito!");
		response.put("codigo", codigoUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
}
