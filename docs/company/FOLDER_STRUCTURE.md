# Project Folder Structure

Complete guide to the project's folder organization.

---

## 📁 Root Structure

```
twistedFate-belote/
├── docs/                       # All documentation
├── packages/                   # Monorepo code packages
├── package.json                # Root workspace config
├── README.md                   # Project overview
└── .claude/                    # Claude settings
```

---

## 📚 Documentation Structure (docs/)

```
docs/
│
├── company/                    [READ: All roles]
│   ├── MANIFESTO.md           # Project vision, goals, tech stack
│   ├── COMPANY_WORKFLOW.md    # How our company operates
│   ├── ROLE_ACCESS_GUIDE.md   # What each role can access
│   ├── FOLDER_STRUCTURE.md    # This file
│   ├── WORK_ITEM_TEMPLATE.md  # Template for creating todos
│   ├── QUICK_START.md         # Quick reference commands
│   ├── RISK_REGISTER.md       # Active risk tracking
│   └── SYSTEM_IMPROVEMENTS.md # Enhancement roadmap
│
├── shared/                     [READ: All, WRITE: Specific roles]
│   ├── decisions/             # Architecture decision records
│   │   └── DECISION_TEMPLATE.md
│   ├── user-stories/          # Product Owner outputs
│   ├── technical-specs/       # Architect outputs
│   ├── test-plans/            # QA Engineer outputs
│   └── sprints/               # Product Manager outputs
│
├── roles/                      [READ/WRITE: Individual role only]
│   ├── CEO/
│   │   ├── README.md          # Role definition & responsibilities
│   │   ├── todos/             # Work items assigned to CEO
│   │   └── notes/             # Private notes (not shared)
│   │
│   ├── PRODUCT_OWNER/
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── PRODUCT_MANAGER/
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── TECHNICAL_ARCHITECT/
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── FRONTEND_DEVELOPER/
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── BACKEND_DEVELOPER/
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── QA_ENGINEER/
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   └── DEVOPS_ENGINEER/
│       ├── README.md
│       ├── todos/
│       └── notes/
│
├── todos/                      [READ: All, WRITE: CEO]
│   └── SPRINT_X_TODOS.md      # High-level sprint tracking
│
├── CURRENT_STATE.md            [READ: All, WRITE: CEO]
└── MULTI_AGENT_WORKFLOW.md     [READ: All] (legacy doc)
```

---

## 📦 Code Structure (packages/)

```
packages/
│
├── client/                     [Frontend: PixiJS PWA]
│   ├── src/
│   │   ├── scenes/            # PixiJS game scenes
│   │   ├── components/        # Game UI components
│   │   ├── services/          # Socket.io, state management
│   │   ├── assets/            # Images, sprites, sounds
│   │   └── main.ts            # Entry point
│   ├── public/                # Static assets, PWA manifest
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript config
│   └── package.json           # @twistedfate/client
│
├── server/                     [Backend: NestJS]
│   ├── src/
│   │   ├── game/              # Game gateway & service
│   │   ├── rooms/             # Room management
│   │   ├── dto/               # Data transfer objects
│   │   └── main.ts            # Entry point
│   ├── tsconfig.json          # TypeScript config
│   └── package.json           # @twistedfate/server
│
└── shared/                     [Shared: Game Logic]
    ├── src/
    │   ├── models/            # Card, Player, GameState types
    │   ├── game-rules/        # Belote rules engine
    │   ├── constants/         # Game constants
    │   ├── validators/        # Move validation
    │   └── index.ts           # Main export
    ├── tsconfig.json          # TypeScript config (library)
    └── package.json           # @twistedfate/shared
```

---

## 🎯 Folder Purpose Guide

### docs/company/
**Purpose**: Company-wide knowledge that all roles need
**Who Reads**: Everyone
**Who Writes**: CEO (mostly)
**Examples**: Project vision, workflow, templates

### docs/shared/
**Purpose**: Completed work outputs that multiple roles consume
**Who Reads**: Everyone
**Who Writes**: Specific roles (PO, Architect, QA, PM)
**Examples**: User stories, technical specs, test plans

### docs/roles/[ROLE]/
**Purpose**: Role-specific workspace
**Who Reads**: That role only (+ CEO for todos)
**Who Writes**: That role only
**Subfolders**:
- `README.md` - Role definition
- `todos/` - Work items assigned to this role
- `notes/` - Private scratchpad (truly private)

### docs/todos/
**Purpose**: High-level sprint progress tracking
**Who Reads**: Everyone
**Who Writes**: CEO only
**Examples**: Sprint 0 todos, Sprint 1 todos

### packages/[PACKAGE]/
**Purpose**: Actual code implementation
**Who Reads**: Developers, QA, DevOps
**Who Writes**: Developers, DevOps
**Examples**: Frontend code, backend code, shared logic

---

## 🔒 Access Control Summary

| Folder | CEO | PO | PM | Arch | FE Dev | BE Dev | QA | DevOps |
|--------|-----|----|----|------|--------|--------|----|----|
| docs/company/ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| docs/shared/ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| docs/roles/CEO/ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| docs/roles/[OTHER]/ | 📋* | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| docs/CURRENT_STATE.md | ✅ | 👁️ | 👁️ | 👁️ | 👁️ | 👁️ | 👁️ | 👁️ |
| packages/ | 👁️ | 👁️ | 👁️ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Legend**:
- ✅ Full read/write access
- 👁️ Read-only access
- 📋* CEO can read todos/ for monitoring, but not notes/
- ❌ No access

---

## 📝 File Naming Conventions

### Work Items (Todos)
```
docs/roles/[ROLE]/todos/YYYY-MM-DD-[short-description].md

Examples:
2026-02-08-setup-client-package.md
2026-02-10-implement-bidding-ui.md
2026-02-15-fix-card-play-bug.md
```

### Shared Artifacts
```
docs/shared/[category]/[descriptive-name].md

Examples:
docs/shared/user-stories/bidding-system.md
docs/shared/technical-specs/game-state-sync.md
docs/shared/decisions/2026-02-08-use-pixijs.md
docs/shared/test-plans/bidding-tests.md
docs/shared/sprints/sprint-1-plan.md
```

### Private Notes
```
docs/roles/[ROLE]/notes/[any-name].md

Examples:
docs/roles/FRONTEND_DEVELOPER/notes/component-ideas.md
docs/roles/TECHNICAL_ARCHITECT/notes/architecture-thoughts.md
```

---

## 🗺️ Navigation Tips

### Starting Fresh (Context Reset)
```
1. Read: docs/company/MANIFESTO.md
2. Read: docs/CURRENT_STATE.md
3. Read: docs/roles/[MY_ROLE]/README.md
4. Check: docs/roles/[MY_ROLE]/todos/
```

### Finding Information
- **Project vision**: `docs/company/MANIFESTO.md`
- **Current status**: `docs/CURRENT_STATE.md`
- **How to work**: `docs/company/COMPANY_WORKFLOW.md`
- **My work**: `docs/roles/[MY_ROLE]/todos/`
- **User requirements**: `docs/shared/user-stories/`
- **Technical specs**: `docs/shared/technical-specs/`
- **Test plans**: `docs/shared/test-plans/`

### Creating Work Items
```
Use template: docs/company/WORK_ITEM_TEMPLATE.md
Create in: docs/roles/[TARGET_ROLE]/todos/[date]-[task].md
```

---

## 🚀 Benefits of This Structure

1. **Clear Boundaries**: Everyone knows what they can access
2. **No Information Leakage**: Roles stay focused
3. **Shared Context**: Common knowledge in docs/company/
4. **Async Communication**: Work via files, not synchronous chat
5. **Scalable**: Easy to add new roles
6. **Context-Proof**: Everything persists in files
7. **Realistic**: Mimics real company structure

---

**This structure supports the multi-agent company model!** 🏢
