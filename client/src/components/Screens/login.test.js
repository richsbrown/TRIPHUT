import Login from "./login";
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from "react-redux";
import store from '../../Redux/store';
import {BrowserRouter} from 'react-router-dom';
//import { signIn } from "../../apiService";

jest.mock('../../apiService.js', () => ({
    signIn: () => ({email: 'componentTest@test.com', password: 'componentTest'})
}));


it('should call signIn with the correct credentials', async () => {


try { 

const handleSubmit = jest.fn();
const credentials = {email: 'componentTest@test.com', password: 'componentTest'}

render(
<Provider store ={store}>
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

act(() => {
userEvent.click(submitBtn);
})
await waitFor(() => {
expect(handleSubmit).toHaveBeenCalledWith(credentials)   
})

} catch (e) {
    
    console.log('this is the error', e)
    
}


})


