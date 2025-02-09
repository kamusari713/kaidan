package ru.kaidan.backend.utils.exceptions.custom;

public class ExpiredTokenException extends RuntimeException {

    public ExpiredTokenException(String message) {
        super(message);
    }
}
