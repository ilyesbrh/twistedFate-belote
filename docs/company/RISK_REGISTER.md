# Risk Register

**Last Updated**: 2026-02-08
**Owner**: CEO

## Active Risks

### Risk #1: Real-time Multiplayer Complexity
- **Probability**: Medium
- **Impact**: High
- **Description**: Socket.io real-time synchronization with 4 players is complex. State sync issues, race conditions, disconnections could cause bugs.
- **Mitigation**:
  - Design robust state synchronization protocol early (Architect)
  - Implement thorough error handling
  - Test with 4 concurrent connections frequently
  - Build reconnection logic from start
- **Owner**: Technical Architect
- **Status**: Identified
- **Next Review**: Sprint 1 start

### Risk #2: Mobile Performance
- **Probability**: Medium
- **Impact**: High
- **Description**: PixiJS needs to run at 60fps on mid-range mobile devices. Complex animations or inefficient rendering could cause lag.
- **Mitigation**:
  - Profile early and often on mobile devices
  - Use PixiJS best practices (sprite pooling, texture atlases)
  - Set performance budget (60fps target)
  - Test on real devices, not just desktop
- **Owner**: Frontend Developer
- **Status**: Identified
- **Next Review**: Sprint 1 end

### Risk #3: Game Rules Complexity
- **Probability**: Low
- **Impact**: Medium
- **Description**: Belote rules (especially card play validation) are complex. Incorrect implementation would break gameplay.
- **Mitigation**:
  - Document all rules clearly before implementation
  - Implement shared rules package used by both client/server
  - Write comprehensive unit tests for rule logic
  - Manual testing by Belote players
- **Owner**: Backend Developer + QA Engineer
- **Status**: Identified
- **Next Review**: Sprint 3 start

### Risk #4: Context Resets
- **Probability**: Medium
- **Impact**: Medium
- **Description**: Claude's context may reset, losing progress if not properly documented.
- **Mitigation**:
  - ✅ Implemented file-based state management
  - ✅ All work tracked in files
  - ✅ Clear CURRENT_STATE.md always updated
  - Regular updates to state files
- **Owner**: CEO
- **Status**: Mitigated
- **Next Review**: Ongoing

---

## Resolved Risks

None yet.

---

## Risk Matrix

```
Impact →        Low         Medium      High
           ┌───────────┬───────────┬───────────┐
Probability│           │           │           │
     High  │           │           │           │
           ├───────────┼───────────┼───────────┤
    Medium │           │  Rules    │  Sync     │
           │           │  Context  │  Mobile   │
           ├───────────┼───────────┼───────────┤
      Low  │           │           │           │
           │           │           │           │
           └───────────┴───────────┴───────────┘
```

---

## How to Use This Register

### Adding a New Risk
```markdown
### Risk #X: [Short Title]
- **Probability**: High / Medium / Low
- **Impact**: High / Medium / Low
- **Description**: What could go wrong?
- **Mitigation**: How we prevent/handle it
- **Owner**: Who's responsible
- **Status**: Identified / Monitoring / Mitigating / Resolved
- **Next Review**: When to reassess
```

### Updating Risk Status
- **Identified**: Just discovered
- **Monitoring**: Watching it, no action yet
- **Mitigating**: Actively working to reduce probability/impact
- **Resolved**: No longer a concern

### Review Cadence
- **CEO reviews**: Every sprint start
- **All roles**: Raise new risks as they spot them
- **Move to resolved**: When risk no longer applies

---

## Risk Response Strategies

### Avoid
Change plans to eliminate the risk entirely

### Mitigate
Reduce probability or impact

### Transfer
Let someone/something else handle it (e.g., use library)

### Accept
Acknowledge risk, plan response if it occurs

---

**Remember**: Identifying risks early gives us time to handle them proactively!
