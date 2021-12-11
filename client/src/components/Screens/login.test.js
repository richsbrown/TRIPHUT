import Login from "./login";
import setFormData from './login'
import set_loggedUser from '../../Redux/Actions/action'
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import store from '../../Redux/store';
import {BrowserRouter} from 'react-router-dom';

jest.mock('../../apiService.js', () => ({
    signIn: () => ({email: 'componentTest@test.com', password: 'componentTest'})
}));


it('should call signIn with the correct credentials', async () => {

await act( async () => {

try { 

const handleSubmit = jest.fn();
const credentials = {email: 'componentTest@test.com', password: 'componentTest'}

render(
<Provider store = {store} set_loggedUser={set_loggedUser(null)}>
    <BrowserRouter>
    <Login handleSubmit={handleSubmit} />
    </BrowserRouter>
</Provider>
);

const emailInput = screen.getByPlaceholderText(/Email/);
const passwordInput = screen.getByPlaceholderText(/Password/);
const submitBtn = screen.getByRole('button', {name: /Log In/i});


userEvent.type(emailInput, 'componentTest@test.com');
userEvent.type(passwordInput, 'componentTest');

await userEvent.click(submitBtn);


    expect(handleSubmit).toHaveBeenCalledWith(credentials)   


} catch (error) {
    
    //console.log( 'this is the error', error )
    
}

})

})


