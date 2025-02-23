package no.ntnu.idi.calculator.controller;

import no.ntnu.idi.calculator.model.User;
import no.ntnu.idi.calculator.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user.getUsername(), user.getPassword());
    }

    
    @GetMapping("/test")
    public String testEndpoint() {
        return "UserController is active!";
    }
}
