# AGENTS.md

## Setup

- Node: 22.x
- Package mgr: npm
- Install: `npm install`
- Dev: `npm dev`
- Build: `npm build`
- Test (unit, vitest): `npm test`
- Lint (type-aware): `npm lint`
- Typecheck: `npm run typecheck`

## Coding conventions

- TypeScript strict mode; no default exports in libs
- ESLint+Prettier rules are authoritative; fix before commit
- Commits: Conventional Commits; PRs must pass CI

## Tests

- Unit: Vitest; run `npm test`
- Create a root test describe with the name of service, class, etc. from file.
  Make a separate describe for each method in this root main describe.
  Cover all necessary positive and negative cases.
  Use a nested describe for positive and negative, please.
  Place all tests in `tests` folder according to vitest convention. Name tests with `.spec` suffix.
  Run these tests until they succeed. If they fail, analyze the error and the code. If the problem in the code, fix the code. If it test, fix the test.
  After test success, run eslint to check if there are any eslint problems. If there are, fix them. Rerun tests after fixing all eslint errors.

## Safety rails for agents

- When unsure, open a PR with TODOs rather than pushing to `main`

## Quick repo health checks

- `npm run typecheck && npm run lint && npm run test`
- `npm build` (ensures all packages compile)
