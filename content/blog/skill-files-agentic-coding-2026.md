---
title: "The Skill.md Files I Should Have Written Sooner"
date: "2026-08-09"
excerpt: "A personal reflection on discovering skill.md documents late in my agentic coding journey. How simple text files transformed my development workflow and freed up mental bandwidth for architecture."
tags: ["AI", "Developer Tools", "Productivity", "Agentic Coding", "Workflow"]
author: "William Salas"
---

I've been working with AI-assisted development tools for years now, but I have to admit something: **I arrived late to the skill.md party**. And that's a regret I carry every time I watch a complex task I used to spend 20 minutes explaining now complete itself in seconds with a single command.

This is a reflection on how simple text files fundamentally changed how I approach agentic coding—and why every developer should make them part of their daily routine.

---

## What is a Skill File?

For the uninitiated, a `SKILL.md` file is a plain text document that contains a structured prompt for your AI coding assistant. Think of it as a reusable recipe card for complex tasks that you execute repeatedly.

When you invoke a skill, your AI assistant loads that instruction set and follows it deterministically. No re-explaining. No context loss. No "wait, I forgot to mention..." moments.

Here's the anatomy of a basic skill file:

```yaml
---
name: pr-draft-dev
description: Generates an insightful PR description via markdown content
---

generate a markdown response with an insightful yet efficient PR description
that explains the changes this branch introduces. Follow this template:

# Summary
<!-- Brief overview of what this PR does. -->

### Rationale & Context
<!-- Why is this change necessary? -->
```

That's it. A name, a description, and the prompt itself. The magic happens in the reusability.

---

## The Heavy Workload Problem

Before I started using skill files, my workflow with AI assistants followed a predictable pattern:

1. **Context Dumping:** Spend 5-10 minutes explaining the task structure, edge cases, and desired output format
2. **Iterative Refinement:** Watch the AI make 80% progress, then spend another 5 minutes correcting the gaps
3. **Task Completion:** Finally get what I wanted, but at the cost of valuable mental energy

For a one-off task, this overhead is acceptable. But for recurring workflows—like generating PR descriptions, addressing reviewer feedback, or running code reviews—this inefficiency compounds quickly.

I was doing the same explanations, over and over, every single day. That's time stolen from architecture decisions, strategic planning, and the deep thinking that developers should be doing.

---

## The Skill.md Solution

When I finally started documenting my recurring workflows as skill files, something clicked. What once required minutes of context dumping now required a single command:

```
/pr-review-planner owner/repo#123
```

Behind the scenes, the AI loads a 118-line structured prompt that I wrote once. It then:

1. Parses the GitHub PR reference
2. Preflights system status and authentication
3. Collects all three comment streams in parallel
4. Normalizes and classifies each comment
5. Writes a structured plan document
6. Reports back with counts, file paths, and recommendations

No explanation needed. No iterative refinement. Just consistent, deterministic output that I can trust.

---

## A Simple Example: PR Description Generation

Here's the full skill file I use for generating PR descriptions. It's not complex—it's just *structured*:

```yaml
---
name: pr-draft-dev
description: Generates an insightful PR description via markdown content
disable-model-invocation: false
---

generate a markdown response with an insightful yet efficient PR description
that explains the changes that this branch introduces. Contrast the current
branch against develop and follow this template:

# Summary
<!-- Brief overview of what this PR does. -->

### Rationale & Context
<!-- Why is this change necessary? -->
*

### Overview of File Changes
<!-- High-level summary of key architectural or file-level changes. -->
* **`path/to/component-or-module/`**: 

---

## Technical Details & Risk Assessment

- **Breaking Changes?**
  - [ ] No
  - [ ] Yes

- **Edge Cases & Considerations**
  - <!-- e.g., Network timeouts, empty states, race conditions -->

---

## How to Test

### Manual Testing Steps
1. 
2. 

### Testing Checklist
- [ ] I have performed manual testing locally
- [ ] I have tested edge cases
```

Every time I run this skill, I get a consistent, professional PR description format. No variation. No "oops, I forgot to ask for the risk assessment section." It just works.

---

## The Routine-Changer: PR Review Planner

The most complete skill in my collection—and the one that has most dramatically changed my daily workflow—is the **pr-review-planner**. This skill automates the tedious process of collecting reviewer feedback and organizing it into a structured action plan.

Here's a truncated look at what it contains:

```yaml
---
name: pr-review-planner
description: Reads reviewer comments from a GitHub PR and produces
a structured plan to address every comment.
argument-hint: "<github-pr-url | owner/repo#123 | 123>"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
---

## Step 1 — Parse the input
Accept any of: https://github.com/<owner>/<repo>/pull/<n> or <n>

## Step 2 — Preflight & system status
Run each command and echo output. Stop on first failure:
1. command -v gh — confirm CLI is installed
2. gh auth status — confirm authenticated
3. gh api repos/<OWNER>/<REPO> — confirm repo is visible
4. gh pr view <OWNER>/<REPO>#<NUMBER> — confirm PR exists

## Step 3 — Collect all three comment streams
Run in parallel: general comments, inline comments, reviews.

## Step 4 — Normalize & classify
Build in-memory list. De-duplicate. Classify as blocking/bug/design/nit.

## Step 5 — Write the plan
Create pr-<NUMBER>-review-plan.md with structured categories.

## Step 6 — Report back
Print summary with counts, file paths, and warnings.
```

What used to be a 15-minute manual process of scrolling through GitHub comments, copy-pasting feedback, and organizing by priority is now a one-command operation. The skill handles the GitHub CLI integration, the comment classification, and the output formatting—all deterministically, all repeatably.

---

## The Strategic Benefit

Here's what really matters: **By automating the repetitive, I've reclaimed time for the strategic.**

When I no longer need to spend mental energy explaining how I want my PR descriptions formatted, or how to organize reviewer feedback, that energy goes elsewhere:

- **Architecture decisions:** I can think more deeply about system design
- **Code quality:** I have bandwidth to review code more thoroughly before committing
- **Learning:** I can explore new technologies and patterns
- **Mentorship:** I can help teammates level up

Skill files aren't just about automation—they're about **elevating the developer's role from task-doer to task-designer**.

---

## The Golden Rule: Always Review Code

There's an important caveat that I need to emphasize: **The goal of using AI tools is not to let them take over.**

Every line of code that gets pushed to production—whether written by me or generated with AI assistance—must be reviewed. Skill files don't change this fundamental responsibility. What they change is the *ratio* of time spent on routine execution versus time spent on thoughtful review.

When your AI assistant generates a PR review plan based on a skill file, you still need to:
- Read through each classified comment
- Verify the suggested fixes are correct
- Understand the context before approving changes

The skill file handles the *organization* of the work, but the *judgment* remains yours. And that's exactly how it should be.

---

## Make Skills Part of Your Daily Routine

If you're not using skill files yet, here's my recommendation: start small.

1. **Identify your recurring tasks:** PR descriptions, code reviews, test generation, etc.
2. **Write one skill file:** Start with your most frequent or most tedious task
3. **Refine iteratively:** Use it, notice gaps, improve the prompt
4. **Expand gradually:** Add more skills as you discover patterns

The investment upfront pays dividends every single day. And unlike one-off AI prompts, skill files compound in value—the more you use them, the more reliable they become.

---

## Conclusion

I arrived late to skill.md files, but I'm making up for lost time. What started as a simple experiment in automation has become a foundational part of my development workflow.

The lift in mental bandwidth is real. The reduction in repetitive work is measurable. And the ability to focus on architecture and strategy—instead of explaining the same task for the hundredth time—is invaluable.

Every developer should make skill files part of their daily routine. Your future self will thank you.
