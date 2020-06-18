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
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.EmailService;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IAlumnoService;

@RestController
@RequestMapping("/api")
public class AlumnoRestController {

	@Autowired
	private IAlumnoService alumnoService;
	private final Logger log = LoggerFactory.getLogger(AlumnoRestController.class);
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/alumnos")
	public List<Alumno> index(){
		return alumnoService.findAll();
	}
	
	@GetMapping("/alumno/{id}")
	public ResponseEntity<?> show(@PathVariable Integer id) {
		
		Alumno alumno = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			alumno = alumnoService.findById(id);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(alumno == null) {
			response.put("mensaje", "El alumno ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Alumno>(alumno, HttpStatus.OK);
	}
	
	@GetMapping("/alumno")
	public ResponseEntity<?> show(@RequestParam(value="email") String email) {
		
		Alumno alumno = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			alumno = alumnoService.findByEmail(email);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(alumno == null) {
			response.put("mensaje", "El alumno con email: ".concat(email.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Alumno>(alumno, HttpStatus.OK);
	}
	
	@PutMapping("/alumno/update/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Alumno alumno, BindingResult result, @PathVariable Integer id) {
		Alumno alumnoActual = alumnoService.findById(id);
		Alumno alumnoUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
				.stream()
				.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
				.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(alumnoActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el alumno ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			alumnoActual.setApellidos(alumno.getApellidos());
			alumnoActual.setNombre(alumno.getNombre());
			alumnoActual.setEmail(alumno.getEmail());
			alumnoActual.setFoto(alumno.getFoto());
			
			alumnoUpdated = alumnoService.save(alumnoActual);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar el alumno en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El alumno ha sido actualizado con éxito!");
		response.put("alumno", alumnoUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PostMapping("alumno/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id")Integer id){
		Map<String, Object> response = new HashMap<>();
		Alumno alumno = alumnoService.findById(id);
		if(!archivo.isEmpty()) {
			String nombreArchivo = alumno.getNombre() + "_" + alumno.getApellidos().replace(" ", "_") +"_fotoPerfil_"+ archivo.getOriginalFilename().replace(" ", "");
			Path rutaArchivo = Paths.get("upload").resolve(nombreArchivo).toAbsolutePath();
			log.info(rutaArchivo.toString());
			try {
				Files.copy(archivo.getInputStream(), rutaArchivo);
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen: " +nombreArchivo);
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String nombreFotoAnterior = alumno.getFoto();
			
			if(nombreFotoAnterior != null && nombreFotoAnterior.length()>0) {
				Path rutaFotoAnterior = Paths.get("upload").resolve(nombreFotoAnterior).toAbsolutePath();
				File archivoFotoAnterior = rutaFotoAnterior.toFile();
				if(archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
					archivoFotoAnterior.delete();
				}
			}
			
			alumno.setFoto(nombreArchivo);
			
			alumnoService.save(alumno);
			response.put("alumno", alumno);
			response.put("mensaje", "Has subido correctamente la imagen: "+nombreArchivo);
		}
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/upload/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto){
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
	
	@PostMapping("/newAlumno")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Alumno alumno, BindingResult result) {
		
		Alumno alumnoNew = null;
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
			alumno.setPassword(passwordEncoder.encode(alumno.getPassword()));
			alumno.setEnabled(false);
			alumnoNew = alumnoService.save(alumno);
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
		
		response.put("mensaje", "El alumno ha sido creado con éxito!");
		response.put("alumno", alumnoNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PostMapping("/enviarEmail")
	public void enviarEmail (@Valid @RequestBody String email, BindingResult result) {
		emailService.sendEmail(email);
	}
	
	@PutMapping("/alumno/cambiar")
	public ResponseEntity<?> cambiarAl(@Valid @RequestBody String password, @RequestParam(value="email") String email) {
		Alumno alumnoActual = alumnoService.findByEmail(email);
		Alumno alumnoUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(alumnoActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el alumno con email: ".concat(email.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			alumnoActual.setPassword(passwordEncoder.encode(password));
			
			alumnoUpdated = alumnoService.save(alumnoActual);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar el alumno en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El alumno ha sido actualizado con éxito!");
		response.put("alumno", alumnoUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
}
