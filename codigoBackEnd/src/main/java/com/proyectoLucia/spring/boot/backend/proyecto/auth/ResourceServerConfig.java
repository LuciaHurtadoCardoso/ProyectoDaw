package com.proyectoLucia.spring.boot.backend.proyecto.auth;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/profesores", "/api/alumnos", "/api/alumno?email={email}", "/api/profesor?email={email}", "/api/upload/img/**", "/api/profesor/upload/img/**", "/images/notUser.png", "/api/alumno/proyectos/{id}", 
				"/api/proyecto/{id}", "/api/profesor/proyectos/{id}", "/api/tags", "/api/ciclos", "/api/publicaciones/{id}", "/api/upload/archivo/**", "/api/comentarios/{id}", "/api/convocatorias", "/api/proyectosFinalizadosAll", "/api/final/{nombreArchivo:.+}",
				"/api/codigo/{rol}").permitAll()
		.antMatchers(HttpMethod.GET, "/api/alumno/{id}").hasAnyAuthority("alumno", "profesor", "admin")
		.antMatchers(HttpMethod.GET, "/api/profesor/{id}", "/api/noAsignados", "/proyecto/archivos/{id}").hasAnyAuthority("profesor", "admin")
		.antMatchers(HttpMethod.PUT, "api/alumno/update/{id}", "api/profesor/update/{id}", "/proyecto/update/{id}", "/api/verification", "/api/restablecer", "/api/alumno/cambiar").permitAll()
		.antMatchers(HttpMethod.PUT, "/api/proyectoFinalizado/update/{id}", "/api/codigo/update/{rol}").hasAuthority("admin")
		.antMatchers(HttpMethod.DELETE, "/api/proyecto/deleteTag/{id}").permitAll()
		.antMatchers(HttpMethod.POST, "/api/alumno/upload", "/api/profesor/upload", "/api/proyectos", "/api/crearPublicacion", "/api/publicacion/upload", "/api/nuevoComentario", "/api/proyectosFinalizados",
				"/api/newProfesor", "/api/newAlumno", "/api/newTag", "/api/enviarEmail", "/api/sendEmailPass").permitAll()
		.anyRequest()
		.authenticated()
		.and().cors().configurationSource(corsConfigurationSource());
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowCredentials(true);
		config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
	
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(corsConfigurationSource()));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
	}
}
