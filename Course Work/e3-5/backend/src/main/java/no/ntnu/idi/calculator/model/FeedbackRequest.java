package no.ntnu.idi.calculator.model;

public class FeedbackRequest {
    private String fname;
    private String lname;
    private String email;
    private String designation;
    private String feedback;
    private int userRating;

    // Constructors
    public FeedbackRequest() {}

    public FeedbackRequest(String fname, String lname, String email, String designation, String feedback, int userRating) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.designation = designation;
        this.feedback = feedback;
        this.userRating = userRating;
    }

    // Getters and Setters
    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }

    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public int getUserRating() { return userRating; }
    public void setUserRating(int userRating) { this.userRating = userRating; }
}
