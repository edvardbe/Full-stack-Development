package no.ntnu.idi.calculator.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import no.ntnu.idi.calculator.model.Role;
import no.ntnu.idi.calculator.model.User;
import no.ntnu.idi.calculator.repository.UserRepository;

@Service
public class  AuthenticationService {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JWTService jwtService;

    private final AuthenticationManager authenticationManager;
    
    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JWTService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();
            repository.save(user);
            var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        User user = repository.findByUsername(request.getUsername())
            .orElseThrow();

        String jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwt)
            .build(); 
    }


    public AuthenticationResponse logout() {
        String jwt = jwtService.generateExpiredToken();
        return AuthenticationResponse.builder()
            .token(jwt)
            .build(); 
    }

}
