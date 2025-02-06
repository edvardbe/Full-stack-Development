describe('Contact Form Tests', () => {
    beforeEach(() => {
      cy.visit('/contact-form');
    });
  
    it('Should not submit an empty form', () => {
      cy.get('input[type="submit"]').should('be.disabled');
      // Adjust based on your validation
    });
  
    it('Should show an error for an invalid email', () => {
      cy.get('input[name="fname"]').type('John');
      cy.get('input[name="lname"]').type('Doe');

      cy.get('input[name="email"]').type('invalid-email');
      cy.get('textarea[name="feedback"]').type('Test message.');
  
      cy.get('input[type="submit"]').should('be.disabled');
    });
  
    it('Should submit the form successfully', () => {
        cy.visit('/contact-form');
      
        // Assuming your form has fields with these selectors
        cy.get('input[name="fname"]').type('John');
        cy.get('input[name="lname"]').type('John');
        cy.get('input[name="email"]').type('johndoe@example.com');
  
        cy.get('input[type="radio"][value="Teacher"]').check();
  
        cy.get('textarea[name="feedback"]').type('This is a test message.');
        cy.get('.star') // Adjust this selector based on your component's structure
        .eq(2) // Select the third star (0-based index)
        .click();
        cy.get('p').should('contain', 'Selected rating: 3');
  
        cy.get('input[type="submit"]').click();  // Adjust if needed
        cy.url().should('include', '/success-view');
        cy.contains('Feedback successfully submitted!').should('be.visible');
    });
  });
  