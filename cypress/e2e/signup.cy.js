/// <reference types="cypress" />

describe('Signup Test Suite', () => {

    let userData;

    before(() => {
        cy.fixture('userData').then((data) => {
            data.email = "ashraybaral13@gmail.com";
            // data.email = "ashraybaral" + Math.floor(Math.random() * 1000) + "@gmail.com";
            userData = data;  // Store the loaded data into userData
        });
    });

    // Define reusable variables
    const url = 'https://juice-shop.herokuapp.com/#/';
    // const url = 'https://juice-shop.herokuapp.com/#/register';
    //https://juice-shop.herokuapp.com/#/register
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
        // selectRoleOption: '#mat-option-1 > .mat-option-text',
        registerButton: '#registerButton',
        errorMessage: '#mat-error-7',
        weakPasswordErrorMessage: '#mat-error-9',
        snackBarMessage: '.mat-simple-snack-bar-content',
    };

    // Reusable signup function
    const signup = (email, password, securityAnswer) => {
        cy.get(selectors.navbarAccount).click();
        cy.get(selectors.navbarLoginButton).click();
        cy.get(selectors.newCustomerLink).click();

        cy.get(selectors.emailInput).type(email);
        cy.get(selectors.passwordInput).type(password);
        cy.get(selectors.repeatPasswordInput).type(password);

        cy.get(selectors.selectRoleDropdown).click();
        cy.get(selectors.selectRoleOption).click();

        cy.get(selectors.securityAnswerInput).type(securityAnswer);
        // cy.get(selectors.registerButton).click();
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
        signup(userData.email, userData.password, userData.securityAnswer);
        cy.get(selectors.registerButton).click();

        // Verify successful registration message
        cy.get(selectors.snackBarMessage)
          .should('be.visible')
          .should('contain', 'Registration completed successfully. You can now log in.');

        cy.wait(500);
    });

    context('Invalid attempts', () => {
        it('Shows error message for invalid email', () => {
            signup(userData.invalidEmail, userData.password, userData.securityAnswer);
    
            // Verify error message for invalid email
            cy.get(selectors.errorMessage).should('contain', userData.invalidEmailErrorMessage);
        });
        it('Empty email and password', () => {
            signup(" ", " ", userData.securityAnswer);
    
            // Verify error message for invalid email
            cy.get(selectors.errorMessage).should('contain', userData.invalidEmailErrorMessage);
        });
        it('Weak password', () => {
            signup(userData.email, userData.weakPassword, userData.securityAnswer);
    
            // Verify error message for weak password
            cy.get(selectors.weakPasswordErrorMessage).should('contain', userData.weakPasswordErrorMessage);
        });
        it('Shows duplicate email error', () => {
            signup(userData.email, userData.password, userData.securityAnswer);
            cy.get(selectors.registerButton).click();
    
            // Verify error message for email not unique
            // cy.get(selectors.errorMessage).should('contain', userData.invalidEmailErrorMessage);
            cy.get('.error').should('contain', 'Email must be unique');
        });
    })
    

});
