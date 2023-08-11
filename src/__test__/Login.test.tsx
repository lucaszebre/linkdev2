import { render, screen, fireEvent} from '@testing-library/react';
import Login from '@/components/Login';
import React from 'react'; // Make sure to import React
import { Router } from 'next/router';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

// Mocking the Supabase client
jest.mock('../../supabase', () => ({
  auth: {
    signInWithPassword: jest.fn(),
    // Add other mock methods you're using in your tests
  },
  // Add other mocked Supabase client methods as needed
}));
describe('Login Component', () => {
  it('Renders a "Login" button', () => {
    render(<Login />);
    const loginButton = screen.getByText(/Login with Google/);
    expect(loginButton).toBeInTheDocument;
  });

  it('Renders email and password input fields', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('e.g. lucasbeaugosse@email.com');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    expect(emailInput).toBeInTheDocument;
    expect(passwordInput).toBeInTheDocument;
  });

  it('Renders "Login with Google" and "Login with Github" buttons', () => {
    render(<Login />);
    const googleButton = screen.getByRole('button', { name: 'Login with Google' });
    const githubButton = screen.getByRole('button', { name: 'Login with Github' });
    expect(googleButton).toBeInTheDocument;
    expect(githubButton).toBeInTheDocument;
  });

  it('renders without errors', () => {
    const component = render(<Login />);
    expect(component).toBeTruthy();
  });

  
  
})
  

  // Add more tests for other functionalities and edge cases
