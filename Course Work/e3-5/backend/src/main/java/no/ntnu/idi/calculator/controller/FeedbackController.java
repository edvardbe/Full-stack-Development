package no.ntnu.idi.calculator.controller;

import no.ntnu.idi.calculator.model.FeedbackRequest;
import no.ntnu.idi.calculator.service.FeedbackService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FeedbackController {

    private static final Logger logger = LoggerFactory.getLogger(FeedbackController.class);
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }
    //@GetMapping("/user")

    @PostMapping
    public ResponseEntity<String> submit(@RequestBody FeedbackRequest request) {
        try {

            feedbackService.submitFeedback(request);

            logger.info("Feedback saved successfully: ");

            return new ResponseEntity<>(HttpStatus.OK);
        } 
        catch (Exception e){
            logger.info("Backend caught exception: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }
}
