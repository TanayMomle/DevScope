/**
 * Project a repository to the fields the analysis result needs to identify a
 * "notable" repository, so AnalysisResult stays self-contained.
 *
 * @param {import('../../types/github.js').Repository} repository
 * @returns {import('../../types/analysis.js').NotableRepository}
 */
export function toNotable(repository) {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.fullName,
    htmlUrl: repository.htmlUrl,
    stargazersCount: repository.stargazersCount,
    forksCount: repository.forksCount,
    size: repository.size,
    createdAt: repository.createdAt,
    pushedAt: repository.pushedAt,
  };
}
