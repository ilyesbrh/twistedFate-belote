# Sprint 0: Project Foundation - Todos

**Sprint Goal**: Set up monorepo, basic scaffolding, and dev environment

**Status**: IN PROGRESS
**Started**: 2026-02-08

---

## Tasks

### 1. Initialize monorepo with npm workspaces
**Status**: ✅ COMPLETED
**Details**:
- Created root `package.json` with workspaces configuration
- Set up concurrent dev scripts for client and server
- Added TypeScript, ESLint, Prettier as root dev dependencies

---

### 2. Set up client package (Vite + PixiJS + TypeScript)
**Status**: ⏳ TODO
**Details**:
- Create `packages/client/` directory
- Initialize with Vite + TypeScript template
- Install PixiJS, Socket.io-client, Zustand
- Configure vite.config.ts with PWA plugin
- Set up basic project structure (src/scenes, src/components, src/services)

**Acceptance Criteria**:
- `npm run dev:client` starts Vite dev server
- TypeScript compiles without errors
- PixiJS loads and renders basic canvas

---

### 3. Set up server package (NestJS + Socket.io)
**Status**: ⏳ TODO
**Details**:
- Create `packages/server/` directory
- Initialize NestJS project
- Install @nestjs/platform-socket.io, socket.io
- Set up basic module structure (game, rooms)
- Configure main.ts with Socket.io adapter

**Acceptance Criteria**:
- `npm run dev:server` starts NestJS server
- Socket.io gateway initialized
- Server listens on port 3000

---

### 4. Set up shared package (TypeScript)
**Status**: ⏳ TODO
**Details**:
- Create `packages/shared/` directory
- Initialize TypeScript package
- Set up folder structure (models, game-rules, constants, validators)
- Configure tsconfig.json for library build
- Export index.ts

**Acceptance Criteria**:
- TypeScript compiles to dist/
- Can be imported by both client and server
- Type definitions available

---

### 5. Configure TypeScript, ESLint, Prettier
**Status**: ⏳ TODO
**Details**:
- Create root tsconfig.json with base configuration
- Create eslintrc.json with TypeScript rules
- Create .prettierrc with formatting rules
- Add lint and format scripts to all packages

**Acceptance Criteria**:
- `npm run lint` checks all packages
- `npm run format` formats all packages
- No linting errors

---

### 6. Create basic PixiJS application scaffold
**Status**: ⏳ TODO
**Details**:
- Create main.ts entry point
- Set up PixiJS Application
- Create basic GameScene
- Add simple rendering test (background, text)

**Acceptance Criteria**:
- PixiJS renders in browser
- Canvas fills viewport
- No console errors

---

### 7. Set up NestJS with Socket.io gateway
**Status**: ⏳ TODO
**Details**:
- Create GameGateway with @WebSocketGateway
- Add connection/disconnection handlers
- Create basic test event (ping/pong)

**Acceptance Criteria**:
- Gateway accepts connections
- Connection events logged
- Can emit and receive events

---

### 8. Establish Socket.io connection test
**Status**: ⏳ TODO
**Details**:
- Connect client to server via Socket.io
- Send test event from client
- Receive response from server
- Display connection status

**Acceptance Criteria**:
- Client successfully connects to server
- Events transmitted both ways
- Connection displayed in UI

---

### 9. Create development scripts and README
**Status**: ⏳ TODO
**Details**:
- Create comprehensive README.md
- Document project structure
- Add setup instructions
- Document npm scripts

**Acceptance Criteria**:
- README explains project setup
- All scripts documented
- New developer can set up project from README

---

### 10. Set up Git and .gitignore
**Status**: ⏳ TODO
**Details**:
- Initialize git repository
- Create .gitignore (node_modules, dist, .env, etc.)
- Create initial commit

**Acceptance Criteria**:
- Git initialized
- node_modules and build artifacts ignored
- Clean git status

---

## Sprint 0 Acceptance Criteria

✅ All tasks above completed
⏳ `npm run dev` starts both client and server
⏳ Client connects to server via Socket.io
⏳ Hot reload works for both frontend and backend
⏳ TypeScript compiles without errors
⏳ No linting errors

---

## Notes

- Use npm workspaces for monorepo management
- All packages use TypeScript strict mode
- Shared package used for type definitions across client/server
- Development environment should work on Windows, Mac, Linux

## Next Sprint

Sprint 1: Game Foundation & Data Models
