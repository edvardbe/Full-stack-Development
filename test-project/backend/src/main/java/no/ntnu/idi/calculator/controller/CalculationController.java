package no.ntnu.idi.calculator.controller;

import no.ntnu.idi.calculator.model.Calculation;
import no.ntnu.idi.calculator.model.CalculationRequest;
import no.ntnu.idi.calculator.model.User;
import no.ntnu.idi.calculator.service.CalculationService;
import no.ntnu.idi.calculator.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calculations")
public class CalculationController {

    private static final Logger logger = LoggerFactory.getLogger(CalculationController.class);

    private final CalculationService calculationService;

    private final UserService userService;

    public CalculationController(CalculationService calculationService, UserService userService) {
        this.calculationService = calculationService;
        this.userService = userService;
    }
    @PostMapping
    public ResponseEntity<Object> calculate(@RequestBody CalculationRequest request) {
        try {

            logger.info("Received request: {}", request.getExpression());
            logger.info("From user: {}", request.getUsername());

            double result = calculationService.calculate(request.getExpression());
            
            request.setResult(result);

            logger.info("Returning result: {}", result);

            saveCalculation(request);
            
            return new ResponseEntity<>(result, HttpStatus.OK);
        } 
        catch (ArithmeticException arithmeticException){
            logger.info("Backend caught arithmetic exception: {}", arithmeticException.getMessage());
            return new ResponseEntity<>("Undefined", HttpStatus.OK);
        }
        catch (Exception e){
            logger.info("Backend caught exception: {}", e.getMessage());
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Calculation saveCalculation(CalculationRequest request) {
        User user = userService.findByUsername(request.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));
        return calculationService.saveCalculation(user, request.getExpression(), request.getResult());  
    }

    @DeleteMapping("/user/{username}")
    public ResponseEntity<String> removeLast10Calculations(@PathVariable String username) {
        try{
            int numberOfCalculations = calculationService.deleteLast10UserCalculations(userService.findByUsername(username).orElseThrow());
            String response = numberOfCalculations + ": Calculations was deleted successfully";
            return new ResponseEntity<>(response, HttpStatus.OK); 
        }
        catch (Exception e){
            logger.info("Backend caught exception: {}", e.getMessage());
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCalculation(@PathVariable Long id) {
        System.out.println("Deleting calculation with ID: " + id);
        calculationService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<Calculation>> getLast10Calculations(@PathVariable String username) {
        try{
            User user = userService.findByUsername(username).orElseThrow();
            logger.info("Fetching calculations for user: " + username);
            List<Calculation> calculations = calculationService.getLast10Calculations(user.getId());
            for (Calculation calculation : calculations) {
                logger.info(calculation.toString());
            }
            return new ResponseEntity<>(calculations, HttpStatus.OK);
        } catch (Exception e){
            logger.error("Failed when attempting to fetch calculations", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
