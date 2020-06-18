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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Proyecto;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Publicacion;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IComentarioService;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IProyectoService;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IPublicacionService;

@RestController
@RequestMapping("/api")
public class PublicacionRestController {

	@Autowired
	IPublicacionService publicacionService;
	
	@Autowired
	IComentarioService comentarioService;
	
	@Autowired
	IProyectoService proyectoService;
	
	private final Logger log = LoggerFactory.getLogger(PublicacionRestController.class);
	
	@GetMapping("/publicaciones/{id}")
	public List<Publicacion> publicacionesByProyecto(@PathVariable Integer id){
		List<Publicacion> publicaciones = publicacionService.publicacionesByProyecto(id);
		for(int i = 0; i < publicaciones.size(); i++){
			publicaciones.get(i).comentarios = comentarioService.comentarioByPublicacion(publicaciones.get(i).id);
		}
		
		return publicaciones;
	}
	
	@PostMapping("/crearPublicacion")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Publicacion publicacion, BindingResult result) {
		
		Publicacion publicacionNew = null;
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
			publicacionNew = publicacionService.save(publicacion);
		}catch(DataAccessException e){
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La publicación ha sido creado con éxito!");
		response.put("publicacion", publicacionNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PostMapping("publicacion/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id")Integer id){
		Map<String, Object> response = new HashMap<>();
		Publicacion publicacion = publicacionService.findById(id);
		Proyecto proyecto = proyectoService.findById(publicacion.getProyecto());
		if(!archivo.isEmpty()) {
			String nombreArchivo = publicacion.getFecha() +"_"+ proyecto.getAlumno().getApellidos().replace(" ", "_") +"_"+ proyecto.getAlumno().getNombre().replace(" ", "_") +"_"+ archivo.getOriginalFilename().replace(" ", "");
			File ruta = new File("upload/" + proyecto.getAnio().toString() + "_" + proyecto.getConvocatoria() + "_" + proyecto.getAlumno().getApellidos().replace(" ", "_") + "_" + proyecto.getAlumno().getNombre().replace(" ", "_") +"_"+ proyecto.getTitulo().replace(" ", "_"));
			if(!ruta.exists()) {
				ruta.mkdir();
			}
			Path rutaArchivo = Paths.get(ruta.toString()).resolve(nombreArchivo).toAbsolutePath();
			log.info(rutaArchivo.toString());
			try {
				Files.copy(archivo.getInputStream(), rutaArchivo);
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen: " +nombreArchivo);
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String nombreArchivoAnterior = publicacion.getArchivo();
			
			if(nombreArchivoAnterior != null && nombreArchivoAnterior.length()>0) {
				Path rutaArchivoAnterior = Paths.get("upload").resolve(nombreArchivoAnterior).toAbsolutePath();
				File archivoAnterior = rutaArchivoAnterior.toFile();
				if(archivoAnterior.exists() && archivoAnterior.canRead()) {
					archivoAnterior.delete();
				}
			}
			
			publicacion.setArchivo(nombreArchivo);
			
			publicacionService.save(publicacion);
			response.put("publicacion", publicacion);
			response.put("mensaje", "El archivo se ha subido correctamente: "+nombreArchivo);
		}
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/upload/archivo/{nombreArchivo:.+}")
	public ResponseEntity<Resource> verArchivo(@RequestParam("id")Integer id, @PathVariable String nombreArchivo){
		Proyecto proyecto = proyectoService.findById(id);
		String ruta = "upload/" + proyecto.getAnio().toString() + "_" + proyecto.getConvocatoria() + "_" + proyecto.getAlumno().getApellidos().replace(" ", "_") + "_" + proyecto.getAlumno().getNombre().replace(" ", "_") +"_"+ proyecto.getTitulo().replace(" ", "_");
		Path rutaArchivo = Paths.get(ruta).resolve(nombreArchivo).toAbsolutePath();
		log.info(rutaArchivo.toString());
		Resource recurso = null;
		
		try {
			recurso = new UrlResource(rutaArchivo.toUri());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
		
		
		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}
}
