/// <reference types="cypress" />

describe('Signup Test Suite', () => {

    let userData;

    before(() => {
        cy.fixture('userData').then((data) => {
            data.email = "ashraybaral777@gmail.com";
            //data.email = "ashraybaral" + Math.floor(Math.random() * 1000) + "@gmail.com";

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
        emailInput: '#emailControl',
        passwordInput: '#passwordControl',
        repeatPasswordInput: '#repeatPasswordControl',
        securityAnswerInput: '#securityAnswerControl',
        selectRoleDropdown: '.mat-select-arrow-wrapper',
        selectRoleOption: '#mat-option-5 > .mat-option-text',
        registerButton: '#registerButton',
        errorMessage: '#mat-error-7',
    };

    beforeEach(() => {
        cy.visit(url);

        cy.wait(1000);

        // Close the welcome pop-up
        cy.get(selectors.closeDialog).click();

        // Accept cookie consent
        cy.get(selectors.cookieConsentButton).click();
    });





    it('Signup with valid data', () => {
        // Open the account menu
        cy.get(selectors.navbarAccount).click();

        // Click the login button in the dropdown
        cy.get(selectors.navbarLoginButton).click();

        // Click the "New Customer" link
        cy.get(selectors.newCustomerLink).click();

        // Enter valid signup data
        cy.get(selectors.emailInput).type(userData.email);
        cy.get(selectors.passwordInput).type(userData.password);
        cy.get(selectors.repeatPasswordInput).type(userData.password);

        // Select role (or any other dropdown option)
        cy.get(selectors.selectRoleDropdown).click();
        cy.get(selectors.selectRoleOption).click();

        // Answer security question
        cy.get(selectors.securityAnswerInput).type(userData.securityAnswer);

        // Click the register button
        cy.get(selectors.registerButton).click();

        cy.get('.mat-simple-snack-bar-content').should('be.visible').should('contain', 'Registration completed successfully. You can now log in.');

        cy.wait(500);


    });

    it('Shows error message for invalid email', () => {
        // Open the account menu
        cy.get(selectors.navbarAccount).click();
        //should('be.visible').

        // Click the login button in the dropdown
        cy.get(selectors.navbarLoginButton).click();

        // Click the "New Customer" link
        cy.get(selectors.newCustomerLink).click();

        // Enter invalid email and other valid data
        cy.get(selectors.emailInput).type(userData.invalidEmail);
        cy.get(selectors.passwordInput).type(userData.password);
        cy.get(selectors.repeatPasswordInput).type(userData.password);

        // Select role (or any other dropdown option)
        cy.get(selectors.selectRoleDropdown).click();
        cy.get(selectors.selectRoleOption).click();

        // Answer security question
        cy.get(selectors.securityAnswerInput).type(userData.securityAnswer);

        // Click the register button
        // cy.get(selectors.registerButton).click();

        // Verify that the error message for invalid email is displayed
        cy.get(selectors.errorMessage).should('contain', userData.invalidEmailErrorMessage);
    });

});
