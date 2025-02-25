describe('Navigation Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Should navigate to the Feedback page', () => {
      cy.get('a[href="/feedback"]').click(); // Adjust selector based on your app
      cy.url().should('include', '/feedback');
    });

    it('Should navigate back to the home view', () => {
      cy.get('a[href="/feedback"]').click(); // Adjust selector based on your app
      cy.get('[name="exit"]').click();
      cy.contains('Submit Feedback')
    });
  
    it('Should navigate to the Success page after form submission', () => {
      cy.visit('/feedback');
      
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
      cy.url().should('include', '/success');
      cy.contains('Feedback successfully submitted!').should('be.visible'); // Adjust text as needed
    });
  });
  