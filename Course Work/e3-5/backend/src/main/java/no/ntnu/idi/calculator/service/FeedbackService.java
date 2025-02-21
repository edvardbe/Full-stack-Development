package no.ntnu.idi.calculator.service;

import no.ntnu.idi.calculator.model.FeedbackRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FeedbackService {

    private final RestTemplate restTemplate;

    public FeedbackService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<String> submitFeedback(FeedbackRequest feedback) {
        String url = "http://localhost:3000/feedback"; // JSON Server URL
        return restTemplate.postForEntity(url, feedback, String.class);
    }
}
