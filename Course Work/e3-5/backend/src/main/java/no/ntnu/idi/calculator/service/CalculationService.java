package no.ntnu.idi.calculator.service;

import no.ntnu.idi.calculator.model.Calculation;
import no.ntnu.idi.calculator.model.User;
import no.ntnu.idi.calculator.repository.CalculationRepository;
import org.springframework.stereotype.Service;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

import java.util.List;

@Service
public class CalculationService {
    private final CalculationRepository calculationRepository;

    public CalculationService(CalculationRepository calculationRepository) {
        this.calculationRepository = calculationRepository;
    }

    public double calculate(String expression) {
        String[] fracs = expression.split("/");
        int nFracs = fracs.length;

        for (int i = 1; i < nFracs; i++) {
            System.out.println(fracs[i]);
            Expression frac = new ExpressionBuilder(fracs[i]).build();
            
            double num = frac.evaluate();
            if (num == 0) throw new ArithmeticException("Divide by zero");
        }
        Expression e = new ExpressionBuilder(expression).build();
        return e.evaluate();
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
