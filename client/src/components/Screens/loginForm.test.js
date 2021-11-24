/* eslint-disable jest/valid-expect */
import { act, fireEvent, render } from "@testing-library/react";
import { expect } from "chai";
import { Provider } from "react-redux";
import store from '../../Redux/store';
import {BrowserRouter} from 'react-router-dom';
import Login from "./login";
import formData  from './login'


describe('Login Component Test', () => {
    it('should render login', () => {
        const {getByTestId} = render(
            <Provider store ={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
        </Provider>
        );
        const form = getByTestId('loginForm')
        // eslint-disable-next-line no-unused-expressions
        expect(form).to.exist;

        const loginEmail = getByTestId('loginEmail')
        // eslint-disable-next-line no-unused-expressions
        expect(loginEmail).to.exist;

        const loginPassword = getByTestId('loginPassword')
        // eslint-disable-next-line no-unused-expressions
        expect(loginPassword).to.exist;

        const loginButton = getByTestId('loginButton')
        // eslint-disable-next-line no-unused-expressions
        expect(loginButton).to.exist;

        const loginButtonLinkToSignup = getByTestId('loginButtonLinkToSignup')
        // eslint-disable-next-line no-unused-expressions
        expect(loginButtonLinkToSignup).to.exist;
    });


    it('changes email to the users input', async () => {
        await act( async () => {
            const { getByTestId } = render(
                <Provider store ={store}>
                <BrowserRouter>
                    <Login formData={formData}/>
                </BrowserRouter>
                </Provider>
            );
            const email = getByTestId('loginEmail');
            const testInputEmail = 'testEmail@gmail.com';
            await fireEvent.change(email, {target: {value: testInputEmail}})
            expect(email.value).to.be.equal(testInputEmail);
        });
    });
    

    it('changes password to the users input', async () => {
        await act( async () => {
            const { getByTestId } = render(
                <Provider store ={store}>
                <BrowserRouter>
                    <Login formData={formData}/>
                </BrowserRouter>
                </Provider>
            );
            const password = getByTestId('loginPassword');
            const testInputPassword = '123456';
            await fireEvent.change(password, {target: {value: testInputPassword}})
            expect(password.value).to.be.equal(testInputPassword);
        });
    });


});