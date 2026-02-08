# Decision Template

Use this template to document major project decisions.

## File Naming
```
docs/decisions/YYYY-MM-DD-[decision-topic].md
```

**Examples:**
- `2026-02-08-use-pixijs-for-rendering.md`
- `2026-02-10-zustand-for-state-management.md`
- `2026-02-15-monorepo-with-npm-workspaces.md`

---

## Template

```markdown
# Decision: [Title]

**Date**: YYYY-MM-DD
**Deciders**: [Roles involved]
**Status**: Proposed / Accepted / Rejected / Superseded

## Context
[What situation led to this decision? What problem are we solving?]

## Decision
[What did we decide to do?]

## Options Considered

### Option 1: [Name]
**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

### Option 2: [Name]
**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

### Option 3: [Name] ← **Chosen**
**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

## Rationale
[Why did we choose this option? What made it better than alternatives?]

## Consequences

### Positive
- Benefit 1
- Benefit 2

### Negative
- Drawback 1
- Drawback 2

### Neutral
- Implication 1
- Implication 2

## Reversibility
**Can this decision be reversed?**: Yes / No / Partially

**If yes, how easily?**: [Describe effort to reverse]

## Implementation Notes
[What needs to be done to implement this decision?]

## Follow-up Actions
- [ ] Action 1
- [ ] Action 2

## References
- Link to related docs
- Link to research
- External resources

---

**Status Updates**:
- YYYY-MM-DD: Decision proposed by [Role]
- YYYY-MM-DD: Decision accepted by CEO
```

---

## Example Decision

```markdown
# Decision: Use PixiJS for Frontend Rendering

**Date**: 2026-02-08
**Deciders**: CEO, Technical Architect, Frontend Developer
**Status**: Accepted

## Context
We need a high-performance 2D rendering engine for the Belote card game. Must achieve 60fps on mid-range mobile devices with smooth animations for card movements, dealing, and effects.

## Decision
Use PixiJS v7+ as the frontend rendering engine.

## Options Considered

### Option 1: Plain Canvas API
**Pros:**
- No dependencies
- Full control
- Lightweight

**Cons:**
- Manual sprite management
- No optimization out of box
- More boilerplate code
- Slower development

### Option 2: Three.js
**Pros:**
- Powerful 3D capabilities
- Large ecosystem
- WebGL-based

**Cons:**
- Overkill for 2D game
- Larger bundle size
- Steeper learning curve
- Don't need 3D

### Option 3: PixiJS ← **Chosen**
**Pros:**
- Built for 2D rendering
- WebGL-accelerated
- Excellent performance
- Rich sprite/animation features
- Texture atlas support
- Good documentation
- Mobile-optimized

**Cons:**
- External dependency (123KB gzipped)
- Learning curve (moderate)

## Rationale
PixiJS is purpose-built for 2D games and animations. It provides WebGL acceleration, which is essential for 60fps on mobile. The built-in sprite management, animation systems, and texture atlasing save significant development time compared to raw Canvas API, while keeping bundle size reasonable (~123KB gzipped).

Three.js is overkill for a 2D card game and would increase bundle size unnecessarily.

## Consequences

### Positive
- Fast development of card animations
- Guaranteed 60fps performance on mobile (when used correctly)
- Rich features (filters, blend modes, etc.) available if needed
- Large community for support

### Negative
- 123KB added to bundle size
- Team needs to learn PixiJS patterns
- Another dependency to maintain

### Neutral
- WebGL requirement (98%+ browser support, fine for PWA)

## Reversibility
**Can this decision be reversed?**: Yes, but with significant effort

**If yes, how easily?**:
Reversing would require rewriting all rendering code. Estimate: 2-3 weeks of work. Should only reverse if we discover critical PixiJS issues early in development.

## Implementation Notes
- Install `pixi.js` package
- Create PixiJS Application in main.ts
- Structure code with Scenes pattern
- Use sprite pools for cards
- Implement texture atlases for optimal performance

## Follow-up Actions
- [x] Add PixiJS to package.json
- [ ] Create PixiJS application scaffold
- [ ] Document PixiJS patterns for team
- [ ] Set up texture atlas generation

## References
- PixiJS docs: https://pixijs.com/
- Performance guide: https://pixijs.io/guides/basics/performance.html
- PWA bundle size budget: <2MB total

---

**Status Updates**:
- 2026-02-08: Decision proposed by Technical Architect
- 2026-02-08: Decision accepted by CEO
```
