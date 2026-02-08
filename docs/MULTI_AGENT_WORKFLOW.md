# Multi-Agent Development Workflow

This document explains how to use the multi-agent strategy for developing TwistedFate Belote.

## Overview

We simulate a full development team using Claude agents, where each agent takes on a specific role with defined responsibilities. All work is documented in files to maintain continuity across context resets.

## Agent Roles

Each role is defined in `docs/roles/`:
- **Product Owner** - Feature definition, user stories
- **Product Manager** - Sprint planning, coordination
- **Technical Architect** - System design, technical decisions
- **Frontend Developer** - PixiJS implementation
- **Backend Developer** - NestJS implementation
- **QA Engineer** - Testing, quality assurance
- **DevOps** - Build, deployment, infrastructure

## How to Work With Agents

### Step 1: Choose the Right Role
Identify which role is needed for the current task:
- Need user stories? → Product Owner
- Planning a sprint? → Product Manager
- Designing an API? → Technical Architect
- Building UI? → Frontend Developer
- Building server logic? → Backend Developer
- Writing tests? → QA Engineer
- Setting up builds? → DevOps

### Step 2: Use Role-Specific Prompts
Open the role file (e.g., `docs/roles/PRODUCT_OWNER.md`) and use the example prompts:

```
As [ROLE], [task description]
```

**Example:**
```
As Product Owner, create user stories for the bidding system.
Include user personas, goals, and acceptance criteria.
```

### Step 3: Agent Produces Artifacts
The agent will create documentation in the appropriate folder:
- User stories → `docs/user-stories/`
- Sprint plans → `docs/sprints/`
- Technical specs → `docs/technical-specs/`
- Test plans → `docs/test-plans/`

### Step 4: Update Progress
After agent completes work:
1. Update `docs/CURRENT_STATE.md` with progress
2. Update `docs/todos/SPRINT_X_TODOS.md` with task status
3. Commit changes to preserve state

## Typical Sprint Workflow

### Sprint Start
1. **PM + PO**: Plan the sprint
   ```
   As PM, create a plan for Sprint 1. Include goals, tasks, dependencies.
   ```

2. **PO**: Write user stories
   ```
   As PO, create user stories for Sprint 1 features.
   ```

3. **Architect**: Design technical approach
   ```
   As Technical Architect, design the data models for Sprint 1.
   ```

### During Sprint
4. **Frontend/Backend Devs**: Implement features
   ```
   As Frontend Developer, implement the card hand component.
   ```

5. **QA**: Write tests and verify
   ```
   As QA Engineer, create test plan for card hand component.
   ```

### Sprint End
6. **QA**: Final testing
   ```
   As QA Engineer, verify all Sprint 1 acceptance criteria are met.
   ```

7. **PM**: Retrospective
   ```
   As PM, conduct a retrospective for Sprint 1. What went well?
   What needs improvement?
   ```

## Multi-Agent Collaboration Example

### Scenario: Implementing Bidding System

**Phase 1: Definition (PO)**
```
As Product Owner, create user stories for the bidding system.
```
→ Produces: `docs/user-stories/bidding-system.md`

**Phase 2: Design (Architect)**
```
As Technical Architect, design the bidding system architecture.
Include data models, Socket.io events, validation logic.
```
→ Produces: `docs/technical-specs/bidding-architecture.md`

**Phase 3: Frontend (Frontend Dev)**
```
As Frontend Developer, implement the bidding UI in PixiJS
based on the technical spec.
```
→ Produces: `packages/client/src/components/BiddingPanel.ts`

**Phase 4: Backend (Backend Dev)**
```
As Backend Developer, implement the bidding logic in NestJS
based on the technical spec.
```
→ Produces: `packages/server/src/game/bidding.service.ts`

**Phase 5: Testing (QA)**
```
As QA Engineer, create test plan for bidding system and write tests.
```
→ Produces: `docs/test-plans/bidding-tests.md` + test files

**Phase 6: Review (All)**
Review code, tests, documentation. Make adjustments as needed.

## File-Based State Management

### Why Files?
Claude's context can reset. Files ensure:
- Nothing is lost between sessions
- Any agent can pick up where another left off
- Clear audit trail of decisions and progress

### Critical Files to Maintain

**Always keep these updated:**
1. `docs/CURRENT_STATE.md` - Current progress snapshot
2. `docs/todos/SPRINT_X_TODOS.md` - Current sprint tasks
3. `docs/PROJECT_CONTEXT.md` - Project overview

**After each major milestone:**
4. Update sprint docs
5. Document architectural decisions
6. Update technical specs

### Recovery After Context Reset

If context resets, read in this order:
1. `docs/PROJECT_CONTEXT.md` - Understand the project
2. `docs/CURRENT_STATE.md` - See current state
3. `docs/todos/SPRINT_X_TODOS.md` - Check current tasks
4. Relevant role files for guidance

## Best Practices

### 1. Single Responsibility
Each agent invocation should focus on ONE role's work. Don't mix roles.

❌ Bad:
```
Create user stories and implement the feature.
```

✅ Good:
```
As Product Owner, create user stories for the feature.
[later]
As Frontend Developer, implement the feature based on the user stories.
```

### 2. Clear Artifacts
Each agent should produce concrete, documented output.

### 3. Update State Files
After significant work, update:
- `CURRENT_STATE.md`
- Sprint todos
- Progress checkboxes

### 4. Reference Previous Work
Agents should reference existing documentation:
```
As Backend Developer, implement the bidding logic according to
the architecture spec in docs/technical-specs/bidding-architecture.md
```

### 5. Cross-Role Validation
Have QA verify developer work. Have Architect review implementations.

## Parallel vs Sequential Work

### Sequential (Dependencies)
When work depends on previous tasks:
1. Architect designs API
2. Frontend Dev implements client
3. Backend Dev implements server
4. QA tests integration

### Parallel (Independent)
When work is independent:
- Frontend Dev works on UI (same time as)
- Backend Dev works on game logic
- QA prepares test plans

## Communication Between Agents

Agents communicate through documents:
- Architect writes spec → Devs implement from spec
- PO writes user stories → Devs build to stories
- QA writes bug report → Devs fix based on report

All communication is **asynchronous** and **document-based**.

## Example Prompt Templates

### Product Owner
```
As Product Owner, [define/create/prioritize] [feature/user stories/acceptance criteria]
for [specific feature]. [Additional context if needed].
```

### Product Manager
```
As Product Manager, [plan/track/assess] [sprint/milestone/risks]
for [Sprint X / feature area]. [Include specific requirements].
```

### Technical Architect
```
As Technical Architect, [design/evaluate/document] [system/API/architecture]
for [specific feature]. [Include constraints and requirements].
```

### Frontend Developer
```
As Frontend Developer, implement [component/scene/feature] in PixiJS.
Requirements: [specific requirements from user story/spec].
```

### Backend Developer
```
As Backend Developer, implement [module/service/gateway] in NestJS.
Requirements: [specific requirements from user story/spec].
```

### QA Engineer
```
As QA Engineer, [create test plan/write tests/verify] [feature].
Test: [specific scenarios to cover].
```

### DevOps
```
As DevOps Engineer, [setup/configure/optimize] [build/deployment/environment]
for [specific need].
```

## Getting Started

Start any new session with:
```
Read docs/CURRENT_STATE.md and tell me what we're working on.
Then act as [ROLE] to continue the work.
```

This ensures you always know where you are and what's next.

---

**Remember**: The multi-agent approach keeps work organized, roles clear, and maintains continuity across context resets. Always document your work!
