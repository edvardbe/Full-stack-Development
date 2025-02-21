package no.ntnu.idi.calculator.controller;

import no.ntnu.idi.calculator.model.CalculationRequest;
import no.ntnu.idi.calculator.service.CalculatorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public Map<String, Object> calculate(@RequestBody CalculationRequest request) {
        Map<String, Object> resultMap = Map.of("", "");
        try {
            logger.info("Received request: {}", request.getExpression());

            double result = calculatorService.calculate(request.getExpression());

            logger.info("Returning result: {}", result);
            resultMap = Map.of("result", result);
        } 
        catch (ArithmeticException arithmeticException){
            logger.info("Backend caught arithmetic exception: {}", arithmeticException.getMessage());
            resultMap = Map.of("result", "Undefined");
        }
        catch (Exception e){
            logger.info("Backend caught exception: {}", e.getMessage());
            resultMap = Map.of("result", "Error");
        }
        return resultMap;
    }
}
