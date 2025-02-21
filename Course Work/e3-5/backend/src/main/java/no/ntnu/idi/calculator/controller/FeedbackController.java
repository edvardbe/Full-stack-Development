package no.ntnu.idi.calculator.controller;

import no.ntnu.idi.calculator.model.FeedbackRequest;
import no.ntnu.idi.calculator.service.FeedbackService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173") // Viktig for Vue frontend
public class FeedbackController {

    private static final Logger logger = LoggerFactory.getLogger(FeedbackController.class);
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }
    //@GetMapping("/user")

    @PostMapping
    public void submit(@RequestBody FeedbackRequest request) {
        try {

            feedbackService.submitFeedback(request);

            logger.info("Feedback saved successfully: ");
        } 
        catch (Exception e){
            logger.info("Backend caught exception: {}", e.getMessage());
        }
    }
}
