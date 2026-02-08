# Setup Shared Package (TypeScript)

**Assigned To**: DevOps Engineer
**Created By**: CEO
**Created Date**: 2026-02-08
**Priority**: High
**Status**: TODO
**Sprint**: Sprint 0
**Estimated Complexity**: Simple

## Context
We need a shared TypeScript package that both client and server can import. This will contain game types, constants, and business logic that must be consistent across frontend and backend.

## Requirements
Create the shared package in `packages/shared/` with:
1. Initialize TypeScript package
2. Set up folder structure:
   - src/models/ (Card, Player, GameState types)
   - src/game-rules/ (game logic functions)
   - src/constants/ (game constants)
   - src/validators/ (validation functions)
   - src/index.ts (main export)
3. Configure tsconfig.json for library build
4. Configure package.json to build to dist/
5. Add npm scripts: build, dev (watch mode)

## Reference Documents
- Plan: ~/.claude/plans/tidy-enchanting-breeze.md (Phase 1)
- Sprint todos: docs/todos/SPRINT_0_TODOS.md (Task #4)

## Acceptance Criteria
- [ ] `packages/shared/` directory created
- [ ] package.json with TypeScript dependencies
- [ ] Folder structure created (models, game-rules, constants, validators)
- [ ] tsconfig.json configured for library build
- [ ] index.ts exports structure ready (can be empty for now)
- [ ] TypeScript compiles to dist/
- [ ] Can be imported by both client and server packages
- [ ] Type definitions (.d.ts files) generated

## Dependencies
- [x] Root package.json with workspaces (completed)
- [ ] None - can start immediately

## Blockers
None

## Notes
- Use @scoped package name: `@twistedfate/shared`
- Configure as a library (not an app)
- Use TypeScript strict mode
- Should build to dist/ with both .js and .d.ts files
- Client and server should reference this in their package.json

## Implementation Notes
[To be filled by DevOps Engineer when complete]

## Verification Notes
[To be filled by CEO after review]

---

**Status Updates**:
- 2026-02-08 - Status changed to TODO by CEO
