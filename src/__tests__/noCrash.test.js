import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Deleted from '../pages/Deleted';

test('renders without crashing', () => {
    const div = document.createElement('div')
    render(<About />, div)
})

