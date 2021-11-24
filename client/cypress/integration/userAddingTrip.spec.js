Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('user adding trip', () => {

    it('user can add a trip', () => {

        // login
        cy.visit('localhost:3000/');
        cy.findByRole('textbox').type('test3@gmail.com');
        cy.findByPlaceholderText(/password/i).type('333333');
        cy.findByRole('button', {name: /log in/i}).click();
        // click Add Trip button
        cy.findByText(/add/i).click();
        // upload a picture
        const filepath = '/Iceland-vacation-Godafoss.jpeg';
        cy.get('input[type="file"]').attachFile(filepath)
       // cy.get('#file-submit').click()
        // input Trip Title
        const testTitle = 'Test Title';
        cy.findByPlaceholderText(/add a title/i).type(testTitle);
        // input Trip Description
        const testDescription = 'Test Description';
        cy.findByPlaceholderText(/add a description/i).type(testDescription);
        // Post Trip
        cy.findByRole('button', {name: /post/i}).click();
        // Trip should be visible on User Profile
        cy.findByText(/person/i).click();
        cy.findByRole('heading', {name: /test title/i}).should('be.visible');
    })
})