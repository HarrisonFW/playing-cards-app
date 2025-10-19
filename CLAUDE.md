# CLAUDE.md - Project Assistant Guidelines

## Purpose
This document guides Claude in assisting with the Digital Playing Cards Application project. Following these guidelines ensures consistency, quality, and efficient progress across multiple work sessions.

---

## 🚨 CRITICAL: Start of Every Session Protocol

### ALWAYS Do These First (In Order):

1. **Read PLANNING.md**
   - Location: `./PLANNING.md`
   - Contains: Project architecture, technical decisions, design patterns, and implementation strategy
   - Purpose: Understand the current project structure and approach before making any changes
   - Action: Use the `view` tool to read this file at the start of EVERY new conversation

2. **Check TASKS.md**
   - Location: `./TASKS.md`
   - Contains: Current task list with priorities and status
   - Purpose: Know what needs to be done and what's already completed
   - Action: Review all tasks before starting work

3. **Verify Project Context**
   - Check which files exist in the project
   - Understand what phase of development we're in
   - Identify any blockers or dependencies

---

## 📋 Task Management Rules

### Before Starting Work:
- [ ] Read PLANNING.md completely
- [ ] Review TASKS.md for current priorities
- [ ] Confirm which task you're working on
- [ ] Check for any dependencies or prerequisites

### During Work:
- **Mark tasks as completed IMMEDIATELY** when finished
- Update task status in TASKS.md using the format:
  ```markdown
  - 🟢 Task description (Completed: YYYY-MM-DD)
  ```
- If you discover subtasks, add them under the parent task with proper indentation
- Document any important decisions or changes in PLANNING.md

### Adding New Tasks:
When you discover or are asked to add new tasks:

1. **Assess Priority**: Determine if it's High, Medium, or Low priority
2. **Check Dependencies**: Identify if it blocks or depends on other tasks
3. **Add to TASKS.md** in the appropriate section:
   ```markdown
   - 🔴 New task description [Priority Level]
     - Related to: [reference other tasks if applicable]
     - Estimated effort: [Small/Medium/Large]
   ```
4. **Inform the User**: Let them know the task has been added and where

### Task Status Indicators:
- 🔴 - Not started
- 🟡 - In progress (use when task is partially complete)
- 🟢 - Completed (always add completion date in parentheses)
- ⚫ - Blocked (add reason in parentheses)
- ⚪ - Needs clarification (add what's unclear)

---

## 📁 Project File Structure

### Core Documentation Files:
```
project-root/
├── CLAUDE.md           # This file - guidelines for Claude
├── PLANNING.md         # Architecture, decisions, technical approach
├── TASKS.md           # Task tracker with priorities
├── Playing_Cards_PRD.md  # Project Requirements Document
└── README.md          # Project overview and setup instructions
```

### Source Code Structure (typical):
```
src/
├── components/        # React components
├── game-logic/       # Game rules and card mechanics
├── utils/            # Helper functions
├── styles/           # CSS/styling files
└── assets/           # Images, card designs, etc.
```

---

## 🎯 Project-Specific Guidelines

### Understanding the Project:
This is a **Digital Playing Cards Application** with:
- **Primary Goal**: Flexible card manipulation interface for any card game
- **Built-in Games**: Snap and Blackjack (2-player)
- **Core Feature**: Drag-and-drop card interaction
- **Technical Approach**: Web-based, responsive, local multiplayer

### Key Technical Decisions (refer to PLANNING.md for details):
- Technology stack (React/Vue, Canvas/SVG, etc.)
- Card rendering approach
- State management strategy
- Animation library choices
- Game rule implementation patterns

### Code Quality Standards:
- **Readability**: Write clear, self-documenting code
- **Modularity**: Keep components small and focused
- **Reusability**: Create shared utilities for common operations
- **Testing**: Write testable code with clear separation of concerns
- **Performance**: Optimize card rendering and drag operations
- **Comments**: Explain WHY, not WHAT (code should be self-explanatory)

---

## 🔧 Development Workflow

### When Starting a New Feature:
1. Read PLANNING.md to understand the architecture
2. Check TASKS.md for the specific requirements
3. Review relevant sections in Playing_Cards_PRD.md
4. Plan your approach (update PLANNING.md if making architectural decisions)
5. Implement the feature
6. Test basic functionality
7. Mark task as complete in TASKS.md
8. Document any new patterns or decisions in PLANNING.md

### When Fixing Bugs:
1. Understand the expected behavior (check PRD)
2. Identify the root cause
3. Consider if the fix requires updating documentation
4. Implement the fix
5. Update TASKS.md if the bug revealed new tasks
6. Document any gotchas in PLANNING.md

### When Refactoring:
1. Explain why refactoring is needed
2. Check if it affects documented architecture in PLANNING.md
3. Ensure all tests still pass (or update them)
4. Update PLANNING.md if architectural patterns change
5. Update affected tasks in TASKS.md

---

## 📝 Documentation Maintenance

### PLANNING.md Updates:
Update when you:
- Make architectural decisions
- Establish new patterns or conventions
- Discover important technical constraints
- Choose between implementation alternatives
- Create reusable utilities or components

### TASKS.md Updates:
Update when you:
- Complete any task (mark with [x] and date)
- Start a task (mark with [→])
- Discover new tasks
- Find blockers (mark with [!])
- Need clarification (mark with [?])
- Break down large tasks into subtasks

### When to Create New Documentation:
- API documentation (if building APIs)
- Component documentation (for complex components)
- Deployment guide (when deployment is configured)
- Testing guide (when test suite is established)

---

## 🎮 Game-Specific Considerations

### Card System:
- Maintain immutability in card state
- Use consistent card identification (rank + suit)
- Handle face-up/face-down state carefully
- Ensure proper card ownership tracking

### Drag-and-Drop:
- Support both mouse and touch events
- Provide clear visual feedback
- Implement proper drop zone detection
- Handle edge cases (dragging out of bounds, etc.)

### Game Rules:
- Keep rule logic separate from UI components
- Make rules easily testable
- Document rule edge cases
- Ensure deterministic behavior

### Performance:
- Optimize card rendering (consider virtualization)
- Use requestAnimationFrame for animations
- Minimize re-renders during drag operations
- Profile and optimize hot paths

---

## 🤝 Communication Guidelines

### When Presenting Solutions:
- Explain your reasoning
- Reference relevant PRD requirements
- Mention any tradeoffs or alternatives considered
- Be clear about what's implemented vs. what's not

### When Asking for Clarification:
- Refer to specific PRD requirements
- Explain what's ambiguous
- Suggest possible interpretations
- Wait for confirmation before proceeding

### When Suggesting Changes:
- Explain the problem being solved
- Describe the proposed solution
- Mention impact on existing features
- Get approval for significant changes

---

## ⚠️ Important Reminders

### DO:
- ✅ Read PLANNING.md at the start of EVERY new conversation
- ✅ Check TASKS.md before starting work
- ✅ Mark completed tasks immediately with date
- ✅ Add discovered tasks to TASKS.md
- ✅ Update documentation when making decisions
- ✅ Test your implementations
- ✅ Think about edge cases
- ✅ Consider performance implications
- ✅ Write clean, maintainable code

### DON'T:
- ❌ Skip reading PLANNING.md at session start
- ❌ Forget to update TASKS.md
- ❌ Make architectural changes without documenting
- ❌ Ignore existing patterns in the codebase
- ❌ Leave tasks unmarked when complete
- ❌ Create duplicate tasks
- ❌ Assume context from previous sessions without checking files

---

## 🎯 Success Criteria Checklist

Before considering any task complete, verify:
- 🔴 Requirements from PRD are met
- 🔴 Code follows project patterns (check PLANNING.md)
- 🔴 Task is marked complete in TASKS.md (with 🟢 and date)
- 🔴 Any new patterns are documented in PLANNING.md
- 🔴 Any new tasks are added to TASKS.md
- 🔴 Code is tested and working
- 🔴 Edge cases are considered
- 🔴 Performance is acceptable

---

## 📚 Reference Quick Links

- **Project Requirements**: See `Playing_Cards_PRD.md`
- **Technical Planning**: See `PLANNING.md`
- **Current Tasks**: See `TASKS.md`
- **Functional Requirements**: PRD Section 2
- **Non-Functional Requirements**: PRD Section 3
- **UI Requirements**: PRD Section 4

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-19 | Initial CLAUDE.md created |

---

## Final Note

**Remember**: This project is about creating a flexible, intuitive card manipulation interface. Always prioritize:
1. **User experience** - smooth, intuitive interactions
2. **Flexibility** - support any card game through freeform mode
3. **Reliability** - correct game rules for built-in games
4. **Performance** - responsive drag-and-drop and animations

**Every session starts with reading PLANNING.md and checking TASKS.md. No exceptions.**