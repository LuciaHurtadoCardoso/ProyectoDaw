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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Proyecto;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Tag;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.ITagService;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class TagRestController {
	
	@Autowired
	private ITagService tagService;

	@GetMapping("/tags")
	public List<Tag> tags(){
		return tagService.findAll();
	}
	
	@PostMapping("/newTag")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@RequestParam("tag") String tag) {
		
		Tag tagNew = null;
		Map<String, Object> response = new HashMap<>();
		
		Tag tagAux = new Tag();
		tagAux.setTag(tag);
		tagAux.setId(null);
		
//		if(result.hasErrors()) {
//			List<String> errors = result.getFieldErrors()
//				.stream()
//				.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
//				.collect(Collectors.toList());
//			response.put("errors", errors);
//			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
//		}
//		
		try {
			tagNew = tagService.save(tagAux);
		}catch(DataAccessException e){
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El tag ha sido creado con éxito!");
		response.put("tag", tagNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
}
