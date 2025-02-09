package ru.kaidan.backend.utils.exceptions.custom;

public class MissingTokenException extends RuntimeException {

    public MissingTokenException(String message) {
        super(message);
    }
}
