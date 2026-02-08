# Daily Standup Template

Track daily progress asynchronously through standup files.

---

## 📋 How It Works

Each session (or day), create a standup file:
```
docs/standups/YYYY-MM-DD-standup.md
```

Each role updates their section with:
- What I completed since last standup
- What I'm working on today
- What's blocking me (if anything)

---

## 📝 Standup File Template

```markdown
# Daily Standup - [Day of Week], [Month DD, YYYY]

**Sprint**: Sprint X
**Day in Sprint**: Day X

---

## 🎯 Sprint Goal Reminder
[Copy sprint goal here for context]

---

## 👔 CEO

### ✅ Completed
- Task 1
- Task 2

### 🔄 Working On
- Task 1
- Task 2

### 🚫 Blockers
- None / [Blocker description]

### 📝 Notes
- [Any observations, concerns, or updates]

---

## 📦 Product Owner

### ✅ Completed
- [What I finished]

### 🔄 Working On
- [What I'm doing today]

### 🚫 Blockers
- None / [Blocker]

### 📝 Notes
- [Optional notes]

---

## 📊 Product Manager

### ✅ Completed
- [What I finished]

### 🔄 Working On
- [What I'm doing today]

### 🚫 Blockers
- None / [Blocker]

### 📝 Notes
- [Optional notes]

---

## 🏗️ Technical Architect

### ✅ Completed
- [What I finished]

### 🔄 Working On
- [What I'm doing today]

### 🚫 Blockers
- None / [Blocker]

### 📝 Notes
- [Optional notes]

---

## 💻 Frontend Developer

### ✅ Completed
- [What I finished]

### 🔄 Working On
- [What I'm doing today]

### 🚫 Blockers
- None / [Blocker]

### 📝 Notes
- [Optional notes]

---

## 🖥️ Backend Developer

### ✅ Completed
- [What I finished]

### 🔄 Working On
- [What I'm doing today]

### 🚫 Blockers
- None / [Blocker]

### 📝 Notes
- [Optional notes]

---

## 🧪 QA Engineer

### ✅ Completed
- [What I finished]

### 🔄 Working On
- [What I'm doing today]

### 🚫 Blockers
- None / [Blocker]

### 📝 Notes
- [Optional notes]

---

## ⚙️ DevOps Engineer

### ✅ Completed
- [What I finished]

### 🔄 Working On
- [What I'm doing today]

### 🚫 Blockers
- None / [Blocker]

### 📝 Notes
- [Optional notes]

---

## 📊 Team Summary (CEO)

### Overall Progress
- [Sprint progress update]
- [Velocity observation]

### Blockers Identified
- [List any blockers from above]
- [Actions to resolve]

### Risks/Concerns
- [Any new risks spotted]
- [Things to watch]

### Celebrations 🎉
- [Wins to recognize]
- [Good work to call out]

---

**Next Standup**: [Tomorrow's date]
```

---

## 🎯 Usage Guidelines

### When to Create
- **Daily**: If actively working daily
- **Per Session**: If working in sessions (context resets)
- **As Needed**: At minimum once per sprint

### Who Updates
- **All Roles**: Each role updates their section
- **CEO**: Summarizes and identifies actions

### How to Update
1. Copy template to new file: `docs/standups/YYYY-MM-DD-standup.md`
2. Each role fills their section (3-5 minutes)
3. CEO reviews and summarizes
4. Blockers addressed immediately

---

## 💡 Best Practices

### Good Standup Updates

✅ **Specific**
```
✅ Completed: Implemented bidding UI component (todos/#123)
✅ Working On: Integrating Socket.io events for bidding
✅ Blocked: Waiting for API spec from Architect (todos/#125)
```

❌ **Vague**
```
❌ Completed: Some UI work
❌ Working On: More of the same
❌ Blocked: Stuff
```

### Keep It Brief
- Each role: 2-3 bullets max per section
- Focus on outcomes, not activities
- Link to todos for details

### Be Honest About Blockers
- Don't hide blockers
- They're not a sign of weakness
- Early visibility enables quick resolution

### Celebrate Wins
- Call out good work
- Note milestones reached
- Build team morale

---

## 🚨 Blocker Management

### When a Blocker is Identified

**CEO Action Plan**:
1. Identify blocker in standup
2. Determine root cause
3. Create todo to resolve (or resolve directly)
4. Follow up in next standup

**Blocker Categories**:
- **Dependency**: Waiting on another role → Prioritize that work
- **Technical**: Stuck on technical issue → Create research todo
- **Clarity**: Unclear requirements → PO/Architect clarifies
- **External**: Outside our control → Document and plan around

---

## 📊 Benefits of Async Standups

### Advantages Over Sync Meetings
- ✅ No scheduling needed
- ✅ Everyone updates when convenient
- ✅ Written record for future reference
- ✅ Context-reset proof
- ✅ Easy to see patterns over time

### What We Gain
- **Visibility**: Everyone sees what everyone is doing
- **Alignment**: Stay focused on sprint goals
- **Early Warning**: Spot issues early
- **Documentation**: Historical record of progress

---

## 📁 Organization

### File Location
```
docs/standups/
├── 2026-02-08-standup.md
├── 2026-02-09-standup.md
├── 2026-02-10-standup.md
└── ...
```

### File Naming
- **Format**: `YYYY-MM-DD-standup.md`
- **Example**: `2026-02-08-standup.md`
- **Sort Order**: Chronological by date

---

## 🔄 Weekly Review (CEO)

At end of week/sprint, CEO reviews all standups:

### What to Look For
- **Velocity**: Are we completing work at expected pace?
- **Blockers**: Any recurring blockers?
- **Patterns**: Any roles consistently blocked?
- **Morale**: Team energy/engagement

### Actions
- Adjust priorities if needed
- Address systemic blockers
- Recognize consistent performers
- Plan improvements for next sprint

---

## 📝 Example Standup

```markdown
# Daily Standup - Saturday, February 08, 2026

**Sprint**: Sprint 0 - Project Foundation
**Day in Sprint**: Day 1

---

## 🎯 Sprint Goal Reminder
Set up monorepo, basic scaffolding, and dev environment

---

## 👔 CEO

### ✅ Completed
- Designed multi-agent company system with role isolation
- Created all company documentation
- Created 3 todos for DevOps Engineer

### 🔄 Working On
- Monitoring Sprint 0 progress
- Creating system improvements (DoD, code review checklist)

### 🚫 Blockers
- None

### 📝 Notes
- System is operational and ready for execution
- Waiting on package setup before proceeding

---

## ⚙️ DevOps Engineer

### ✅ Completed
- None yet (just received todos)

### 🔄 Working On
- Will start on client package setup

### 🚫 Blockers
- None

### 📝 Notes
- Clear acceptance criteria in todos
- Ready to execute

---

## 📊 Team Summary (CEO)

### Overall Progress
- Sprint 0 at 10% (1/10 tasks complete)
- System infrastructure complete
- Execution phase beginning

### Blockers Identified
- None currently

### Risks/Concerns
- None, system healthy

### Celebrations 🎉
- Complete multi-agent system designed and operational!

---

**Next Standup**: 2026-02-09
```

---

**Remember**: Standups are for coordination, not status reports. Keep them brief and actionable! 🚀
