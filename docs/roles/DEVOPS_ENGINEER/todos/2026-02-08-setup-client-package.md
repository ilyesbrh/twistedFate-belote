# Setup Client Package (Vite + PixiJS + TypeScript)

**Assigned To**: DevOps Engineer
**Created By**: CEO
**Created Date**: 2026-02-08
**Priority**: High
**Status**: TODO
**Sprint**: Sprint 0
**Estimated Complexity**: Medium

## Context
We need to set up the client package for our monorepo. This will be a Vite-based PWA using PixiJS for rendering and TypeScript for type safety.

## Requirements
Create the client package in `packages/client/` with:
1. Initialize with Vite + TypeScript template
2. Install dependencies: pixi.js, socket.io-client, zustand
3. Configure vite.config.ts for:
   - PWA support (@vite-pwa/vite-plugin)
   - Development server on port 5173
   - Proper TypeScript configuration
4. Set up basic folder structure:
   - src/scenes/
   - src/components/
   - src/services/
   - src/assets/
   - src/main.ts
5. Add npm scripts: dev, build, preview, lint

## Reference Documents
- Plan: ~/.claude/plans/tidy-enchanting-breeze.md (Phase 1)
- Sprint todos: docs/todos/SPRINT_0_TODOS.md (Task #2)

## Acceptance Criteria
- [ ] `packages/client/` directory created
- [ ] package.json with correct dependencies
- [ ] vite.config.ts configured properly
- [ ] Folder structure created (scenes, components, services, assets)
- [ ] Basic main.ts created (doesn't need to do much yet)
- [ ] `npm run dev:client` from root starts Vite dev server
- [ ] TypeScript compiles without errors
- [ ] No console warnings

## Dependencies
- [x] Root package.json with workspaces (completed)
- [ ] None - can start immediately

## Blockers
None

## Notes
- Use @scoped package name: `@twistedfate/client`
- Install vite-plugin-pwa for PWA capabilities
- Use TypeScript strict mode
- Keep it minimal for now - just the scaffold

## Implementation Notes
[To be filled by DevOps Engineer when complete]

## Verification Notes
[To be filled by CEO after review]

---

**Status Updates**:
- 2026-02-08 - Status changed to TODO by CEO
