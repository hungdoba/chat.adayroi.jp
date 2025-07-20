import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders all expected navigation links', () => {
    render(<Navbar />);
    const links = ['News', 'Trips', 'JLPT', 'Home'];
    links.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
