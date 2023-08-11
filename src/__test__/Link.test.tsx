import Link from '@/components/Link';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react'; // Make sure to import React


// Mocking the Supabase client
jest.mock('../../supabase', () => ({
  auth: {
    signInWithPassword: jest.fn(),
    // Add other mock methods you're using in your tests
  },
  // Add other mocked Supabase client methods as needed
}));
describe('Link Component', () => {
    it('Renders a "Remove" button', () => {
        render(<Link number={1} platform='youtube' link={'youtube.fr'} remove={()=>{}} />);
        const loginButton = screen.getByText(/Remove/);
        expect(loginButton).toBeInTheDocument;
    });

    // it('Render select',()=>{
    //     render(<Link number={1} platform='youtube' link={'youtube.fr'} remove={()=>{}} />);
    //     const Select = screen.getByLabelText('Platform');
    //     expect(Select).toBeInTheDocument
    // })


})