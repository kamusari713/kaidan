package ru.kaidan.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.Entities.User;
import ru.kaidan.backend.Entities.WatchList;
import ru.kaidan.backend.Mappers.UserMapper;
import ru.kaidan.backend.Models.SignUpRequest;
import ru.kaidan.backend.Models.UserPatchDTO;
import ru.kaidan.backend.Repositories.UserRepository;
import ru.kaidan.backend.Repositories.WatchListRepository;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Map<String, String> tokens = new HashMap<>();
    private final UserMapper userMapper;
    private final WatchListRepository watchListRepository;
    private final WatchListService watchListService;

    public String generateToken(String username) {
        SecureRandom random = new SecureRandom();
        byte[] randomBytes = new byte[24];
        random.nextBytes(randomBytes);
        String token = Base64.getUrlEncoder().encodeToString(randomBytes);
        tokens.put(username, token);
        return token;
    }

    public String getEmailByToken(String token) {
        for (Map.Entry<String, String> entry : tokens.entrySet()) {
            if (entry.getValue().equals(token)) {
                return entry.getKey();
            }
        }
        return null;
    }

    public void invalidateToken(String token) {
        tokens.remove(token);
    }

    public User register(SignUpRequest request) {
        User user = new User();
        WatchList watchList = watchListService.addWatchList(user.getId());
        user.setWatchListId(watchList.getId());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setHashedPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByName(String name) {
        return userRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public User patchUser(String id, UserPatchDTO user) {
        userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return userRepository.save(userMapper.patchDTOtoEntity(user));
    }
}
