/// <reference types="cypress" />
import * as utils from '../support/utils';

describe('Login Test Suite', () => {

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
        errorMessage: '.error',
    };

    // Reusable login function
    // const login = (email, password) => {
    //     cy.get(selectors.navbarAccount).click();
    //     cy.get(selectors.navbarLoginButton).click();
    //     cy.get(selectors.emailInput).type(email, { delay: 100 });
    //     cy.get(selectors.passwordInput).type(password);
    //     cy.get(selectors.loginButton).click();
    // };

    // Hook to run before each test case
    beforeEach(() => {
        cy.visit(url);
        cy.wait(1000);
        cy.get(selectors.closeDialog).should('be.visible').click();
        cy.get(selectors.cookieConsentButton).click();
    });

    it('Login with valid data', () => {
        utils.login(selectors, userData.email, userData.password);
    });

    context('Incorrect attempts', () => {
        it('Invalid email and password', () => {
            utils.login(selectors, userData.invalidEmail, userData.invalidPassword);
            cy.get(selectors.errorMessage).should('contain', userData.invalidCredentialsError);
        });
        it('Empty Fields', () => {
            utils.login(selectors, ' ', ' ');
            cy.get(selectors.errorMessage).should('contain', userData.invalidCredentialsError);
        });
        it('Empty email', () => {
            utils.login(selectors, ' ', userData.password);
            cy.get(selectors.errorMessage).should('contain', userData.invalidCredentialsError);
        });
        it('Empty password', () => {
            utils.login(selectors, userData.email, ' ');
            cy.get(selectors.errorMessage).should('contain', userData.invalidCredentialsError);
        });
    })

});
