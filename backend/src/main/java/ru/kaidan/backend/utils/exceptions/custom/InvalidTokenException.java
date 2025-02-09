package ru.kaidan.backend.utils.exceptions.custom;

public class InvalidTokenException extends RuntimeException {

    public InvalidTokenException(String message) {
        super(message);
    }
}
