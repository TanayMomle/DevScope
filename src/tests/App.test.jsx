import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

describe('App', () => {
  it('renders the product name and tagline', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /devscope/i })).toBeInTheDocument();
    expect(
      screen.getByText(/deep github intelligence for developers/i),
    ).toBeInTheDocument();
  });
});
