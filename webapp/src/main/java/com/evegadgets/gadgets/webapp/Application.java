package com.evegadgets.gadgets.webapp;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@RestController
@SpringBootApplication
@ComponentScan({
	"org.planetary.controllers", 
	"org.priceutils.controllers",
	"com.evegadgets.gadgets.webapp.controllers",
	"org.scrap.controllers"})
public class Application { 
	 
	public static void main(String[] args) throws IOException{
		SpringApplication.run(Application.class, args);
	}
	
}
