# Chat History & Memory

## Overview
This folder preserves all AI assistant conversations for context continuity across sessions.

## Structure
```
chat-history/
├── YYYY-MM-DD-topic.md    # Each conversation = one file
├── index.md               # Master index of all conversations
└── templates/
    └── conversation-template.md
```

## Conversation File Format
```markdown
# YYYY-MM-DD - Brief Topic

**Date**: 2026-11-05  
**Participants**: User + AI Assistant  
**Context**: Project PURPLE - GitHub + Supabase deployment

## Summary
Brief 2-3 sentence summary of what was discussed/decided.

## Key Decisions
- Decision 1 with rationale
- Decision 2 with rationale

## Action Items
- [ ] Task 1 - Assignee
- [ ] Task 2 - Assignee

## Open Questions
- Question 1
- Question 2

## Code/Config Changes
Reference to files changed or created.

---

## Full Conversation
*Optional: Full transcript or key excerpts*
```

## Index Maintenance
Update `index.md` after each conversation:
```markdown
| Date | Topic | File | Key Outcomes |
|------|-------|------|--------------|
| 2026-11-05 | Documentation setup | 2026-11-05-doc-setup.md | Created doc structure, ADR process |
```

---

*This ensures no context is lost between sessions.*