# Definition of Done (DoD)

A work item is only "done" when ALL applicable criteria below are met.

---

## 🎯 Universal Criteria (All Work Items)

Every completed task must meet these:

- [ ] **Acceptance criteria met** - All checkboxes in the todo are checked
- [ ] **Implementation notes added** - Todo file has "Implementation Notes" section filled
- [ ] **Status updated** - Todo status changed to DONE
- [ ] **No known bugs** - Work functions correctly, no unresolved issues
- [ ] **Documentation updated** - Any relevant docs reflect the changes

---

## 💻 Code Work Items (Frontend/Backend Developers)

In addition to universal criteria:

### Code Quality
- [ ] **TypeScript strict mode** - No `any` types (except truly justified)
- [ ] **No console errors** - Clean browser/server console
- [ ] **No TypeScript errors** - `npm run build` succeeds
- [ ] **Linting passes** - `npm run lint` succeeds (when setup)
- [ ] **Follows established patterns** - Matches existing code style

### Error Handling
- [ ] **Errors handled gracefully** - Try/catch where appropriate
- [ ] **User-friendly error messages** - No raw stack traces to users
- [ ] **Edge cases considered** - What happens with invalid input?

### Testing
- [ ] **Tests written** - Unit tests for business logic
- [ ] **Tests pass** - `npm run test` succeeds
- [ ] **Manual testing done** - Actually tried it in browser/server

### Performance
- [ ] **Mobile performance considered** - Runs smoothly on mobile (frontend)
- [ ] **No obvious performance issues** - No memory leaks, excessive re-renders

### Documentation
- [ ] **Code comments** - Complex logic has explanatory comments
- [ ] **README updated** - If new scripts/setup steps added
- [ ] **Shared types updated** - If data models changed

---

## 🎨 UI Work Items (Frontend Developer)

In addition to code criteria:

### Visual Quality
- [ ] **Responsive design** - Works in portrait and landscape
- [ ] **Touch-friendly** - Tap targets ≥44px
- [ ] **Visual polish** - No glitches, smooth animations
- [ ] **Assets optimized** - Images compressed, sprites atlased

### Accessibility
- [ ] **Readable text** - Sufficient color contrast
- [ ] **Keyboard navigable** - Can use without mouse (where applicable)
- [ ] **Screen reader friendly** - ARIA labels where needed

### Performance
- [ ] **60fps target** - Smooth animations, no jank
- [ ] **Fast load time** - Assets load quickly
- [ ] **Bundle size** - No massive dependencies added

---

## 🏗️ Architecture/Design Work Items (Architect)

In addition to universal criteria:

### Design Quality
- [ ] **Clear and complete** - Developers can implement without guessing
- [ ] **Options considered** - Alternatives were evaluated
- [ ] **Rationale provided** - Why this approach over others
- [ ] **Consequences documented** - Trade-offs acknowledged

### Technical Rigor
- [ ] **Scalable** - Design works at scale
- [ ] **Maintainable** - Future developers can understand it
- [ ] **Testable** - Design enables good testing
- [ ] **Secure** - Security considerations addressed

### Documentation
- [ ] **Diagrams included** - Visual representation (when helpful)
- [ ] **API contracts defined** - If designing APIs
- [ ] **Data models specified** - If designing data structures
- [ ] **Saved to shared/** - In `docs/shared/technical-specs/`

---

## 📝 Documentation Work Items (PO, PM, Architect)

In addition to universal criteria:

### Content Quality
- [ ] **Clear and concise** - Easy to understand
- [ ] **Complete** - No missing information
- [ ] **Well-structured** - Logical organization
- [ ] **Examples provided** - Concrete examples (when helpful)

### Accuracy
- [ ] **Technically correct** - No errors or misleading info
- [ ] **Up-to-date** - Reflects current state
- [ ] **References linked** - Related docs are linked

### Discoverability
- [ ] **Saved in correct location** - Right folder in `docs/shared/`
- [ ] **Named clearly** - Filename is descriptive
- [ ] **Linked from relevant places** - Easy to find

---

## 🧪 Testing Work Items (QA Engineer)

In addition to universal criteria:

### Test Coverage
- [ ] **Test plan created** - In `docs/shared/test-plans/`
- [ ] **Happy path tested** - Normal usage works
- [ ] **Edge cases tested** - Boundary conditions work
- [ ] **Error cases tested** - Failures handled gracefully

### Test Quality
- [ ] **Automated tests written** - Unit/integration tests (where applicable)
- [ ] **Manual testing done** - Actually tested the feature
- [ ] **Multiple devices tested** - Desktop + mobile (for frontend)
- [ ] **All tests pass** - Green checkmarks

### Bug Reporting
- [ ] **Bugs documented** - Reproduction steps clear
- [ ] **Severity assessed** - Priority assigned
- [ ] **Todos created** - Bug fix todos for developers

---

## ⚙️ DevOps Work Items (DevOps Engineer)

In addition to universal criteria:

### Setup Quality
- [ ] **Works on clean machine** - No hidden dependencies
- [ ] **Documented** - Setup instructions complete
- [ ] **Tested** - Actually followed own instructions
- [ ] **Cross-platform** - Works on Windows/Mac/Linux (when possible)

### Build Quality
- [ ] **Builds successfully** - No build errors
- [ ] **Optimized** - Reasonable build times
- [ ] **Reproducible** - Same inputs = same outputs

### Deployment Quality
- [ ] **Deployment tested** - Actually deployed and verified
- [ ] **Rollback plan** - Can undo if needed
- [ ] **Monitoring setup** - Can see if it's working

---

## 🎯 Sprint/Planning Work Items (PM)

In addition to universal criteria:

### Planning Quality
- [ ] **Goals clear** - Sprint objectives defined
- [ ] **Tasks broken down** - Actionable work items
- [ ] **Dependencies identified** - What blocks what
- [ ] **Realistic scope** - Can actually be completed

### Communication
- [ ] **Stakeholders informed** - Relevant people know the plan
- [ ] **Risks identified** - Potential problems noted
- [ ] **Saved to shared/** - In `docs/shared/sprints/`

---

## ✅ Verification Process

### Developer Completes Work
1. Check all applicable DoD criteria
2. Update todo status to DONE
3. Add implementation notes
4. Create output in `docs/shared/` if applicable

### CEO Verifies Work
1. Review against acceptance criteria
2. Check DoD compliance
3. Test/validate as appropriate
4. If good: Mark todo VERIFIED, update CURRENT_STATE.md
5. If issues: Create follow-up todo with specific feedback

---

## 🚫 Common Reasons for Rejection

Work may be marked "not done" if:
- ❌ Acceptance criteria not fully met
- ❌ TypeScript errors present
- ❌ No tests for complex logic
- ❌ Mobile performance poor (frontend)
- ❌ Documentation missing or incomplete
- ❌ Obvious bugs present
- ❌ Code doesn't follow established patterns
- ❌ Security vulnerabilities introduced
- ❌ Implementation notes missing

---

## 💡 Tips for Meeting DoD

### Before Starting
- Read acceptance criteria carefully
- Understand what "done" means for this task
- Ask questions if unclear (create todo for clarification)

### During Work
- Check off DoD items as you go
- Don't leave testing/docs for the end
- Fix issues immediately, don't defer

### Before Marking Done
- Go through DoD checklist methodically
- Test one more time
- Read your own code/docs as if you're seeing it fresh
- If something feels off, fix it now

---

## 📊 DoD Compliance

### We Track
- % of tasks passing DoD on first review
- Common reasons for rejection
- Time spent on rework

### Goal
- ≥90% of tasks pass DoD on first review
- Continuous improvement in quality
- Less rework over time

---

**Remember**: "Done" means truly complete, not "mostly done" or "done except for testing". Take pride in meeting the full Definition of Done! ✨
