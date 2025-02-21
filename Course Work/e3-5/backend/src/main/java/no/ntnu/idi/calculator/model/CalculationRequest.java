package no.ntnu.idi.calculator.model;


public class CalculationRequest {
    private String expression;

    // Konstruktør (kan også bruke Lombok @Data)
    public CalculationRequest() {}

    public CalculationRequest(String expression) {
        this.expression = expression;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }
}
