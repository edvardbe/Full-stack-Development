package no.ntnu.idi.calculator.controller;

import no.ntnu.idi.calculator.model.User;
import no.ntnu.idi.calculator.service.UserService;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        Optional<User> newUser = userService.registerUser(user.getUsername(), user.getPassword());
        if (newUser.isPresent()) {
            logger.info("Register successful for user: {}", user.getUsername());
            return ResponseEntity.ok(newUser.get());
        } else {
            logger.warn("Login failed for user: {}", user.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }   
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        Optional<User> returnUser = userService.login(user.getUsername(), user.getPassword());
        if (returnUser.isPresent()) {
            logger.info("Login successful for user: {}", user.getUsername());
            return ResponseEntity.ok(returnUser.get());
        } else {
            logger.warn("Login failed for user: {}", user.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    
    @GetMapping("/test")
    public String testEndpoint() {
        return "UserController is active!";
    }
}
