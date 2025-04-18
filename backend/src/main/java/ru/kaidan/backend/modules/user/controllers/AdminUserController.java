package ru.kaidan.backend.modules.user.controllers;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.services.UserService;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

  private final UserService userService;

  @GetMapping
  public ResponseEntity<List<UserEntity>> getAllUsers() {
    return ResponseEntity.ok().body(userService.getAllUsers());
  }
}
