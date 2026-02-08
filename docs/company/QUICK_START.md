# Quick Start Guide

## For New Sessions (Context Reset Recovery)

If you're starting fresh or context was reset:

```
Read docs/CURRENT_STATE.md and docs/todos/SPRINT_X_TODOS.md
to understand where we are. Then continue with the next task.
```

## Multi-Agent Commands

### Check Current Status
```
What's the current state of the project?
```
→ I'll read CURRENT_STATE.md and sprint todos

### Continue Sprint Work
```
Continue with Sprint 0. Act as [DevOps Engineer] for the next task.
```
→ I'll pick up the next incomplete task as that role

### Start New Feature
```
As Product Owner, create user stories for [feature name].
```
→ Creates user stories in docs/user-stories/

### Plan Next Sprint
```
As Product Manager, plan Sprint 1 based on the manifesto.
```
→ Creates sprint plan in docs/sprints/

## Common Workflows

### 1. Beginning a Sprint
```bash
# Step 1: Plan
As PM, create a plan for Sprint X.

# Step 2: Define Features
As PO, write user stories for Sprint X features.

# Step 3: Design
As Technical Architect, design the architecture for Sprint X.

# Step 4: Implement
As Frontend Developer, implement [feature].
As Backend Developer, implement [feature].

# Step 5: Test
As QA Engineer, test Sprint X features.

# Step 6: Review
As PM, conduct Sprint X retrospective.
```

### 2. Implementing a Feature
```bash
# Get requirements
As PO, define acceptance criteria for [feature].

# Design it
As Technical Architect, design [feature] architecture.

# Build it
As [Frontend/Backend] Developer, implement [feature] per spec.

# Test it
As QA Engineer, test [feature] and verify acceptance criteria.
```

### 3. Fixing a Bug
```bash
# Investigate
As QA Engineer, investigate and document the bug with [description].

# Fix
As [Frontend/Backend] Developer, fix the bug documented in [bug-report].

# Verify
As QA Engineer, verify the bug fix.
```

## File Locations

- **Project Overview**: `docs/PROJECT_CONTEXT.md`
- **Current Status**: `docs/CURRENT_STATE.md`
- **Sprint Todos**: `docs/todos/SPRINT_X_TODOS.md`
- **Role Definitions**: `docs/roles/*.md`
- **Workflow Guide**: `docs/MULTI_AGENT_WORKFLOW.md`

## Update State After Work

Always update these files after completing tasks:
```bash
# 1. Mark task complete in sprint todos
Edit docs/todos/SPRINT_X_TODOS.md - change status to COMPLETED

# 2. Update current state
Edit docs/CURRENT_STATE.md - update progress summary

# 3. Commit if using git
git add docs/ && git commit -m "Update project state"
```

## Sprint 0 - Quick Reference

**Goal**: Set up project foundation

**Status**: Check `docs/todos/SPRINT_0_TODOS.md`

**Next Tasks**:
1. Set up client package (Vite + PixiJS)
2. Set up server package (NestJS)
3. Set up shared package
4. Configure tooling
5. Create scaffolds
6. Test connection

## Need Help?

- **Understand roles**: Read `docs/roles/[ROLE_NAME].md`
- **See workflow**: Read `docs/MULTI_AGENT_WORKFLOW.md`
- **Check progress**: Read `docs/CURRENT_STATE.md`
- **View plan**: Read `~/.claude/plans/tidy-enchanting-breeze.md`

## Pro Tips

1. **Always start by checking current state** - Don't guess where you left off
2. **Use specific role prompts** - Clear roles = better results
3. **Update state files frequently** - Don't lose progress
4. **Reference existing docs** - Build on previous work
5. **One role at a time** - Don't mix responsibilities

---

Now you're ready to work with the multi-agent system! 🚀
