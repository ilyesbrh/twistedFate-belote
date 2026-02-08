# Work Item Template

Use this template when creating todos for any role.

## File Naming Convention
```
docs/roles/[ROLE]/todos/[YYYY-MM-DD]-[short-description].md
```

**Examples:**
- `docs/roles/FRONTEND_DEVELOPER/todos/2026-02-08-implement-bidding-ui.md`
- `docs/roles/QA_ENGINEER/todos/2026-02-08-test-card-play-rules.md`
- `docs/roles/TECHNICAL_ARCHITECT/todos/2026-02-08-design-game-state-sync.md`

## Template Content

```markdown
# [Task Title]

**Assigned To**: [Role Name]
**Created By**: [Your Role]
**Created Date**: [YYYY-MM-DD]
**Priority**: [Critical / High / Medium / Low]
**Status**: [TODO / IN_PROGRESS / BLOCKED / DONE / VERIFIED]
**Sprint**: [Sprint Number or N/A]
**Estimated Complexity**: [Simple / Medium / Complex]

## Context
[Why is this work needed? What problem does it solve?]

## Requirements
[What needs to be done? Be specific and actionable.]

## Reference Documents
[Link to related docs]
- User Story: docs/user-stories/[name].md
- Technical Spec: docs/technical-specs/[name].md
- Related Todo: docs/roles/[ROLE]/todos/[name].md

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
- [ ] Documentation updated
- [ ] Tests written (if applicable)

## Dependencies
[What must be completed before this can start?]
- [ ] Dependency 1
- [ ] Dependency 2

## Blockers
[List any current blockers]
- None / [Describe blocker]

## Notes
[Any additional context, suggestions, or considerations]

## Implementation Notes (filled by assignee)
[After completion, describe what was done]

## Verification Notes (filled by CEO/reviewer)
[After review, note verification results]

---

**Status Updates**:
- [YYYY-MM-DD HH:MM] - Status changed to TODO by [Role]
- [YYYY-MM-DD HH:MM] - Status changed to IN_PROGRESS by [Role]
- [YYYY-MM-DD HH:MM] - Status changed to DONE by [Role]
- [YYYY-MM-DD HH:MM] - Status changed to VERIFIED by CEO
```

## Status Definitions

- **TODO**: Work item created, not yet started
- **IN_PROGRESS**: Someone is actively working on it
- **BLOCKED**: Cannot proceed due to dependency or issue
- **DONE**: Work completed, awaiting verification
- **VERIFIED**: CEO or relevant authority has verified completion

## Priority Definitions

- **Critical**: Blocks everything, must be done immediately
- **High**: Important for current sprint, should be done soon
- **Medium**: Nice to have in current sprint
- **Low**: Can wait for future sprint

## Complexity Definitions

- **Simple**: Straightforward, clear path, <4 hours
- **Medium**: Some complexity, may need research, 4-8 hours
- **Complex**: Significant complexity, multiple parts, >8 hours

## Best Practices

1. **Be Specific**: Vague requirements lead to rework
2. **Link References**: Connect to related documentation
3. **Clear Acceptance Criteria**: Everyone should know when it's done
4. **Track Dependencies**: Make dependencies explicit
5. **Update Status**: Keep status current
6. **Document Learnings**: Add implementation notes when done
7. **Close the Loop**: CEO verifies and marks VERIFIED

## Example: Good Work Item

```markdown
# Implement Bidding UI Panel

**Assigned To**: Frontend Developer
**Created By**: CEO
**Created Date**: 2026-02-08
**Priority**: High
**Status**: TODO
**Sprint**: Sprint 2
**Estimated Complexity**: Medium

## Context
Players need a UI to place bids during the bidding phase. This is core gameplay functionality required for MVP.

## Requirements
Create a PixiJS component that displays bidding options and handles player input during bidding phase.

## Reference Documents
- User Story: docs/user-stories/bidding-system.md
- Technical Spec: docs/technical-specs/bidding-ui-spec.md
- API Events: docs/technical-specs/socket-events.md

## Acceptance Criteria
- [ ] Display valid bid amounts (80, 90, 100...160, Capot)
- [ ] Display trump suit options (♠ ♥ ♦ ♣, Sans, Tout)
- [ ] Show Pass, Coinche, Surcoinche buttons when valid
- [ ] Emit correct Socket.io events on action
- [ ] Disable invalid actions (can't bid lower than current)
- [ ] Touch-friendly buttons (min 44px tap target)
- [ ] Animate in/out smoothly
- [ ] Show current bid state clearly

## Dependencies
- [x] Bidding logic defined in shared package
- [x] Socket.io events spec completed
- [ ] GameScene setup complete

## Blockers
None

## Notes
- Refer to Figma mockups (if any)
- Must work in portrait and landscape
- Consider accessibility (color contrast, size)

## Implementation Notes
[To be filled by Frontend Developer when complete]

## Verification Notes
[To be filled by CEO after review]

---

**Status Updates**:
- 2026-02-08 10:00 - Status changed to TODO by CEO
```
