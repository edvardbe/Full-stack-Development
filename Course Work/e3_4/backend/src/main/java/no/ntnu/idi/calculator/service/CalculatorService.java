package no.ntnu.idi.calculator.service;

import org.springframework.stereotype.Service;


import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

@Service
public class CalculatorService {

    public double calculate(String expression) {
        try {
            
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

        } catch (Exception exception){
            throw exception;
        }
    }

}
