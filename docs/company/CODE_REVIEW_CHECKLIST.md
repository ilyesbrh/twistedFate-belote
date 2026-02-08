# Code Review Checklist

Use this checklist when reviewing code (CEO reviewing completed work, or peer reviews).

---

## 🎯 Quick Pass (< 5 minutes)

Start here for all reviews:

- [ ] **Acceptance criteria met?** - Does it do what the todo asked?
- [ ] **Builds successfully?** - No TypeScript/compile errors
- [ ] **No console errors?** - Clean console output
- [ ] **Obviously broken?** - Any glaring bugs visible?

**If any fails**: Return immediately with feedback, don't continue review.

**If all pass**: Continue to detailed review below.

---

## 💻 Code Quality Review

### TypeScript & Types
- [ ] **No `any` types** - Except when truly necessary (document why)
- [ ] **Proper type definitions** - Types are accurate, not overly broad
- [ ] **Shared types used** - Uses types from `@twistedfate/shared`
- [ ] **Type safety** - No type assertions without good reason

### Code Structure
- [ ] **Single responsibility** - Each function does one thing
- [ ] **DRY principle** - No unnecessary repetition
- [ ] **Clear naming** - Variables/functions have descriptive names
- [ ] **Reasonable length** - Functions < 50 lines, files < 300 lines
- [ ] **Proper abstraction** - Not over-engineered, not under-engineered

### Readability
- [ ] **Easy to understand** - Can follow logic without struggle
- [ ] **Comments where needed** - Complex logic explained
- [ ] **No dead code** - No commented-out code or unused variables
- [ ] **Consistent style** - Matches existing codebase patterns

---

## 🐛 Error Handling Review

### Defensive Programming
- [ ] **Input validation** - External data is validated
- [ ] **Null checks** - Handles undefined/null appropriately
- [ ] **Try/catch** - Async operations have error handling
- [ ] **Error messages** - Clear, actionable, user-friendly

### Edge Cases
- [ ] **Empty states** - What happens with empty arrays/objects?
- [ ] **Boundary conditions** - Max/min values handled?
- [ ] **Race conditions** - Async operations don't conflict?
- [ ] **Network failures** - Socket.io disconnects handled?

---

## 🚀 Performance Review

### Frontend Performance
- [ ] **No unnecessary re-renders** - React/PixiJS optimized
- [ ] **Efficient loops** - No nested loops over large arrays
- [ ] **Asset optimization** - Images compressed, sprites atlased
- [ ] **Bundle impact** - New dependencies justified
- [ ] **Mobile performance** - Runs at 60fps on mobile

### Backend Performance
- [ ] **Efficient algorithms** - No O(n²) where O(n) possible
- [ ] **No memory leaks** - Event listeners cleaned up
- [ ] **Database queries** - Indexed, efficient (when we have DB)
- [ ] **Async operations** - Non-blocking where possible

---

## 🔒 Security Review

### Input Security
- [ ] **No injection risks** - SQL, XSS, command injection prevented
- [ ] **Data sanitization** - User input sanitized before use
- [ ] **Rate limiting considered** - No DoS vulnerabilities

### Data Security
- [ ] **No secrets in code** - No API keys, passwords hardcoded
- [ ] **Sensitive data protected** - PII handled appropriately
- [ ] **Proper validation** - Server validates, not just client

### Authentication & Authorization
- [ ] **Auth checks present** - Protected routes are protected (future)
- [ ] **Session management** - Tokens handled securely (future)

---

## 🧪 Testing Review

### Test Coverage
- [ ] **Tests exist** - Unit tests for business logic
- [ ] **Tests pass** - All green checkmarks
- [ ] **Tests are meaningful** - Actually test behavior, not just coverage
- [ ] **Edge cases tested** - Not just happy path

### Test Quality
- [ ] **Tests are clear** - Easy to understand what's being tested
- [ ] **Tests are isolated** - No test interdependencies
- [ ] **Tests are fast** - No unnecessary delays
- [ ] **Mocks used properly** - External deps mocked appropriately

---

## 🎨 Frontend-Specific Review

### UI/UX Quality
- [ ] **Responsive** - Works in portrait and landscape
- [ ] **Touch-friendly** - Tap targets ≥44px, no hover-only
- [ ] **Visual polish** - No glitches, animations smooth
- [ ] **Loading states** - User sees feedback during operations
- [ ] **Error states** - User knows when something fails

### Accessibility
- [ ] **Color contrast** - Text readable (WCAG guidelines)
- [ ] **Keyboard navigation** - Works without mouse (where applicable)
- [ ] **Screen reader** - ARIA labels where needed
- [ ] **Focus indicators** - Clear visual focus

### PixiJS-Specific
- [ ] **Object pooling** - Reuses sprites where appropriate
- [ ] **Texture atlases** - Sprites combined for efficiency
- [ ] **Cleanup** - Destroys PixiJS objects when done
- [ ] **RAF management** - Requestanimationframe used correctly

---

## 🏗️ Backend-Specific Review

### API Design
- [ ] **RESTful** - Follows REST conventions (or documented reason not to)
- [ ] **Consistent** - Matches existing API patterns
- [ ] **Versioned** - Can evolve without breaking clients (future)
- [ ] **Documented** - API contract in `docs/shared/technical-specs/`

### Socket.io-Specific
- [ ] **Event naming** - Clear, consistent event names
- [ ] **Payload validation** - Server validates event payloads
- [ ] **Error events** - Errors emitted back to client
- [ ] **Room management** - Joins/leaves handled properly
- [ ] **Disconnect handling** - Cleanup on disconnect

### NestJS-Specific
- [ ] **Dependency injection** - Uses DI properly
- [ ] **Module organization** - Code in appropriate modules
- [ ] **DTOs used** - Data validated with class-validator
- [ ] **Services/controllers** - Separation of concerns

---

## 📚 Documentation Review

### Code Documentation
- [ ] **Complex logic commented** - Why, not just what
- [ ] **Public APIs documented** - JSDoc for exported functions
- [ ] **TODOs addressed** - No leftover TODO comments (or tracked)

### External Documentation
- [ ] **README updated** - If setup changed
- [ ] **Shared docs updated** - If architecture changed
- [ ] **Breaking changes noted** - If API changed

---

## 🔄 Architecture Review

### Design Alignment
- [ ] **Follows architecture** - Matches technical specs
- [ ] **Uses shared package** - Game logic in `@twistedfate/shared`
- [ ] **No duplication** - Logic not repeated across client/server
- [ ] **Scalable** - Design works at scale

### Maintainability
- [ ] **Easy to change** - Future modifications won't be painful
- [ ] **Testable** - Design enables good testing
- [ ] **Debuggable** - Can diagnose issues easily
- [ ] **Documented** - Future developers can understand

---

## ✅ Approval Criteria

### Approve (Status → VERIFIED) When:
- ✅ All applicable checklist items pass
- ✅ Acceptance criteria fully met
- ✅ No critical issues found
- ✅ Code quality is high
- ✅ Follows Definition of Done

### Request Changes When:
- ⚠️ Critical bugs found
- ⚠️ Security vulnerabilities present
- ⚠️ Performance issues significant
- ⚠️ Doesn't meet acceptance criteria
- ⚠️ Code quality below standards

### Create Follow-up Todo When:
- 💡 Nice-to-have improvements identified
- 💡 Technical debt noted
- 💡 Future optimization opportunities
- 💡 Minor issues that don't block acceptance

---

## 📝 Review Comments Template

When requesting changes, use this format:

```markdown
## Review Feedback: [Todo Name]

**Status**: Changes Requested

### Critical Issues (Must Fix)
1. [Issue] - [Why it's critical] - [Suggested fix]
2. ...

### Important Issues (Should Fix)
1. [Issue] - [Why it matters] - [Suggested approach]
2. ...

### Suggestions (Nice to Have)
1. [Improvement idea] - [Benefit]
2. ...

### Positive Notes
- [Something done well]
- [Another good thing]

**Next Steps**: [What the developer should do]
```

---

## 🎯 Review Best Practices

### As Reviewer (CEO)
- ✅ Be thorough but fair
- ✅ Explain why, not just what
- ✅ Recognize good work
- ✅ Suggest improvements, don't just criticize
- ✅ Distinguish critical vs. nice-to-have
- ✅ Review promptly (don't block progress)

### As Reviewee (Developer)
- ✅ Self-review before marking DONE
- ✅ Run through checklist yourself
- ✅ Test thoroughly before submitting
- ✅ Don't take feedback personally
- ✅ Ask questions if feedback unclear
- ✅ Thank reviewer for catching issues

---

## 📊 Review Metrics

### Track These
- Time to complete reviews
- % of reviews requiring changes
- Common issues found
- Code quality trends

### Goals
- Reviews completed within 24 hours
- <30% require changes (shows good DoD compliance)
- Fewer issues over time (learning from feedback)

---

## 🚀 Quick Reference

### For Quick Reviews (< 100 lines changed)
Focus on:
1. Acceptance criteria met?
2. TypeScript errors?
3. Obvious bugs?
4. Tests exist and pass?
5. Follows patterns?

### For Larger Reviews (> 100 lines)
Allocate more time, review:
1. Architecture alignment
2. Performance implications
3. Security considerations
4. Testing coverage
5. Documentation updates

### For Critical Features (Multiplayer, Payment, etc.)
Extra scrutiny on:
1. Edge cases handled
2. Error scenarios covered
3. Security rigorously reviewed
4. Performance validated
5. Extensive testing done

---

**Remember**: Code review is about maintaining quality and sharing knowledge, not finding fault. We're all on the same team! 🤝
