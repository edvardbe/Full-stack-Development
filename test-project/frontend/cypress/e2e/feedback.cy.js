describe('Feedback API', () => {
    it('verify request returns JSON', () => {
      cy.request('http://localhost:3000/feedback').its('headers').its('content-type').should('include', 'application/json')
    })
  
    it('verify the request returns the correct status code', () => {
      cy.request('http://localhost:3000/feedback').its('status').should('be.equal', 200)
    })
  
    
  })