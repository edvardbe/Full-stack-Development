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

    public Optional<User> registerUser(String username, String password) {
        Optional<User> user = findByUsername(username);
        if(!user.isPresent()){
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(password); // NB: Passord bør hashes!
            return Optional.of(userRepository.save(newUser));
        }
        return Optional.empty();
        
    }

    public Optional<User> login(String username, String password) {
        return findByUsername(username)
                .filter(user -> user.getPassword().equals(password));
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
