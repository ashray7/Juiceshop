/// <reference types="cypress" />

describe('Login Test Suite', () => {

    let userData;

    before(() => {
        cy.fixture('userData').then((data) => {

            userData = data;  // Store the loaded data into userData
        });

    });
    

    // Define reusable variables
    const url = 'https://juice-shop.herokuapp.com/#/';
    const selectors = {
        closeDialog: '.close-dialog',
        cookieConsentButton: '.cc-btn',
        navbarAccount: '#navbarAccount',
        navbarLoginButton: '#navbarLoginButton',
        newCustomerLink: '#newCustomerLink',
        emailInput: '#email',
        passwordInput: '#password',
        repeatPasswordInput: '#repeatPasswordControl',
        securityAnswerInput: '#securityAnswerControl',
        selectRoleDropdown: '.mat-select-arrow-wrapper',
        selectRoleOption: '#mat-option-5 > .mat-option-text',
        registerButton: '#registerButton',
        loginButton: '#loginButton',
        errorMessage: '.error',
    };

    // Hook to run before each test case
    beforeEach(() => {
        cy.visit(url);

        cy.wait(1000);

        // Close the welcome pop-up
        cy.get(selectors.closeDialog).should('be.visible').click();

        // Accept cookie consent
        cy.get(selectors.cookieConsentButton).click();
    });

    it('Signup with valid data', () => {
        // Open the account menu
        cy.get(selectors.navbarAccount).click();

        // Click the login button in the dropdown
        cy.get(selectors.navbarLoginButton).click();

        // Click the "New Customer" link
        //cy.get(selectors.newCustomerLink).click();

        // Enter valid signup data
        cy.get(selectors.emailInput).type(userData.email, {delay: 100});
        cy.get(selectors.passwordInput).type(userData.password);
        //cy.get(selectors.repeatPasswordInput).type(userData.password);


        // Click the register button
        cy.get(selectors.loginButton).click();
        
    });

    it('Invalid data login', () => {
        // Open the account menu
        cy.get(selectors.navbarAccount).click();

        // Click the login button in the dropdown
        cy.get(selectors.navbarLoginButton).click();

        // Click the "New Customer" link
        //cy.get(selectors.newCustomerLink).click();

        // Enter valid signup data
        cy.get(selectors.emailInput).type(userData.invalidEmail);
        cy.get(selectors.passwordInput).type(userData.invalidPassword);

        // Click the register button
        cy.get(selectors.loginButton).click();
        cy.get(selectors.errorMessage).should('contain', userData.invalidCredentialsError);
        
    });

});
