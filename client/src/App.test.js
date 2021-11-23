import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import Home from './components/Screens/Home';
import { Provider } from 'react-redux';
import store from './Redux/store';
import {BrowserRouter} from 'react-router-dom';

test('renders element in body', () => {
  render(<App />);
  const element = screen.getByRole('button');
  expect(element).toBeInTheDocument();
});

test('renders element in body', () => {
  render(
  <Provider store={store}>
    <BrowserRouter>
    <Home />
    </BrowserRouter>
    </Provider>);
  const element = screen.getByText(/Top Trips/i);
  expect(element).toBeInTheDocument();
});
