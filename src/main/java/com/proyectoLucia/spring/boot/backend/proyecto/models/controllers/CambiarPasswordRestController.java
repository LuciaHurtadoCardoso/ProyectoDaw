package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Alumno;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.AlumnoServiceImpl;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.EmailService;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.ProfesorServiceImpl;

@RestController
@RequestMapping("/api")
public class CambiarPasswordRestController {
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private AlumnoServiceImpl alumnoService;
	
	@Autowired
	private ProfesorServiceImpl profesorService;	
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/sendEmailPass")
	public void enviarEmail (@RequestParam(value="email") String email) {
		emailService.cambiarPassword(email);
	}
	
	
	@PutMapping("/restablecer")
	public ResponseEntity<?> update(@Valid @RequestBody String password, @RequestParam(value="email") String email) {

		Profesor profesorActual = null;
		Map<String, Object> response = new HashMap<>();
		
		byte[] decodedBytes = Base64.getDecoder().decode(email);
		String decodedString = new String(decodedBytes);
		
		Alumno alumnoActual = alumnoService.findByEmail(decodedString);
//		if(result.hasErrors()) {
//			List<String> errors = result.getFieldErrors()
//				.stream()
//				.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
//				.collect(Collectors.toList());
//			response.put("errors", errors);
//			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
//		}
		
		if(alumnoActual == null) {
			profesorActual = profesorService.findByEmail(decodedString);
			if(profesorActual != null) {
				try {
					profesorActual.setPassword(passwordEncoder.encode(password));
					profesorActual = profesorService.save(profesorActual);
					
				}catch(DataAccessException e){
					response.put("mensaje", "Error al actualizar el alumno en la base de datos");
					response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		}else {
			try {
				alumnoActual.setPassword(passwordEncoder.encode(password));
				alumnoActual = alumnoService.save(alumnoActual);
				
			}catch(DataAccessException e){
				response.put("mensaje", "Error al actualizar el alumno en la base de datos");
				response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		if(profesorActual == null && alumnoActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el usuario con email: ".concat(email.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		response.put("mensaje", "El usuario ha sido actualizado con éxito!");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
}
