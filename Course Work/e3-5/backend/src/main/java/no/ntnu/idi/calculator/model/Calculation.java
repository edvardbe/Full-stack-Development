package no.ntnu.idi.calculator.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "calculations")
public class Calculation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String expression; // F.eks. "2+2"

    @Column(nullable = false)
    private double result; // F.eks. 4.0

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Konstruktører, getters og setters

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public void setResult(double result) {
        this.result = result;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return this.user;
    }

    public String getExpression() {
        return this.expression;
    }

    public double getResult() {
        return this.result;
    }
}
