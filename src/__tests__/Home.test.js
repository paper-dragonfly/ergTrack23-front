import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

// Mocking window.innerWidth
const setWindowWidth = (width) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe('Home Component', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        render(<Home />, div);
      });
    test('renders desktop image for wide screens', () => {
        setWindowWidth(1024); // Set screen width to a desktop size
        render(<Home />);
        expect(screen.getByAltText('woman on erg machine')).toHaveAttribute('src', 'heroDesktop2.jpg'); // Replace with actual path
    });

    test('renders mobile image for narrow screens', () => {
        setWindowWidth(600); // Set screen width to a mobile size
        render(<Home />);
        expect(screen.getByAltText('phone photographing erg')).toHaveAttribute('src', 'fmJosh.jpg'); // Replace with actual path
    });

    test('renders all icons and text', () => {
        render(<Home />);
        expect(screen.getByText('How it Works')).toBeInTheDocument();
        expect(screen.getAllByRole('img').length).toBeGreaterThan(0); // Checks if icons are rendered
        // Add more assertions here for specific icons or text if needed
    });
});
