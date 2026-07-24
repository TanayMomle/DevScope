import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfileCard from '../components/ProfileCard.jsx';

const baseUser = {
  login: 'octocat',
  id: 1,
  name: 'The Octocat',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
  htmlUrl: 'https://github.com/octocat',
  bio: 'Building things.',
  company: '@github',
  location: 'San Francisco',
  blog: 'https://github.blog',
  followers: 100,
  following: 5,
  publicRepos: 8,
  publicGists: 2,
  createdAt: '2011-01-25T18:44:36Z',
  updatedAt: '2024-05-01T00:00:00Z',
};

describe('ProfileCard', () => {
  it('renders the core profile information', () => {
    render(<ProfileCard user={baseUser} />);

    expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeInTheDocument();
    expect(screen.getByText('@octocat')).toBeInTheDocument();
    expect(screen.getByText('Building things.')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText(/joined january 2011/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /octocat/i })).toBeInTheDocument();
  });

  it('hides optional fields that are absent', () => {
    render(
      <ProfileCard
        user={{ ...baseUser, name: null, bio: '', company: null, location: '', blog: '' }}
      />,
    );

    expect(screen.getByRole('heading', { name: 'octocat' })).toBeInTheDocument();
    expect(screen.getByText('@octocat')).toBeInTheDocument();
    expect(screen.queryByText('San Francisco')).not.toBeInTheDocument();
    expect(screen.queryByText('@github')).not.toBeInTheDocument();
    expect(screen.queryByText('Building things.')).not.toBeInTheDocument();
  });
});
