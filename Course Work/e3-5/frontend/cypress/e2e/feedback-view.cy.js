describe('Feedback View Tests', () => {
    beforeEach(() => {
      cy.visit('/feedback');
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
        cy.visit('/feedback');
      
        // Assuming your form has fields with these selectors



        cy.get('input[name="fname"]').type('John');
        cy.get('input[name="lname"]').type('Doe');
        cy.get('input[name="email"]').type('johndoe@example.com');
  
        cy.get('input[type="radio"][value="Teacher"]').check();
  
        cy.get('textarea[name="feedback"]').type('This is a test message.');
        cy.get('.star') // Adjust this selector based on your component's structure
        .eq(2) // Select the third star (0-based index)
        .click();
        cy.get('p').should('contain', 'Selected rating: 3');
  
        cy.get('input[type="submit"]').click();  // Adjust if needed
        cy.url().should('include', '/success');
        cy.contains('Feedback successfully submitted!').should('be.visible');  
        
        
      // Wait for the form submission request
       // cy.wait('@submitForm').its('response.statusCode').should('eq', 201);
    
        // Check if the submitted data exists in the database
        
      
    });

    it('Verify that last item was added', () => {
      cy.request('http://localhost:3000/feedback').then((response) => {
        const lastItem = response.body[response.body.length - 1];
  
        // Verify the expected values of the last item
        expect(lastItem).to.have.property('fname', 'John');
        expect(lastItem).to.have.property('lname', 'Doe');
        expect(lastItem).to.have.property('email', 'johndoe@example.com');
        expect(lastItem).to.have.property('designation', 'Teacher');
        expect(lastItem).to.have.property('feedback', 'This is a test message.');
        expect(lastItem).to.have.property('rating', 3);
      });
    })
    
});
  
  