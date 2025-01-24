package ru.kaidan.backend.utils.exceptions.custom;

public class ExpiredRefreshToken extends RuntimeException {
    public ExpiredRefreshToken(String message) {
        super(message);
    }
}