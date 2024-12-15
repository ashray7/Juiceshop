/// <reference types="cypress" />
import * as utils from '../support/utils';

describe('Update Username Test Suite', () => {

    let userData;

    before(() => {
        cy.fixture('userData').then((data) => {
            userData = data; // Store the loaded data into userData
        });
    });

    // Define reusable variables
    const url = 'https://juice-shop.herokuapp.com/#/';
    const selectors = {
        closeDialog: '.close-dialog',
        cookieConsentButton: '.cc-btn',
        navbarAccount: '#navbarAccount',
        navbarLoginButton: '#navbarLoginButton',
        emailInput: '#email',
        passwordInput: '#password',
        loginButton: '#loginButton',
        userProfile: '.mat-menu-content > [aria-label="Go to user profile"]',
        usernameField: '#username',
        setUsernameButton: '#submit > .mdl-button__ripple-container'
    };

    // Reusable login function
    // const login = (email, password) => {
    //     cy.get(selectors.navbarAccount).click();
    //     cy.get(selectors.navbarLoginButton).click();
    //     cy.get(selectors.emailInput).type(email);
    //     cy.get(selectors.passwordInput).type(password);
    //     cy.get(selectors.loginButton).click();
    // };

    // Hook to run before each test case
    beforeEach(() => {
        cy.visit(url);
        cy.wait(1000);

        // Close the welcome pop-up
        cy.get(selectors.closeDialog).click();

        // Accept cookie consent
        cy.get(selectors.cookieConsentButton).click();
    });

    it('Update username', () => {
        // Login with valid credentials
        utils.login(selectors,userData.email, userData.password);

        // Navigate to the user profile page
        cy.get(selectors.navbarAccount).click();
        cy.get(selectors.userProfile).click();

        // Update the username
        cy.get(selectors.usernameField).clear().type(userData.newUsername);
        cy.get(selectors.setUsernameButton).click();

        // Verify the updated username
        cy.wait(1000);
        cy.get(selectors.usernameField)
          .invoke('val') // Extract the 'value' attribute of the input field
          .should('eq', userData.newUsername); // Assert it equals the new username
    });

});
