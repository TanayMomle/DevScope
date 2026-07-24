import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProfileSearch from '../components/ProfileSearch.jsx';

describe('ProfileSearch', () => {
  it('submits a trimmed username', () => {
    const onSubmit = vi.fn();
    render(<ProfileSearch onSubmit={onSubmit} loading={false} />);

    fireEvent.change(screen.getByLabelText(/github username/i), {
      target: { value: '  octocat  ' },
    });
    fireEvent.submit(screen.getByRole('search'));

    expect(onSubmit).toHaveBeenCalledWith('octocat');
  });

  it('rejects an empty username without calling onSubmit', () => {
    const onSubmit = vi.fn();
    render(<ProfileSearch onSubmit={onSubmit} loading={false} />);

    fireEvent.submit(screen.getByRole('search'));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/enter a github username/i);
  });

  it('disables the submit button while loading', () => {
    render(<ProfileSearch onSubmit={vi.fn()} loading />);

    expect(screen.getByRole('button', { name: /analyze profile/i })).toBeDisabled();
  });
});
