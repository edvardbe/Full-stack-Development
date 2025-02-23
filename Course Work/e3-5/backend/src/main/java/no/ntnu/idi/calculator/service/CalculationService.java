package no.ntnu.idi.calculator.service;

import no.ntnu.idi.calculator.model.Calculation;
import no.ntnu.idi.calculator.model.User;
import no.ntnu.idi.calculator.repository.CalculationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CalculationService {
    private final CalculationRepository calculationRepository;

    public CalculationService(CalculationRepository calculationRepository) {
        this.calculationRepository = calculationRepository;
    }

    public Calculation saveCalculation(User user, String expression, double result) {
        Calculation calculation = new Calculation();
        calculation.setExpression(expression);
        calculation.setResult(result);
        calculation.setUser(user);
        return calculationRepository.save(calculation);
    }

    public List<Calculation> getLast10Calculations(Long userId) {
        return calculationRepository.findTop10ByUserIdOrderByTimestampDesc(userId);
    }
}
