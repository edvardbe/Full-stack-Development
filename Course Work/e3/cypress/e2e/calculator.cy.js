describe('Calculator Functionality', () => {
    beforeEach(() => {
      cy.visit('/'); // Adjust this if your calculator is hosted on a different route
    });
  
    it('performs a basic addition operation', () => {
      cy.get('#num-2').click();
      cy.get('#add-btn').click();
      cy.get('#num-3').click();
      cy.get('#equals-btn').click();
      cy.get('.display').should('have.text', '5');
    });
  
    it('performs a subtraction operation', () => {
      cy.get('#num-7').click();
      cy.get('#subtract-btn').click();
      cy.get('#num-5').click();
      cy.get('#equals-btn').click();
      cy.get('.display').should('have.text', '2');
    });
  
    it('performs a multiplication operation', () => {
      cy.get('#num-4').click();
      cy.get('#multiply-btn').click();
      cy.get('#num-6').click();
      cy.get('#equals-btn').click();
      cy.get('.display').should('have.text', '24');
    });
  
    it('performs a division operation', () => {
      cy.get('#num-8').click();
      cy.get('#divide-btn').click();
      cy.get('#num-2').click();
      cy.get('#equals-btn').click();
      cy.get('.display').should('have.text', '4');
    });
  
    it('handles division by zero', () => {
      cy.get('#num-9').click();
      cy.get('#divide-btn').click();
      cy.get('#num-0').click();
      cy.get('#equals-btn').click();
      cy.get('.display').should('have.text', 'Undefined');
    });
  
    it('clears the display', () => {
      cy.get('#num-5').click();
      cy.get('#clear-btn').click();
      cy.get('.display').should('have.text', '0');
    });
  
    it('deletes the last entered digit', () => {
      cy.get('#num-7').click();
      cy.get('#num-8').click();
      cy.get('#del-btn').click();
      cy.get('.display').should('have.text', '7');
    });
  
    it('recalls the previous answer', () => {
      cy.get('#num-3').click();
      cy.get('#add-btn').click();
      cy.get('#num-4').click();
      cy.get('#equals-btn').click();
      cy.get('#clear-btn').click();
      cy.get('#ans-btn').click();
      cy.get('.display').should('have.text', '7');
    });
  
    it('prevents multiple consecutive identical operators', () => {
      cy.get('#num-5').click();
      cy.get('#add-btn').click();
      cy.get('#add-btn').should('be.disabled'); // Attempting to add multiple '+' operators
      cy.get('#num-2').click();
      cy.get('#equals-btn').click();
      cy.get('.display').should('have.text', '7');
    });

    it('replace consecutive non-identical operator', () => {
        cy.get('#num-5').click();
        cy.get('#add-btn').click();
        cy.get('#multiply-btn').click(); // Attempting to add multiple '+' operators
        cy.get('#num-2').click();

        cy.get('.display').should('have.text', '5*2');

        cy.get('#equals-btn').click();
        cy.get('.display').should('have.text', '10');
      });
  
    it('handles decimal numbers correctly', () => {
      cy.get('#num-3').click();
      cy.get('#decimal-btn').click();
      cy.get('#num-1').click();
      cy.get('#add-btn').click();
      cy.get('#num-2').click();
      cy.get('#decimal-btn').click();
      cy.get('#num-5').click();
      cy.get('#equals-btn').click();
      cy.get('.display').should('have.text', '5.6');
    });
  
    it('does not allow multiple decimal points in a single number', () => {
      cy.get('#num-4').click();
      cy.get('#decimal-btn').click();
      cy.get('#num-2').click();
      cy.get('#decimal-btn').click(); // Should not be allowed
      cy.get('#num-3').click();
      cy.get('#equals-btn').click();
      cy.get('.display').should('have.text', '4.23'); // Ensures only one decimal is used
    });
  });
  