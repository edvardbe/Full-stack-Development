package no.ntnu.idi.calculator.repository;

import no.ntnu.idi.calculator.model.Calculation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CalculationRepository extends JpaRepository<Calculation, Long> {
    List<Calculation> findTop10ByUserIdOrderByTimestampDesc(Long userId);
}
