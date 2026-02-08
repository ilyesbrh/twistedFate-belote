# TwistedFate Belote - Project Context

## Current Status
- **Phase**: Sprint 0 - Project Foundation
- **Last Updated**: 2026-02-08
- **Current Sprint**: Sprint 0 (Foundation)

## Project Overview
Building a Progressive Web App (PWA) for Tunisian Belote card game with real-time multiplayer using PixiJS and NestJS.

## Tech Stack
- **Frontend**: PixiJS v7+, TypeScript, Vite, Zustand, Socket.io-client
- **Backend**: NestJS, Socket.io, TypeScript
- **Shared**: TypeScript package for game logic
- **Architecture**: Monorepo with npm workspaces

## MVP Scope
- 4-player online multiplayer Belote game
- Coinche-style bidding system (adapt to Tunisian rules later)
- Core gameplay: bidding, card playing, scoring, declarations
- PWA installable on mobile devices
- Real-time synchronization via Socket.io

## Project Structure
```
twistedFate-belote/
├── packages/
│   ├── client/          # PixiJS PWA frontend
│   ├── server/          # NestJS backend
│   └── shared/          # Shared game logic
├── docs/
│   ├── roles/           # Agent role definitions
│   ├── todos/           # Sprint todos
│   ├── sprints/         # Sprint plans
│   └── technical-specs/ # Technical specifications
```

## Multi-Agent Strategy
Using Claude agents to simulate a full development team:
- Product Owner (PO)
- Product Manager (PM)
- Technical Architect
- Frontend Developer
- Backend Developer
- QA/Test Engineer
- DevOps Engineer

## Next Steps
1. Complete Sprint 0 setup
2. Begin Sprint 1 (Game Foundation & Data Models)

## Important Notes
- Start with standard Coinche rules, adapt to Tunisian variation later
- Focus on core gameplay for MVP (no auth, matchmaking, or social features)
- Mobile-first design
- Target 60fps on mobile devices
