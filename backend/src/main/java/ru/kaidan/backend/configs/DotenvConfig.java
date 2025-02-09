package ru.kaidan.backend.configs;

import io.github.cdimascio.dotenv.Dotenv;

public class DotenvConfig {
    public static void init() {
        Dotenv dotenv = Dotenv.configure()
                .filename(".env.local")
                .ignoreIfMissing()
                .load();

        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
    }
}
