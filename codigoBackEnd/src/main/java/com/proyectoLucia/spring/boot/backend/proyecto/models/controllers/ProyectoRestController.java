package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Proyecto;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IProyectoService;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.ITagService;


@RestController
@RequestMapping("/api")
public class ProyectoRestController {
	
	@Autowired
	IProyectoService proyectoService;
	
	@Autowired
	ITagService tagService;
	
	private final Logger log = LoggerFactory.getLogger(ProyectoRestController.class);
	
	@GetMapping("/alumno/proyectos/{id}")
	public List<Proyecto> listaProyecto(@PathVariable Integer id){
		return proyectoService.findAllProyectosByAlumno(id);
	}
	
	@GetMapping("/profesor/proyectos/{id}")
	public List<Proyecto> listaProyectoProf(@PathVariable Integer id){
		return proyectoService.findAllProyectosByProfesor(id);
	}
	
	@GetMapping("/proyecto/{id}")
	public ResponseEntity<?> show(@PathVariable Integer id) {
		
		Proyecto proyecto = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			proyecto = proyectoService.findById(id);
		} catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(proyecto == null) {
			response.put("mensaje", "El proyecto ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Proyecto>(proyecto, HttpStatus.OK);
	}
	
	@PostMapping("/proyectos")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Proyecto proyecto, BindingResult result) {
		
		Proyecto proyectoNew = null;
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
			proyectoNew = proyectoService.save(proyecto);
		}catch(DataAccessException e){
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El proyecto ha sido creado con éxito!");
		response.put("proyecto", proyectoNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/noAsignados")
	public List<Proyecto> proyectos(){
		return proyectoService.findAllProyectosSinAsignar();
	}
	
	@PutMapping("/proyecto/update/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Proyecto proyecto, BindingResult result, @PathVariable Integer id) {
		Proyecto proyectoActual = proyectoService.findById(id);
		Proyecto proyectoUpdate = null;
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
				.stream()
				.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
				.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(proyectoActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el alumno ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			proyectoActual.setTitulo(proyecto.getTitulo());
			proyectoActual.setHoras(proyecto.getHoras());
			proyectoActual.setDescripcion(proyecto.getDescripcion());
			proyectoActual.setNota(proyecto.getNota());
			proyectoActual.setEstado_proyecto(proyecto.getEstado_proyecto());
			proyectoActual.setUrlGitHub(proyecto.getUrlGitHub());
			proyectoActual.setAnio(proyecto.getAnio());
			proyectoActual.setConvocatoria(proyecto.getConvocatoria());
			proyectoActual.setAlumno(proyecto.getAlumno());
			proyectoActual.setProfesor(proyecto.getProfesor());
			proyectoActual.setCiclo_siglas(proyecto.getCiclo_siglas());
			proyectoActual.setProyectoEtiqueta(proyecto.getProyectoEtiqueta());
			
			proyectoUpdate = proyectoService.save(proyectoActual);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar el proyecto en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El proyecto ha sido actualizado con éxito!");
		response.put("proyecto", proyectoUpdate);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/proyecto/deleteTag/{id}")
	public ResponseEntity<?> deleteTag(@RequestParam("tag_id")Integer tag_id, @PathVariable Integer id){
		Map<String, Object> response = new HashMap<>();
		Proyecto proyecto = proyectoService.findById(id);
		try {
			proyectoService.eliminarTag(tag_id, id);
			proyecto.getProyectoEtiqueta().remove(tagService.findById(tag_id));
		}catch(DataAccessException e){
			response.put("mensaje", "Error al eliminar el tag en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El proyecto ha sido actualizado con éxito!");
		response.put("proyecto", proyecto);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);	
	}
	
	@GetMapping("/proyecto/archivos/{id}")
	public ResponseEntity<?>  obtenerArchivos(@PathVariable Integer id){
		Map<String, Object> response = new HashMap<>();
		Proyecto proyecto = proyectoService.findById(id);
		String ruta = "upload/" + proyecto.getAnio().toString() + "_" + proyecto.getConvocatoria() + "_" + proyecto.getAlumno().getApellidos().replace(" ", "_") + "_" + proyecto.getAlumno().getNombre().replace(" ", "_") +"_"+ proyecto.getTitulo().replace(" ", "_");
		Set<String> archivos = Stream.of(new File(ruta).listFiles())
			      .filter(file -> !file.isDirectory())
			      .map(File::getName)
			      .collect(Collectors.toSet());
		
		response.put("mensaje", "Los archvios han sido obtenidos con éxito");
		response.put("archivos", archivos);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}


}
