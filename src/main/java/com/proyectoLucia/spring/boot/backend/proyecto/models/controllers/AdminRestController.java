package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Admin;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IAdminService;

@RestController
@RequestMapping("/api")
public class AdminRestController {
	
	@Autowired
	private IAdminService adminService;
	private final Logger log = LoggerFactory.getLogger(AlumnoRestController.class);
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@GetMapping("/admin/{id}")
	public ResponseEntity<?> show(@PathVariable Integer id) {
		
		Admin admin = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			admin = adminService.findById(id);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(admin == null) {
			response.put("mensaje", "El admin ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Admin>(admin, HttpStatus.OK);
	}
	
	@GetMapping("/admin")
	public ResponseEntity<?> show(@RequestParam(value="email") String email) {
		
		Admin admin = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			admin = adminService.findByEmail(email);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(admin == null) {
			response.put("mensaje", "El admin con email: ".concat(email.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Admin>(admin, HttpStatus.OK);
	}
	
	@PutMapping("/admin/cambiar")
	public ResponseEntity<?> cambiarProf(@Valid @RequestBody String password, @RequestParam(value="email") String email) {
		Admin adminActual = adminService.findByEmail(email);
		Admin adminUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(adminActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el admin con email: ".concat(email.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			adminActual.setPassword(passwordEncoder.encode(password));
			
			adminUpdated = adminService.save(adminActual);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar el admin en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El admin ha sido actualizado con éxito!");
		response.put("admin", adminUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
}
