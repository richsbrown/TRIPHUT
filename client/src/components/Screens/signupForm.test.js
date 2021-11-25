/* eslint-disable jest/valid-expect */
import { act, fireEvent, render } from "@testing-library/react";
import { expect } from "chai";
import { Provider } from "react-redux";
import store from '../../Redux/store';
import {BrowserRouter} from 'react-router-dom';
import Signup from "./signup";
import formData  from './signup'


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


    it('changes email to the users input', async () => {
        await act( async () => {
            const { getByTestId } = render(
                <Provider store ={store}>
                <BrowserRouter>
                    <Signup formData={formData}/>
                </BrowserRouter>
                </Provider>
            );
            const email = getByTestId('signupEmail');
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
                    <Signup formData={formData}/>
                </BrowserRouter>
                </Provider>
            );
            const password = getByTestId('signupPassword');
            const testInputPassword = '123456';
            await fireEvent.change(password, {target: {value: testInputPassword}})
            expect(password.value).to.be.equal(testInputPassword);
        });
    });

    it('changes fullname to the users input', async () => {
        await act( async () => {
            const { getByTestId } = render(
                <Provider store ={store}>
                <BrowserRouter>
                    <Signup formData={formData}/>
                </BrowserRouter>
                </Provider>
            );
            const fullname = getByTestId('signupFullname');
            const testInputFullname = 'Jon Doe';
            await fireEvent.change(fullname, {target: {value: testInputFullname}})
            expect(fullname.value).to.be.equal(testInputFullname);
        });
    });

    it('changes username to the users input', async () => {
        await act( async () => {
            const { getByTestId } = render(
                <Provider store ={store}>
                <BrowserRouter>
                    <Signup formData={formData}/>
                </BrowserRouter>
                </Provider>
            );
            const username = getByTestId('signupUsername');
            const testInputUsername = 'JDoe';
            await fireEvent.change(username, {target: {value: testInputUsername}})
            expect(username.value).to.be.equal(testInputUsername);
        });
    });

});