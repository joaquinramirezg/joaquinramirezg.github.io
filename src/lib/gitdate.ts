import { execFileSync } from 'node:child_process';

// Real dates from git history: last commit that touched the given paths.
// Falls back to the build time only if git is unavailable.
function git(args: string[]): string {
  try { return execFileSync('git', args, { encoding: 'utf8' }).trim(); } catch { return ''; }
}
export function lastCommit(paths: string[]): string {
  return git(['log', '-1', '--format=%cI', '--', ...paths]) || new Date().toISOString();
}
