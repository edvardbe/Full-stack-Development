package no.ntnu.idi.calculator.model;


public class CalculationRequest {
    private String username;
    private String expression;
    private double result;


    // Konstruktør (kan også bruke Lombok @Data)
    public CalculationRequest() {}

    public String getUsername() { 
        return username; 
    }
    public void setUsername(String username) { 
        this.username = username; 
    }

    public String getExpression() {
        return expression;
    }
    public void setExpression(String expression) {
        this.expression = expression;
    }

    public double getResult() { 
        return result; 
    }
    public void setResult(double result) { 
        this.result = result; 
    }
}
