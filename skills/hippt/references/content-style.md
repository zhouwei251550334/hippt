# Natural Chinese and presentation voice

Apply this reference only after the source hierarchy, facts, evidence status, and allowed transformation boundary are clear. The goal is natural, precise presentation language, not casual prose or artificial personality.

## Core rule

Preserve meaning first. Then make the language direct, concrete, concise, and suitable for the audience and speaking context.

- Lead with the fact, decision, tension, or audience consequence.
- Prefer ordinary `是` and `有` constructions when they are clearer than ornamental phrasing.
- Replace vague importance claims with the evidence or operational consequence that makes the point important.
- Remove filler transitions, chatbot traces, manufactured slogans, empty outlooks, and unnecessary summaries.
- Vary sentence and slide rhythm when the content supports it; do not create variation by cycling synonyms.
- Trust the audience to understand a clear point. Do not explain the same metaphor or conclusion twice.
- Never add invented experience, emotion, quotation, expert endorsement, or anecdote to simulate a human voice.

## Edit the three layers differently

### Slide titles

- State the takeaway, finding, choice, or tension in one clean sentence or phrase.
- Avoid topic-only labels when a useful conclusion is known.
- Avoid unsupported words such as `赋能`、`重塑`、`引领`、`颠覆`、`开创性`、`行业领先`、`全面升级` and `未来可期`.
- Avoid formulaic frames such as `不仅是……更是……`、`从……到……` and forced three-part slogans unless the logic genuinely requires them.
- Do not use emoji, decorative quotation marks, or excessive dashes as a substitute for hierarchy.

### On-canvas body copy

- Give each bullet one complete idea with a concrete subject, action, object, or result.
- Use the number of items the logic requires. Two or four points are valid; do not fill three columns merely because they exist.
- Prefer a specific fact, example, measure, risk, owner, or next action over `值得关注`、`至关重要`、`深入探讨` or `持续发力`.
- Avoid repeated `加粗标签：泛化解释` blocks when a sentence, comparison, chart, or process would communicate better.
- Move nuance, examples, timing, and explanation to notes before shrinking type or turning the slide into prose.

### Speaker notes

- Write for speech: use natural transitions, varied sentence length, and occasional short emphasis.
- Use first person only when it matches the presenter's approved voice. Never fabricate personal experience.
- Let the logic create transitions; remove `接下来让我们`、`值得注意的是` and `综上所述` when they add no meaning.
- Keep professional restraint. Natural does not mean chatty, self-congratulatory, or imprecise.

## Scenario calibration

| Scenario | Preferred voice | Guardrail |
|---|---|---|
| Medical or scientific | Neutral, precise, evidence-first | Preserve uncertainty, source type, risk, thresholds, and teaching simplifications; do not inject personality into clinical claims |
| Internal report | Direct, accountable, operational | State status, evidence, owner, risk, decision, and next action; avoid motivational padding |
| Presales or product | Specific, user-centered, credible | Describe scenario, capability, boundary, proof, and value; do not invent outcomes or use hype instead of evidence |
| Lecture or training | Clear, conversational, teachable | Use questions, cases, and rhythm where sourced or explicitly proposed; distinguish simplification from verified fact |
| Faithful content migration | Source-content preserving | Keep wording fixed unless the user approves a separate editorial pass; remap the content into a selected HiPPT template |

## Editorial pass

For every material slide:

1. Identify the one claim the audience should retain.
2. Delete sentences that only announce importance, structure, or helpfulness.
3. Replace vague actors such as `专家`、`业内人士` or `有研究` with a named source or mark the evidence gap.
4. Remove promotional adjectives unless they are approved brand language or supported comparisons.
5. Break forced symmetry, repeated sentence endings, false ranges, and automatic three-part groupings.
6. Read the title and notes aloud; revise awkward rhythm without weakening precision.
7. Compare the result with the source and recheck the meaning-preservation gate in `content-policy.md`.

Use `scripts/audit-language.mjs` to flag likely patterns. Treat every finding as a review prompt, not proof of poor writing and never as permission for automatic rewriting.

These principles adapt the public Humanizer-zh approach to presentation work: <https://github.com/op7418/Humanizer-zh/blob/main/SKILL.md>.
