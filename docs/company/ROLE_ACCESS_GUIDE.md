# Role Access Guide

This document defines what each role can read and write to prevent information leakage.

---

## 🔒 Access Control Principles

1. **Isolation**: Each role only reads their own folder
2. **Shared Context**: All roles read company-wide docs
3. **Output Sharing**: Completed work goes to shared folders
4. **No Peeking**: Roles don't read other roles' todos or notes

---

## 📁 Folder Structure & Access

```
docs/
├── company/                    [READ: All roles]
│   ├── MANIFESTO.md           # Project vision & context
│   ├── COMPANY_WORKFLOW.md    # How we operate
│   ├── ROLE_ACCESS_GUIDE.md   # This file
│   ├── WORK_ITEM_TEMPLATE.md  # Todo template
│   ├── QUICK_START.md         # Quick reference
│   ├── RISK_REGISTER.md       # Active risks
│   └── SYSTEM_IMPROVEMENTS.md # Enhancement roadmap
│
├── shared/                     [READ: All roles, WRITE: Specific role]
│   ├── decisions/             # Decision logs (Architect writes)
│   ├── user-stories/          # User stories (PO writes)
│   ├── technical-specs/       # Tech specs (Architect writes)
│   ├── test-plans/            # Test plans (QA writes)
│   └── sprints/               # Sprint plans (PM writes)
│
├── roles/
│   ├── CEO/                   [READ/WRITE: CEO only]
│   │   ├── README.md          # My role definition
│   │   ├── todos/             # My work items
│   │   └── notes/             # My private notes
│   │
│   ├── PRODUCT_OWNER/         [READ/WRITE: PO only]
│   │   ├── README.md          # Role definition
│   │   ├── todos/             # Work assigned to me
│   │   └── notes/             # My notes
│   │
│   ├── PRODUCT_MANAGER/       [READ/WRITE: PM only]
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── TECHNICAL_ARCHITECT/   [READ/WRITE: Architect only]
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── FRONTEND_DEVELOPER/    [READ/WRITE: Frontend only]
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── BACKEND_DEVELOPER/     [READ/WRITE: Backend only]
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   ├── QA_ENGINEER/           [READ/WRITE: QA only]
│   │   ├── README.md
│   │   ├── todos/
│   │   └── notes/
│   │
│   └── DEVOPS_ENGINEER/       [READ/WRITE: DevOps only]
│       ├── README.md
│       ├── todos/
│       └── notes/
│
├── CURRENT_STATE.md           [READ: All, WRITE: CEO only]
└── todos/                     [READ: All, WRITE: CEO only]
    └── SPRINT_X_TODOS.md
```

---

## 🎯 Role-Specific Access

### CEO
**Reads**:
- ✅ docs/company/* (all company docs)
- ✅ docs/shared/* (all shared artifacts)
- ✅ docs/roles/CEO/* (my folder)
- ✅ docs/roles/*/todos/* (all roles' todos for monitoring)
- ✅ docs/CURRENT_STATE.md
- ✅ docs/todos/*

**Writes**:
- ✅ docs/roles/*/todos/* (create work for others)
- ✅ docs/CURRENT_STATE.md (maintain state)
- ✅ docs/company/* (update company docs)
- ✅ docs/roles/CEO/* (my notes)

**Cannot Read**:
- ❌ docs/roles/*/notes/* (other roles' private notes)

---

### Product Owner (PO)
**Reads**:
- ✅ docs/company/* (company context)
- ✅ docs/shared/* (all shared artifacts)
- ✅ docs/roles/PRODUCT_OWNER/* (my folder)
- ✅ docs/CURRENT_STATE.md (project status)

**Writes**:
- ✅ docs/roles/PRODUCT_OWNER/todos/* (update my todos)
- ✅ docs/shared/user-stories/* (create user stories)
- ✅ docs/roles/*/todos/* (create work for others)

**Cannot Read**:
- ❌ docs/roles/[OTHER_ROLE]/todos/* (other roles' work)
- ❌ docs/roles/[OTHER_ROLE]/notes/* (other roles' notes)

---

### Product Manager (PM)
**Reads**:
- ✅ docs/company/*
- ✅ docs/shared/*
- ✅ docs/roles/PRODUCT_MANAGER/*
- ✅ docs/CURRENT_STATE.md
- ✅ docs/todos/* (sprint todos for planning)

**Writes**:
- ✅ docs/roles/PRODUCT_MANAGER/todos/*
- ✅ docs/shared/sprints/* (create sprint plans)
- ✅ docs/roles/*/todos/* (create work for others)

**Cannot Read**:
- ❌ Other roles' todos/notes

---

### Technical Architect
**Reads**:
- ✅ docs/company/*
- ✅ docs/shared/*
- ✅ docs/roles/TECHNICAL_ARCHITECT/*
- ✅ docs/CURRENT_STATE.md

**Writes**:
- ✅ docs/roles/TECHNICAL_ARCHITECT/todos/*
- ✅ docs/shared/technical-specs/* (create specs)
- ✅ docs/shared/decisions/* (document decisions)
- ✅ docs/roles/*/todos/* (create work for others)

**Cannot Read**:
- ❌ Other roles' todos/notes

---

### Frontend Developer
**Reads**:
- ✅ docs/company/*
- ✅ docs/shared/* (especially technical-specs, user-stories)
- ✅ docs/roles/FRONTEND_DEVELOPER/*
- ✅ docs/CURRENT_STATE.md

**Writes**:
- ✅ docs/roles/FRONTEND_DEVELOPER/todos/*
- ✅ packages/client/* (write code)
- ✅ docs/roles/*/todos/* (create work for others, like asking questions)

**Cannot Read**:
- ❌ Other roles' todos/notes

---

### Backend Developer
**Reads**:
- ✅ docs/company/*
- ✅ docs/shared/* (especially technical-specs, user-stories)
- ✅ docs/roles/BACKEND_DEVELOPER/*
- ✅ docs/CURRENT_STATE.md

**Writes**:
- ✅ docs/roles/BACKEND_DEVELOPER/todos/*
- ✅ packages/server/* (write code)
- ✅ packages/shared/* (write shared logic)
- ✅ docs/roles/*/todos/* (create work for others)

**Cannot Read**:
- ❌ Other roles' todos/notes

---

### QA Engineer
**Reads**:
- ✅ docs/company/*
- ✅ docs/shared/* (especially user-stories, technical-specs)
- ✅ docs/roles/QA_ENGINEER/*
- ✅ docs/CURRENT_STATE.md
- ✅ packages/* (read code to test)

**Writes**:
- ✅ docs/roles/QA_ENGINEER/todos/*
- ✅ docs/shared/test-plans/* (create test plans)
- ✅ **/*.spec.ts (write tests)
- ✅ docs/roles/*/todos/* (create bug reports for developers)

**Cannot Read**:
- ❌ Other roles' todos/notes

---

### DevOps Engineer
**Reads**:
- ✅ docs/company/*
- ✅ docs/shared/*
- ✅ docs/roles/DEVOPS_ENGINEER/*
- ✅ docs/CURRENT_STATE.md

**Writes**:
- ✅ docs/roles/DEVOPS_ENGINEER/todos/*
- ✅ Build configs (package.json, tsconfig.json, etc.)
- ✅ CI/CD configs
- ✅ docs/roles/*/todos/* (create work for others)

**Cannot Read**:
- ❌ Other roles' todos/notes

---

## 📝 Communication Rules

### Creating Work for Another Role
Any role can create a todo in another role's folder:

```
docs/roles/[TARGET_ROLE]/todos/YYYY-MM-DD-[task-name].md
```

**Example**: Frontend Developer needs a spec from Architect:
```
Create: docs/roles/TECHNICAL_ARCHITECT/todos/2026-02-08-design-component-api.md
```

### Sharing Completed Work
When work is done, output goes to shared folders:

**PO completes user story**:
- Create: `docs/shared/user-stories/bidding-system.md`
- Update todo status to DONE
- Others can now read the user story

**Architect completes spec**:
- Create: `docs/shared/technical-specs/game-state-sync.md`
- Update todo status to DONE
- Developers can now implement from spec

**QA completes test plan**:
- Create: `docs/shared/test-plans/bidding-tests.md`
- Update todo status to DONE
- Others can see test coverage

---

## 🔐 Private Notes

Each role has a `notes/` folder for private thoughts:
- **Personal**: Not shared with others
- **Scratchpad**: Work-in-progress ideas
- **Context**: Things to remember

**Example Uses**:
- Developer notes implementation ideas before committing
- Architect sketches different approaches
- QA documents exploratory test findings

---

## 🚨 Access Violations

### ❌ DON'T DO:
- Read other roles' todos (unless you're CEO)
- Read other roles' notes (ever, even CEO)
- Write directly to shared/ without completing your todo first
- Peek at what others are working on

### ✅ DO:
- Read company docs for context
- Read shared artifacts for your work
- Write your own todos and notes
- Create todos for others when you need something
- Share completed work via shared folders

---

## 🎯 Benefits of This System

1. **Focus**: Each role focuses on their work, not distracted by others
2. **Clean Boundaries**: Clear what you can/can't access
3. **Realistic**: Mimics real companies with team boundaries
4. **Scalable**: Easy to add new roles
5. **Secure**: No information leakage
6. **Async**: Request work via todos, don't wait for responses

---

## 📖 Quick Reference

### I'm Starting My Session
1. Read `docs/company/MANIFESTO.md` - Understand the project
2. Read `docs/CURRENT_STATE.md` - See current status
3. Read `docs/roles/[MY_ROLE]/README.md` - My responsibilities
4. Check `docs/roles/[MY_ROLE]/todos/` - My work items
5. Start working!

### I Need Something From Another Role
1. Create file: `docs/roles/[THEIR_ROLE]/todos/YYYY-MM-DD-[task].md`
2. Use template: `docs/company/WORK_ITEM_TEMPLATE.md`
3. They'll see it and handle it
4. Continue with other work (don't block)

### I Completed Work
1. Update my todo status to DONE
2. Add implementation notes to todo
3. If artifact: Copy to `docs/shared/[appropriate-folder]/`
4. CEO will verify and mark VERIFIED

---

**Remember**: This access control keeps work focused and prevents confusion!
