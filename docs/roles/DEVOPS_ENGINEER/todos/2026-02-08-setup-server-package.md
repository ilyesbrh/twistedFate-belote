# Setup Server Package (NestJS + Socket.io)

**Assigned To**: DevOps Engineer
**Created By**: CEO
**Created Date**: 2026-02-08
**Priority**: High
**Status**: TODO
**Sprint**: Sprint 0
**Estimated Complexity**: Medium

## Context
We need to set up the server package for our monorepo. This will be a NestJS application with Socket.io for real-time communication.

## Requirements
Create the server package in `packages/server/` with:
1. Initialize NestJS project structure
2. Install dependencies: @nestjs/*, @nestjs/platform-socket.io, socket.io
3. Set up basic module structure:
   - src/game/ (module for game logic)
   - src/rooms/ (module for room management)
   - src/main.ts (entry point)
4. Configure Socket.io adapter in main.ts
5. Add npm scripts: dev, build, start, lint

## Reference Documents
- Plan: ~/.claude/plans/tidy-enchanting-breeze.md (Phase 1)
- Sprint todos: docs/todos/SPRINT_0_TODOS.md (Task #3)

## Acceptance Criteria
- [ ] `packages/server/` directory created
- [ ] package.json with NestJS dependencies
- [ ] Basic NestJS module structure created
- [ ] main.ts with Socket.io adapter configured
- [ ] Server configured to run on port 3000
- [ ] `npm run dev:server` from root starts NestJS server
- [ ] TypeScript compiles without errors
- [ ] Server starts and logs "Listening on port 3000"

## Dependencies
- [x] Root package.json with workspaces (completed)
- [ ] None - can start immediately

## Blockers
None

## Notes
- Use @scoped package name: `@twistedfate/server`
- Use NestJS CLI if helpful, but manual setup is fine
- Don't need actual game logic yet, just structure
- Use TypeScript strict mode
- CORS should allow client connection

## Implementation Notes
[To be filled by DevOps Engineer when complete]

## Verification Notes
[To be filled by CEO after review]

---

**Status Updates**:
- 2026-02-08 - Status changed to TODO by CEO
