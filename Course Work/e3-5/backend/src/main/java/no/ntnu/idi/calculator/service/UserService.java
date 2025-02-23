package no.ntnu.idi.calculator.service;

import no.ntnu.idi.calculator.model.User;
import no.ntnu.idi.calculator.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // NB: Passord bør hashes!
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
