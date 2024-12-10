/// <reference types="cypress" />

describe('Update username Test Suite', () => {

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
        userProfile: '.mat-menu-content > [aria-label="Go to user profile"]',
        usernameField: '#username',
        setUsernameButton: '#submit > .mdl-button__ripple-container'
    };


    function login(email, password){
        cy.get(selectors.navbarAccount).click();
        cy.get(selectors.navbarLoginButton).click();
        cy.get(selectors.emailInput).type(email);
        cy.get(selectors.passwordInput).type(password);
        cy.get(selectors.loginButton).click();

    }

    // Hook to run before each test case
    beforeEach(() => {
        cy.visit(url);

        cy.wait(3000);

        // Close the welcome pop-up
        cy.get(selectors.closeDialog).click();

        // Accept cookie consent
        cy.get(selectors.cookieConsentButton).click();
    });

    it('Update username', () => {

        login(userData.email, userData.password);

        cy.get(selectors.navbarAccount).click();

        cy.get(selectors.userProfile).click();

        cy.get(selectors.usernameField).type(userData.newUsername);

        // cy.get(selectors.usernameField).type('');

        cy.get(selectors.setUsernameButton).click();

        cy.wait(1000);

        cy.get(selectors.usernameField)
        .invoke('val') // Extract the 'value' attribute of the input field
        .should('eq', userData.newUsername); // Assert it equals the new username
        
    });

});
