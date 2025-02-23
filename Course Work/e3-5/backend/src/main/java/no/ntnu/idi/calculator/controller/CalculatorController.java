package no.ntnu.idi.calculator.controller;

import no.ntnu.idi.calculator.model.CalculationRequest;
import no.ntnu.idi.calculator.service.CalculatorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculate")
@CrossOrigin(origins = "http://localhost:5173") // Viktig for Vue frontend
public class CalculatorController {

    private static final Logger logger = LoggerFactory.getLogger(CalculatorController.class);
    private final CalculatorService calculatorService;

    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }
    //@GetMapping("/user")

    @PostMapping
    public ResponseEntity<Object> calculate(@RequestBody CalculationRequest request) {
        try {
            logger.info("Received request: {}", request.getExpression());

            double result = calculatorService.calculate(request.getExpression());

            logger.info("Returning result: {}", result);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } 
        catch (ArithmeticException arithmeticException){
            logger.info("Backend caught arithmetic exception: {}", arithmeticException.getMessage());
            return new ResponseEntity<>("Undefined", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            logger.info("Backend caught exception: {}", e.getMessage());
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
