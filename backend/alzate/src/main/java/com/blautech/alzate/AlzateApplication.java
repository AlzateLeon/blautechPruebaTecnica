package com.blautech.alzate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@SpringBootApplication(scanBasePackages = "com.blautech.alzate")
public class AlzateApplication {

	public static void main(String[] args) {
			SpringApplication.run(AlzateApplication.class, args);
	}

}
