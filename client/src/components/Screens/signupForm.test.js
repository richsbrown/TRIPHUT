/* eslint-disable jest/valid-expect */
import { render } from "@testing-library/react";
import { expect } from "chai";
import { Provider } from "react-redux";
import store from '../../Redux/store';
import {BrowserRouter} from 'react-router-dom';
import Signup from "./signup";


describe('Signup Component Test', () => {
    it('should render signup', () => {
        const {getByTestId} = render(
            <Provider store ={store}>
                <BrowserRouter>
                    <Signup />
                </BrowserRouter>
        </Provider>
        );
        const signupForm = getByTestId('signupForm')
        // eslint-disable-next-line no-unused-expressions
        expect(signupForm).to.exist;

        const signupEmail = getByTestId('signupEmail')
        // eslint-disable-next-line no-unused-expressions
        expect(signupEmail).to.exist;
        
        const signupFullname = getByTestId('signupFullname')
        // eslint-disable-next-line no-unused-expressions
        expect(signupFullname).to.exist;
        
        const signupUsername = getByTestId('signupUsername')
        // eslint-disable-next-line no-unused-expressions
        expect(signupUsername).to.exist;
        
        const signupPassword = getByTestId('signupPassword')
        // eslint-disable-next-line no-unused-expressions
        expect(signupPassword).to.exist;

        const signupButton = getByTestId('signupButton')
        // eslint-disable-next-line no-unused-expressions
        expect(signupButton).to.exist;

        const loginButtonLink = getByTestId('loginButtonLink')
        // eslint-disable-next-line no-unused-expressions
        expect(loginButtonLink).to.exist;
    });
});