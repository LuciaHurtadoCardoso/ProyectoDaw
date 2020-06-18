package com.proyectoLucia.spring.boot.backend.proyecto.models.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.ProyectoFinalizado;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IProyectoFinalizadoService;

@RestController
@RequestMapping("/api")
public class ProyectoFinalizadoRestController {

	@Autowired
	private IProyectoFinalizadoService proyectoFinalizadoService;
	
	@GetMapping("/proyectosFinalizadosAll")
	public List<ProyectoFinalizado> index(){
		return proyectoFinalizadoService.findAll();
	}

	@PostMapping("/proyectosFinalizados")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody ProyectoFinalizado proyecto, BindingResult result) throws IOException {

		ProyectoFinalizado proyectoNew = null;
		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			if (proyecto.getArchivos() != null) {
		        String sourceFile = "upload/" + proyecto.getAnio().toString() + "_" + proyecto.getConvocatoria() + "_" + proyecto.getAlumno().replace(" ", "_") +"_"+ proyecto.getTitulo().replace(" ", "_");
		        FileOutputStream fos = new FileOutputStream("upload/final/"+proyecto.getAnio().toString() + "_" + proyecto.getConvocatoria() + "_" + proyecto.getAlumno().replace(" ", "_") +"_"+ proyecto.getTitulo().replace(" ", "_") + "_final.zip");
		        ZipOutputStream zipOut = new ZipOutputStream(fos);
		        File fileToZip = new File(sourceFile);
		 
		        zipFile(fileToZip, fileToZip.getName(), zipOut, proyecto.getArchivos());
		        zipOut.close();
		        fos.close();
			}
			
			proyecto.setArchivo(proyecto.getAnio().toString() + "_" + proyecto.getConvocatoria() + "_" + proyecto.getAlumno().replace(" ", "_") +"_"+ proyecto.getTitulo().replace(" ", "_") + "_final.zip");
			proyectoNew = proyectoFinalizadoService.save(proyecto);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El proyecto ha sido creado con éxito!");
		response.put("proyecto", proyectoNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	private static void zipFile(File fileToZip, String fileName, ZipOutputStream zipOut, List<String> archivos) throws IOException {
		if (fileToZip.isHidden()) {
			return;
		}
		if (fileToZip.isDirectory()) {
			if (fileName.endsWith("/")) {
				zipOut.putNextEntry(new ZipEntry(fileName));
				zipOut.closeEntry();
			} else {
				zipOut.putNextEntry(new ZipEntry(fileName + "/"));
				zipOut.closeEntry();
			}
			File[] children = fileToZip.listFiles();
			for (File childFile : children) {
				if(archivos.contains(childFile.getName())) {
					zipFile(childFile, fileName + "/" + childFile.getName(), zipOut, archivos);
				}
			}
			return;
		}
		FileInputStream fis = new FileInputStream(fileToZip);
		ZipEntry zipEntry = new ZipEntry(fileName);
		zipOut.putNextEntry(zipEntry);
		byte[] bytes = new byte[1024];
		int length;
		while ((length = fis.read(bytes)) >= 0) {
			zipOut.write(bytes, 0, length);
		}
		fis.close();
	}
	
	@GetMapping("/final/{nombreArchivo:.+}")
	public ResponseEntity<Resource> verArchivo(@PathVariable String nombreArchivo){
		String ruta = "upload/final/";
		Path rutaArchivo = Paths.get(ruta).resolve(nombreArchivo).toAbsolutePath();
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
	
	@PutMapping("/proyectoFinalizado/update/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody ProyectoFinalizado proyecto, BindingResult result, @PathVariable Integer id) {
		ProyectoFinalizado proyectoActual = proyectoFinalizadoService.findById(id);
		ProyectoFinalizado proyectoUpdated = null;
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
			response.put("mensaje", "Error, no se pudo editar, el proyecto finalizado ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		try {
			
			if(proyectoActual.isMostrado()) {
				proyectoActual.setMostrado(false);
			}else {
				proyectoActual.setMostrado(true);
			}
			
			proyectoUpdated = proyectoFinalizadoService.save(proyectoActual);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar el alumno en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El proyecto ha sido actualizado con éxito!");
		response.put("proyecto", proyectoUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
}
