package no.ntnu.idi.calculator.controller;

import no.ntnu.idi.calculator.model.Calculation;
import no.ntnu.idi.calculator.model.CalculationRequest;
import no.ntnu.idi.calculator.model.User;
import no.ntnu.idi.calculator.service.CalculationService;
import no.ntnu.idi.calculator.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calculations")
public class CalculationController {
    private final CalculationService calculationService;
    private final UserService userService;

    public CalculationController(CalculationService calculationService, UserService userService) {
        this.calculationService = calculationService;
        this.userService = userService;
    }

    @PostMapping
    public Calculation saveCalculation(@RequestBody CalculationRequest request) {
        User user = userService.findByUsername(request.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));
        return calculationService.saveCalculation(user, request.getExpression(), request.getResult());  
    }

    @GetMapping("/{username}")
    public List<Calculation> getLast10Calculations(@PathVariable String username) {
        User user = userService.findByUsername(username).orElseThrow();
        return calculationService.getLast10Calculations(user.getId());
    }
}
