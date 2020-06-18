package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Alumno;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.EmailService;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IProfesorService;

@RestController
@RequestMapping("/api")
public class ProfesorRestController {

	@Autowired
	private IProfesorService profesorService;
	private final Logger log = LoggerFactory.getLogger(ProfesorRestController.class);
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/profesores")
	public List<Profesor> index(){
		return profesorService.findAll();
	}
	
	@GetMapping("/profesor/{id}")
	public ResponseEntity<?> show(@PathVariable Integer id) {
		
		Profesor profesor = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			profesor = profesorService.findById(id);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(profesor == null) {
			response.put("mensaje", "El profesor ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Profesor>(profesor, HttpStatus.OK);
	}
	
	@GetMapping("/profesor")
	public ResponseEntity<?> show(@RequestParam(value="email") String email) {
		
		Profesor profesor = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			profesor = profesorService.findByEmail(email);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(profesor == null) {
			response.put("mensaje", "El profesor con email: ".concat(email.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Profesor>(profesor, HttpStatus.OK);
	}
	
	@PutMapping("/profesor/update/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Profesor profesor, BindingResult result, @PathVariable Integer id) {
		Profesor profesorActual = profesorService.findById(id);
		Profesor profesorUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
				.stream()
				.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
				.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(profesorActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el profesor ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			profesorActual.setApellidos(profesor.getApellidos());
			profesorActual.setNombre(profesor.getNombre());
			profesorActual.setEmail(profesor.getEmail());
			profesorActual.setFoto(profesor.getFoto());
			
			profesorUpdated = profesorService.save(profesorActual);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar el profesor en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El profesor ha sido actualizado con éxito!");
		response.put("profesor", profesorUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PostMapping("profesor/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id")Integer id){
		Map<String, Object> response = new HashMap<>();
		Profesor profesor = profesorService.findById(id);
		if(!archivo.isEmpty()) {
			String nombreArchivo = profesor.getNombre() + "_" + profesor.getApellidos().replace(" ", "_") +"_fotoPerfil_"+ archivo.getOriginalFilename().replace(" ", "");
			Path rutaArchivo = Paths.get("upload").resolve(nombreArchivo).toAbsolutePath();
			log.info(rutaArchivo.toString());
			try {
				Files.copy(archivo.getInputStream(), rutaArchivo);
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen: " +nombreArchivo);
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String nombreFotoAnterior = profesor.getFoto();
			
			if(nombreFotoAnterior != null && nombreFotoAnterior.length()>0) {
				Path rutaFotoAnterior = Paths.get("upload").resolve(nombreFotoAnterior).toAbsolutePath();
				File archivoFotoAnterior = rutaFotoAnterior.toFile();
				if(archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
					archivoFotoAnterior.delete();
				}
			}
			
			profesor.setFoto(nombreArchivo);
			
			profesorService.save(profesor);
			response.put("profesor", profesor);
			response.put("mensaje", "Has subido correctamente la imagen: "+nombreArchivo);
		}
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/profesor/upload/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFotoProf(@PathVariable String nombreFoto){
		Path rutaArchivo = Paths.get("upload").resolve(nombreFoto).toAbsolutePath();
		log.info(rutaArchivo.toString());
		Resource recurso = null;
		
		try {
			recurso = new UrlResource(rutaArchivo.toUri());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		if(!recurso.exists() && !recurso.isReadable()) {
			rutaArchivo = Paths.get("src/main/resources/static/images").resolve("notUser.png").toAbsolutePath();
			
			try {
				recurso = new UrlResource(rutaArchivo.toUri());
			} catch (MalformedURLException e) {
				e.printStackTrace();
			}
			
			log.error("Error no se pudo cargar la imagen: " + nombreFoto);
		}
		
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
		
		
		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}
	
	@PostMapping("/newProfesor")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Profesor profesor, BindingResult result) {
		
		Profesor profesorNew = null;
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
			profesor.setPassword(passwordEncoder.encode(profesor.getPassword()));
			profesor.setEnabled(true);
			profesorNew = profesorService.save(profesor);
		}catch(DataAccessException e){
			if(e.getMessage().contains("UNIQUE")) {
				response.put("mensaje", "Error al crear el usuario");
				response.put("error", "Ya existe una cuenta con este email.");
			}else {
				response.put("mensaje", "Error al realizar el insert en la base de datos");
				response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			}
			
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El profesor ha sido creado con éxito!");
		response.put("profesor", profesorNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/profesor/cambiar")
	public ResponseEntity<?> cambiarProf(@Valid @RequestBody String password, @RequestParam(value="email") String email) {
		Profesor profesorActual = profesorService.findByEmail(email);
		Profesor profesorUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(profesorActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el profesor con email: ".concat(email.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			profesorActual.setPassword(passwordEncoder.encode(password));
			
			profesorUpdated = profesorService.save(profesorActual);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar el alumno en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El profesor ha sido actualizado con éxito!");
		response.put("profesor", profesorUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
}
