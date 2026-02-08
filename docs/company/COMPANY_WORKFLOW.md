# Multi-Agent Company Workflow

**Our Philosophy**: We operate like a real software company with clear roles, asynchronous communication, and file-based work tracking.

---

## 🏢 Company Structure

### Leadership
- **CEO**: Strategic oversight, delegation, quality control, workflow management

### Product Team
- **Product Owner (PO)**: Feature definition, user stories, acceptance criteria
- **Product Manager (PM)**: Sprint planning, coordination, risk management

### Engineering Team
- **Technical Architect**: System design, technical decisions, architecture
- **Frontend Developer**: PixiJS implementation, UI/UX
- **Backend Developer**: NestJS implementation, server logic

### Quality & Operations
- **QA Engineer**: Testing, quality assurance, bug tracking
- **DevOps Engineer**: Build, deployment, infrastructure

---

## 📋 How Work Flows

### 1. CEO Reviews Current State
```
Read: docs/CURRENT_STATE.md
Read: docs/todos/SPRINT_X_TODOS.md
Check: Each role's todos folder
```

### 2. CEO Identifies What's Needed
```
"We need user stories for bidding"
→ Create todo for PO

"We need technical design for game state"
→ Create todo for Technical Architect

"Frontend code is written but not tested"
→ Create todo for QA Engineer
```

### 3. CEO Creates Work Items
```
File: docs/roles/[ROLE]/todos/YYYY-MM-DD-[task].md
Using: WORK_ITEM_TEMPLATE.md
```

### 4. Role Picks Up Work
```
Role reads their todos folder
Finds TODO items
Changes status to IN_PROGRESS
Does the work
Creates artifacts (code, docs, etc.)
Changes status to DONE
Adds implementation notes
```

### 5. CEO Verifies Work
```
CEO reads completed work
Checks against acceptance criteria
If good: Mark VERIFIED, update state
If issues: Create follow-up todo
```

### 6. Work Enables More Work
```
PO completes user story
→ CEO creates todo for Architect

Architect completes spec
→ CEO creates todos for Developers

Developers complete feature
→ CEO creates todo for QA

QA completes testing
→ CEO marks feature complete
```

---

## 🔄 Work Item Lifecycle

```
TODO
  ↓ (Role starts work)
IN_PROGRESS
  ↓ (Role completes work)
DONE
  ↓ (CEO reviews)
VERIFIED ✅

Special states:
BLOCKED 🚫 (Can't proceed, needs help)
```

---

## 💬 Inter-Role Communication

### All Communication via Files

#### Requesting Work
**PO wants Architect to design something**
```
Create: docs/roles/TECHNICAL_ARCHITECT/todos/YYYY-MM-DD-design-[feature].md
Architect sees it in their folder
Architect completes it
PO gets notification via CEO
```

#### Asking Questions
**Developer needs clarification from PO**
```
Create: docs/roles/PRODUCT_OWNER/todos/YYYY-MM-DD-clarify-[topic].md
Set priority: High
PO answers in the same file
Developer gets notification
```

#### Reporting Issues
**QA finds a bug**
```
Create: docs/roles/[DEVELOPER]/todos/YYYY-MM-DD-fix-[bug].md
Include: Reproduction steps, expected vs actual
Developer fixes it
QA verifies in DONE status
CEO marks VERIFIED
```

#### Proposing Ideas
**Anyone has an idea**
```
Create: docs/roles/CEO/todos/YYYY-MM-DD-proposal-[idea].md
CEO reviews
CEO decides: Accept/Reject/Defer
If accepted: CEO creates work items to implement
```

---

## 📁 File Organization

```
docs/
├── PROJECT_CONTEXT.md           # Never changes: overall vision
├── CURRENT_STATE.md             # Always current: what's happening now
├── WORK_ITEM_TEMPLATE.md        # Template for todos
├── SYSTEM_IMPROVEMENTS.md       # System enhancement ideas
├── COMPANY_WORKFLOW.md          # This file
│
├── roles/
│   ├── CEO/
│   │   ├── CEO.md               # Role definition
│   │   └── todos/               # Work for CEO
│   ├── PRODUCT_OWNER/
│   │   ├── PRODUCT_OWNER.md
│   │   └── todos/               # Work for PO
│   ├── TECHNICAL_ARCHITECT/
│   │   ├── TECHNICAL_ARCHITECT.md
│   │   └── todos/               # Work for Architect
│   └── [other roles...]/
│
├── todos/
│   └── SPRINT_X_TODOS.md        # High-level sprint progress
│
├── user-stories/                # PO artifacts
├── technical-specs/             # Architect artifacts
├── test-plans/                  # QA artifacts
└── decisions/                   # Decision logs (future)
```

---

## 🎯 CEO's Daily Workflow

### Morning (Session Start)
```
1. Read CURRENT_STATE.md
2. Check sprint progress
3. Review all pending todos across roles
4. Identify priorities for today
5. Create/update work items
```

### During Day
```
6. Monitor for DONE status todos
7. Review completed work
8. Verify against acceptance criteria
9. Create follow-up work if needed
10. Update CURRENT_STATE.md
11. Unblock any BLOCKED todos
```

### Evening (Session End)
```
12. Update sprint progress
13. Note accomplishments in CURRENT_STATE.md
14. Identify tomorrow's priorities
15. Flag any risks or blockers
```

---

## 👥 Role Workflows

### Product Owner
```
Inbox: docs/roles/PRODUCT_OWNER/todos/
Does:
  - Write user stories
  - Define acceptance criteria
  - Clarify requirements
  - Prioritize features
Outputs:
  - docs/user-stories/*.md
  - Updates to todos (implementation notes)
```

### Product Manager
```
Inbox: docs/roles/PRODUCT_MANAGER/todos/
Does:
  - Plan sprints
  - Track progress
  - Identify risks
  - Run retrospectives
Outputs:
  - docs/sprints/*.md
  - Risk assessments
  - Progress reports
```

### Technical Architect
```
Inbox: docs/roles/TECHNICAL_ARCHITECT/todos/
Does:
  - Design systems
  - Define APIs
  - Make tech decisions
  - Create specs
Outputs:
  - docs/technical-specs/*.md
  - Architecture diagrams
  - API definitions
```

### Frontend Developer
```
Inbox: docs/roles/FRONTEND_DEVELOPER/todos/
Does:
  - Implement PixiJS components
  - Build UI
  - Integrate Socket.io
  - Write frontend tests
Outputs:
  - packages/client/src/**/*.ts
  - Implementation notes in todos
```

### Backend Developer
```
Inbox: docs/roles/BACKEND_DEVELOPER/todos/
Does:
  - Implement NestJS modules
  - Build Socket.io gateway
  - Write game logic
  - Write backend tests
Outputs:
  - packages/server/src/**/*.ts
  - Implementation notes in todos
```

### QA Engineer
```
Inbox: docs/roles/QA_ENGINEER/todos/
Does:
  - Write test plans
  - Create test cases
  - Test features
  - Report bugs
Outputs:
  - docs/test-plans/*.md
  - Test files (*.spec.ts)
  - Bug reports (todos for developers)
```

### DevOps Engineer
```
Inbox: docs/roles/DEVOPS_ENGINEER/todos/
Does:
  - Setup environments
  - Configure builds
  - Deployment
  - Infrastructure
Outputs:
  - Build configs
  - Deployment docs
  - Setup guides
```

---

## 🚦 Work Prioritization

### Priority Levels
1. **Critical**: Blocks everything (drop everything)
2. **High**: Blocks sprint goal (do today)
3. **Medium**: Important but not blocking (this sprint)
4. **Low**: Nice to have (future sprint)

### CEO Prioritizes Based On
- Sprint goals
- Dependencies (what blocks what)
- Risk (what's highest risk)
- Value (what delivers most value)
- Balance (keep all roles productive)

---

## 🔥 Handling Blockers

### When a Role Gets Blocked
```
1. Update todo status to BLOCKED
2. Document blocker in todo file
3. CEO sees BLOCKED status
4. CEO either:
   - Resolves blocker directly
   - Creates todo for someone to resolve it
   - Re-prioritizes work
```

### Common Blockers
- Missing specification → Create todo for Architect
- Unclear requirements → Create todo for PO
- Technical issue → Create todo for relevant Developer
- Dependency not ready → Prioritize dependency work
- External blocker → Document and find workaround

---

## ✅ Definition of Done

### For Code Tasks
- [ ] Acceptance criteria met
- [ ] Code follows established patterns
- [ ] TypeScript strict mode, no `any`
- [ ] Error handling implemented
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] CEO reviewed and verified

### For Documentation Tasks
- [ ] Clear and complete
- [ ] Follows template (if applicable)
- [ ] References linked
- [ ] Examples provided (if applicable)
- [ ] CEO reviewed and verified

### For Design Tasks
- [ ] Problem clearly stated
- [ ] Options considered
- [ ] Recommendation made with rationale
- [ ] Impact assessed
- [ ] CEO reviewed and approved

---

## 🎓 Best Practices

### 1. Asynchronous First
Don't wait for responses. Work on what's unblocked.

### 2. Document Everything
If it's not written, it doesn't exist.

### 3. Single Responsibility
Each todo has one owner, one clear goal.

### 4. Clear Acceptance Criteria
Everyone knows when it's done.

### 5. Reference Don't Repeat
Link to existing docs, don't copy them.

### 6. Update Status Promptly
Keep status current so CEO knows what's happening.

### 7. Implementation Notes
Always document what you did and why.

### 8. Ask Questions Early
Blocked? Create a todo for clarification immediately.

---

## 🔄 Sprint Cadence

### Sprint Start
```
1. PM plans sprint (at CEO's request)
2. PO writes user stories
3. Architect creates technical designs
4. CEO reviews and approves
5. CEO creates implementation todos for developers
```

### Sprint Middle
```
6. Developers implement
7. QA tests completed work
8. CEO verifies and accepts
9. Blockers resolved as they arise
```

### Sprint End
```
10. Final QA verification
11. CEO confirms sprint goal met
12. PM runs retrospective
13. CEO updates CURRENT_STATE.md
14. Prepare for next sprint
```

---

## 📊 Success Indicators

### Healthy Workflow
- ✅ Todos moving through lifecycle smoothly
- ✅ Minimal BLOCKED items
- ✅ All roles have work (not idle)
- ✅ Regular VERIFIED completions
- ✅ CURRENT_STATE.md stays updated

### Unhealthy Workflow
- ❌ Todos stuck in TODO or IN_PROGRESS
- ❌ Many BLOCKED items
- ❌ Some roles overloaded, others idle
- ❌ Few completions
- ❌ CURRENT_STATE.md outdated

### CEO Response to Problems
- Identify bottleneck
- Redistribute work
- Unblock blocked items
- Adjust priorities
- Improve process

---

## 🎯 Example: Complete Feature Flow

### Scenario: Implement Bidding System

```
Day 1:
CEO: Create todo for PO → Write bidding user story
PO: Completes user story
CEO: Verify, create todo for Architect → Design bidding system

Day 2:
Architect: Completes technical spec
CEO: Verify, create todos:
  - Frontend Dev → Build bidding UI
  - Backend Dev → Build bidding logic
  - Shared → Define bidding types

Day 3-5:
Frontend Dev: Implements UI (status: IN_PROGRESS)
Backend Dev: Implements logic (status: IN_PROGRESS)
Both: Mark DONE when complete

Day 6:
CEO: Review code, verify against acceptance criteria
CEO: Create todo for QA → Test bidding system

Day 7:
QA: Tests bidding, finds 2 bugs
QA: Creates todos for developers → Fix bugs

Day 8:
Developers: Fix bugs (status: DONE)
QA: Retests (status: VERIFIED)
CEO: Mark feature complete in sprint
CEO: Update CURRENT_STATE.md
```

---

**Remember**: This system is designed to work across context resets. Everything is in files. Anyone can pick up where we left off.
