export const signup = (selectors, email, password, securityAnswer) => {
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

export const login = (selectors, email, password) => {
    cy.get(selectors.navbarAccount).click();
    cy.get(selectors.navbarLoginButton).click();
    cy.get(selectors.emailInput).type(email, { delay: 100 });
    cy.get(selectors.passwordInput).type(password);
    cy.get(selectors.loginButton).click();
};