/**
 * Repository totals: how many there are and how they break down by origin,
 * archive state, and visibility.
 *
 * @param {import('../../types/github.js').Repository[]} repositories
 */
export function calculateCounts(repositories) {
  let original = 0;
  let forked = 0;
  let archived = 0;
  let publicCount = 0;
  let privateCount = 0;

  for (const repository of repositories) {
    if (repository.fork) forked += 1;
    else original += 1;
    if (repository.archived) archived += 1;
    if (repository.visibility === 'private') privateCount += 1;
    else publicCount += 1;
  }

  return {
    total: repositories.length,
    original,
    forked,
    archived,
    visibility: { public: publicCount, private: privateCount },
  };
}
