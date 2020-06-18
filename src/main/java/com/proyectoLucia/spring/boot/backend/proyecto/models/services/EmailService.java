package com.proyectoLucia.spring.boot.backend.proyecto.models.services;

import java.util.Base64;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements EmailPort{

	private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

	@Autowired
	private JavaMailSender sender;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public boolean sendEmail(String email)  {
		String template;
		
		String encodedString = Base64.getEncoder().encodeToString(email.getBytes());
		
		String href="http://localhost:4200/verificacion/"+encodedString;
		template = "<div style='color:black; text-align:center; margin-top:5px; font-family: Lucida Sans;'>\r\n" + 
				"    <h1>Verificación de la cuenta</h1>\r\n" + 
				"    <h2>Proyecto de proyectos</h2>\r\n" + 
				"    <a href='"+ href +"'\r\n" +
				"        style=\"text-decoration: none; display: inline-block; font-weight: 400; color: #212529; text-align: center; vertical-align: middle; \r\n" + 
				"				-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; border: 1px solid transparent; padding: .375rem .75rem;\r\n" + 
				"                font-size: 1rem; line-height: 1.5; border-radius: .25rem;color: #fff; background-color: #007bff; border-color: #007bff;\">\r\n" + 
				"        Haga click para verificar el email</a>\r\n" + 
				"</div>";
		LOGGER.info("EmailBody: {}", email);
		boolean send = false;
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);		
		try {
			helper.setTo(email);
			helper.setText(template, true);
			helper.setSubject("Verificación de email");
			sender.send(message);
			send = true;
			LOGGER.info("Mail enviado!");
		} catch (MessagingException e) {
			LOGGER.error("Hubo un error al enviar el mail: {}", e);
		}
		return send;
	}	
	
	@Override
	public boolean cambiarPassword(String email)  {
		String template;
		
		String encodedString = Base64.getEncoder().encodeToString(email.getBytes());
		
		String href="http://localhost:4200/changePassword/"+encodedString;
		template = "<div style='color:black; text-align:center; margin-top:5px; font-family: Lucida Sans;'>\r\n" + 
				"    <h1>Restablecer contraseña</h1>\r\n" + 
				"    <h2>Proyecto de proyectos</h2>\r\n" + 
				"    <a href='"+ href +"'\r\n" +
				"        style=\"text-decoration: none; display: inline-block; font-weight: 400; color: #212529; text-align: center; vertical-align: middle; \r\n" + 
				"				-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; border: 1px solid transparent; padding: .375rem .75rem;\r\n" + 
				"                font-size: 1rem; line-height: 1.5; border-radius: .25rem;color: #fff; background-color: #007bff; border-color: #007bff;\">\r\n" + 
				"        Haga click para restablecer la contraseña</a>\r\n" + 
				"</div>";
		LOGGER.info("EmailBody: {}", email);
		boolean send = false;
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);		
		try {
			helper.setTo(email);
			helper.setText(template, true);
			helper.setSubject("Verificar contraseña");
			sender.send(message);
			send = true;
			LOGGER.info("Mail enviado!");
		} catch (MessagingException e) {
			LOGGER.error("Hubo un error al enviar el mail: {}", e);
		}
		return send;
	}	
}
