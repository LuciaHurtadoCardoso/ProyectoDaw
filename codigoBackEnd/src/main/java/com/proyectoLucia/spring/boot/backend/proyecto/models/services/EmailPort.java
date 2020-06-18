package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

public interface EmailPort {

	boolean sendEmail(String email);

	boolean cambiarPassword(String email);

}
