# TwistedFate - Belote Card Game

A Progressive Web App (PWA) for playing Tunisian Belote online with real-time multiplayer.

---

## 🎯 Project Status

**Current Sprint**: Sprint 0 - Project Foundation
**Status**: 🟡 In Progress (Day 1)
**System**: 🟢 Operational

👉 **See [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) for live status**

---

## 🏢 Development Approach

This project uses a **multi-agent development strategy** where different AI agents take on specific roles (CEO, Product Owner, Developers, QA, etc.) and communicate via file-based work items.

### Key Innovation
- **CEO Oversight**: Strategic management without technical implementation
- **Role-Based Todos**: Each role has a `todos/` folder for work items
- **Async Communication**: All work tracked in files (context-reset proof)
- **Full Transparency**: Anyone can see everything anytime

---

## 📁 Quick Navigation

### For Context Recovery (Start Here!)
1. [PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md) - Project vision & tech stack
2. [CURRENT_STATE.md](docs/CURRENT_STATE.md) - Where we are now
3. [COMPANY_WORKFLOW.md](docs/COMPANY_WORKFLOW.md) - How our company works

### Documentation
- [QUICK_START.md](docs/QUICK_START.md) - Quick reference commands
- [WORK_ITEM_TEMPLATE.md](docs/WORK_ITEM_TEMPLATE.md) - Todo template
- [SYSTEM_IMPROVEMENTS.md](docs/SYSTEM_IMPROVEMENTS.md) - Enhancement roadmap
- [RISK_REGISTER.md](docs/RISK_REGISTER.md) - Active risks

### Roles
All roles defined in [docs/roles/](docs/roles/) with their own `todos/` folders:
- [CEO](docs/roles/CEO.md) - Strategic oversight
- [Product Owner](docs/roles/PRODUCT_OWNER.md) - Feature definition
- [Product Manager](docs/roles/PRODUCT_MANAGER.md) - Sprint planning
- [Technical Architect](docs/roles/TECHNICAL_ARCHITECT.md) - System design
- [Frontend Developer](docs/roles/FRONTEND_DEVELOPER.md) - PixiJS implementation
- [Backend Developer](docs/roles/BACKEND_DEVELOPER.md) - NestJS implementation
- [QA Engineer](docs/roles/QA_ENGINEER.md) - Testing & quality
- [DevOps Engineer](docs/roles/DEVOPS_ENGINEER.md) - Build & deployment

---

## 🏗️ Tech Stack

### Frontend
- **PixiJS** v7+ - High-performance 2D rendering
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **Socket.io-client** - Real-time communication
- **PWA** - Progressive Web App capabilities

### Backend
- **NestJS** - TypeScript server framework
- **Socket.io** - Real-time bidirectional communication
- **TypeScript** - Type safety

### Shared
- **TypeScript** package for game logic shared between client/server

### Architecture
- **Monorepo** with npm workspaces
- **3 packages**: client, server, shared

---

## 🚀 Getting Started (When Setup Complete)

```bash
# Install dependencies
npm install

# Run development servers (client + server)
npm run dev

# Run client only
npm run dev:client

# Run server only
npm run dev:server

# Build for production
npm run build

# Run tests
npm run test
```

**Note**: Package setup is currently in progress. See Sprint 0 todos for status.

---

## 📋 Current Sprint: Sprint 0

**Goal**: Set up monorepo, basic scaffolding, and dev environment

**Progress**: 1/10 tasks (10%)

**Active Work**:
- Setting up client package (Vite + PixiJS)
- Setting up server package (NestJS + Socket.io)
- Setting up shared package (TypeScript)

See [docs/todos/SPRINT_0_TODOS.md](docs/todos/SPRINT_0_TODOS.md) for details.

---

## 🎮 What We're Building

A mobile-first Belote card game with:
- **Real-time multiplayer**: 4 players online simultaneously
- **Coinche-style bidding**: Start with Coinche, adapt to Tunisian rules later
- **Core gameplay**: Bidding, card playing, scoring, declarations
- **PWA**: Installable on mobile devices, works offline
- **60fps performance**: Smooth animations on mobile

---

## 📊 Project Health

**System Health**: ✅ Healthy
- All roles defined and operational
- File-based state management working
- Risk register active
- Work flowing smoothly

**Risks Being Managed**:
- Real-time multiplayer complexity
- Mobile performance targets
- Game rules complexity
- Context resets (mitigated)

See [RISK_REGISTER.md](docs/RISK_REGISTER.md) for details.

---

## 🔄 How to Contribute (Multi-Agent Style)

### As CEO (Strategic Oversight)
```
Read docs/CURRENT_STATE.md
Review all role todos
Delegate work by creating todos
Verify completed work
Keep everything moving
```

### As Any Role (Implementation)
```
Check your todos: docs/roles/[YOUR_ROLE]/todos/
Pick up TODO items
Update status to IN_PROGRESS
Do the work
Update status to DONE
Add implementation notes
```

### Create Work for Others
```
Create file: docs/roles/[TARGET_ROLE]/todos/YYYY-MM-DD-[task].md
Use template: docs/WORK_ITEM_TEMPLATE.md
They'll see it and handle it
```

---

## 📚 Documentation Structure

```
docs/
├── PROJECT_CONTEXT.md           # Never changes
├── CURRENT_STATE.md             # Always current
├── COMPANY_WORKFLOW.md          # How we work
├── roles/                       # 8 roles with todos
│   ├── CEO/
│   ├── PRODUCT_OWNER/
│   ├── PRODUCT_MANAGER/
│   ├── TECHNICAL_ARCHITECT/
│   ├── FRONTEND_DEVELOPER/
│   ├── BACKEND_DEVELOPER/
│   ├── QA_ENGINEER/
│   └── DEVOPS_ENGINEER/
├── decisions/                   # Decision logs
├── user-stories/                # PO artifacts
├── technical-specs/             # Architect artifacts
└── test-plans/                  # QA artifacts
```

---

## 🎯 MVP Goals

Sprint 0-5 will deliver:
- ✅ Project foundation
- ⏳ Game data models
- ⏳ Bidding system
- ⏳ Card playing mechanics
- ⏳ Scoring & declarations
- ⏳ PWA polish

Result: 4 players can play a complete Coinche Belote game online!

---

## 🤝 Team

This project uses AI agents in defined roles:
- **1 CEO**: Strategic oversight (doesn't write code)
- **2 Product roles**: PO + PM
- **1 Architect**: Technical design
- **2 Developers**: Frontend + Backend
- **2 Operations**: QA + DevOps

All working asynchronously via file-based todos.

---

## 📝 License

MIT

---

## 🚀 Next Steps

1. Complete Sprint 0 package setup
2. Begin Sprint 1 (game data models)
3. Build out core gameplay features
4. Test and polish
5. Launch MVP!

**Want to see live progress?** Check [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md)

---

**Built with the multi-agent development methodology** 🤖✨
