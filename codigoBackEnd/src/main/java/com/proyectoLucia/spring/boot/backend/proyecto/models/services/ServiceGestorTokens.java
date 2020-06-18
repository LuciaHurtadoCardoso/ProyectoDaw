package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IAdminDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IAlumnoDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.dao.IProfesorDao;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Admin;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Alumno;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;

@Component("ServiceGestorTokens")
public class ServiceGestorTokens implements IServiceGestorTokens, UserDetailsService {

	private Logger logger = LoggerFactory.getLogger(ProfesorServiceImpl.class);

	@Autowired
	private IProfesorDao profesorDao;

	@Autowired
	private IAlumnoDao alumnoDao;
	
	@Autowired
	private IAdminDao adminDao;

	
	@SuppressWarnings("null")
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		String rol;
		Profesor profesor = null;
		Admin admin = null;
		Alumno alumno = alumnoDao.findByEmail(email);
		User usuario = null;

		if (alumno == null) {
			profesor = profesorDao.findByEmail(email);
			if (profesor != null) {
				rol = "profesor";

				List<GrantedAuthority> authorities = Arrays.asList(rol).stream()
						.map(role -> new SimpleGrantedAuthority(rol))
						.peek(authority -> logger.info("Role: " + authority.getAuthority()))
						.collect(Collectors.toList());
				usuario = new User(profesor.getEmail(), profesor.getPassword(), profesor.getEnabled(), true, true, true,
						authorities);
			}else {
				admin = adminDao.findByEmail(email);
				if(admin != null) {
					rol = "admin";

					List<GrantedAuthority> authorities = Arrays.asList(rol).stream()
							.map(role -> new SimpleGrantedAuthority(rol))
							.peek(authority -> logger.info("Role: " + authority.getAuthority()))
							.collect(Collectors.toList());
					usuario = new User(admin.getEmail(), admin.getPassword(), true, true, true, true,
							authorities);
				}
			}
		} else {
			rol = "alumno";
			List<GrantedAuthority> authorities = Arrays.asList(rol).stream()
					.map(role -> new SimpleGrantedAuthority(rol))
					.peek(authority -> logger.info("Role: " + authority.getAuthority())).collect(Collectors.toList());
			usuario = new User(alumno.getEmail(), alumno.getPassword(), alumno.getEnabled(), true, true, true,
					authorities);
		}

		if (alumno == null && profesor == null && admin == null) {
			logger.error("No existe el usuario en el sistema");
			throw new UsernameNotFoundException("No existe el usuario en el sistema");
		}
		
		return usuario;
	}


	@Override
	public Alumno findByEmailA(String email) {
		return alumnoDao.findByEmail(email);
	}
	
	@Override
	public Profesor findByEmailP(String email) {
		return profesorDao.findByEmail(email);
	}
	
	@Override
	public Admin findByEmailAd(String email) {
		return adminDao.findByEmail(email);
	}

}
