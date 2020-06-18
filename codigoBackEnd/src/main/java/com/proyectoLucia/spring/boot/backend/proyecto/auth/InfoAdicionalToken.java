package com.proyectoLucia.spring.boot.backend.proyecto.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Alumno;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Profesor;
import com.proyectoLucia.spring.boot.backend.proyecto.models.entity.Admin;
import com.proyectoLucia.spring.boot.backend.proyecto.models.services.IServiceGestorTokens;

@Component
public class InfoAdicionalToken implements TokenEnhancer {

	@Autowired
	private IServiceGestorTokens iServiceGestorTokens;
	
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		Map<String, Object> info = new HashMap<>();
		Alumno alumno = iServiceGestorTokens.findByEmailA(authentication.getName());
		if(alumno == null) {
			Profesor profesor = iServiceGestorTokens.findByEmailP(authentication.getName());
			if(profesor != null) {
				info.put("id_usuario", profesor.getId());
				info.put("nombre_usuario", profesor.getNombre());	
			}else {
				Admin admin = iServiceGestorTokens.findByEmailAd(authentication.getName());
				info.put("id_usuario", admin.getId());
				info.put("nombre_usuario", "Administrador");
			}
		}else {
			info.put("id_usuario", alumno.getId());
			info.put("nombre_usuario", alumno.getNombre());
			info.put("apellidos_usuario", alumno.getApellidos());
			info.put("foto", alumno.getFoto());
		}
		
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
		return accessToken;
	}
	
}
