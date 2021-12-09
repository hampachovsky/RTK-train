import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

describe('Navbar components', () => {
  test('Navbar rendered', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/add new gradient/i)).toBeInTheDocument();
  });
});
