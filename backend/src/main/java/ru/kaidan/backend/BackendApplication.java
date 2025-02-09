package ru.kaidan.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ru.kaidan.backend.configs.DotenvConfig;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        DotenvConfig.init();
        SpringApplication.run(BackendApplication.class, args);
    }

}
