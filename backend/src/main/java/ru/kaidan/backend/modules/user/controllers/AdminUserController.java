package ru.kaidan.backend.modules.user.controllers;

import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.auth.DTO.RegisterRequest;
import ru.kaidan.backend.modules.user.DTO.UserDTO;
import ru.kaidan.backend.modules.user.services.UserService;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

  private final UserService userService;

  @GetMapping
  public ResponseEntity<Page<UserDTO>> getAllUsers(
      @RequestParam Integer page,
      @RequestParam Integer size,
      @RequestParam String orderBy,
      @RequestParam Boolean direction) {
    return ResponseEntity.ok().body(userService.getAllUsers(page, size, orderBy, direction));
  }

  @PostMapping
  public ResponseEntity<Null> createUser(@RequestBody RegisterRequest request) {
    userService.createUser(request);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<Null> banUser(@PathVariable String userId, @RequestBody boolean banned) {
    userService.banUser(userId, banned);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{userId}")
  public ResponseEntity<UserDTO> updateUser(
      @PathVariable String userId, @RequestBody UserDTO request) {
    return ResponseEntity.ok().body(userService.updateUser(userId, request));
  }
}
