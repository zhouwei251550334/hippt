# Human content intake

## Opening interaction

After the operating-mode choice, establish how the user will provide content. Use a structured choice when the interface supports it; otherwise ask concisely:

> 请提供本次PPT的内容来源：<br>
> **上传材料（推荐）**：上传Word、PPT、PDF、Excel、图片或其他资料；<br>
> **直接描述**：说清主题和希望达到的效果；<br>
> **材料＋补充要求**：上传资料后，再说明需要增加、删减或强调的内容。

Do not ask this when the user has already uploaded files or provided a usable brief. Infer the route and acknowledge it.

## Minimum brief

The minimum brief contains four items:

- topic or presentation task;
- audience;
- delivery setting and duration;
- intended audience outcome: what the audience should understand, decide, believe, or do afterwards.

When starting from a short sentence, ask at most three questions in one turn. Prioritize missing items that materially change the story. Do not force the user to complete a long form.

Optional but useful inputs include target slide count, language, tone, brand or template, must-include and must-exclude content, permission to supplement with external sources, content-change freedom, confidentiality, and desired deliverables.

## Uploaded-file workflow

1. List every supplied file and inspect its actual contents.
2. Assign a role: source of truth, supporting reference, style reference, data appendix, or visual asset.
3. Identify duplicate versions, stale dates, missing pages, unreadable content, and material conflicts.
4. Ask which source controls only when the user's instruction does not already resolve the conflict.
5. Preserve original titles, dates, units, denominators, links, and factual wording where relevant.
6. State whether external supplementation is allowed. Do not add external claims in Faithful mode without approval.

## Uploaded PPT/PPTX boundary

Classify an uploaded PPT/PPTX as a content-only source by default. Extract:

- slide text and hierarchy;
- speaker notes;
- table text and recoverable structured values;
- chart titles, labels, units, legends, sources, and recoverable data;
- citations, links, dates, and factual annotations.

Do not reuse its master, theme, layouts, palette, fonts, backgrounds, decorative shapes, slide geometry, transitions, embedded images, screenshots, logos, icons, or charts as visual objects. Embedded media and brand assets remain excluded unless the user explicitly identifies a specific item for reuse and it passes licensing, privacy, evidence, and quality checks.

For an existing PPT transformation, record whether the source deck controls content sequence. Do not infer that it controls visual style. A request to retain the original template must be explicit and must be recorded as a source-template exception.

## Requirement card

Create this concise working record before the content outline:

| Field | Record |
|---|---|
| Operating mode | Standard, Fast, or Faithful |
| Input route | Files, brief, or mixed |
| Topic and task | What is being presented and why |
| Audience | Role, knowledge level, and decision authority |
| Audience outcome | Understand, decide, believe, or act |
| Setting | Meeting, lecture, competition, sales, report, or handout |
| Duration and length | Speaking time and target slide count |
| Source of truth | Authoritative files or explicit user statements |
| Supporting inputs | References, data appendices, and visuals |
| Supplement permission | Whether web research or added content is allowed |
| Transformation freedom | Faithful, structural optimization, or open redesign |
| Must include / exclude | Non-negotiable content boundaries |
| Brand and template | HiPPT managed template by default; any explicit brand or source-template exception |
| Privacy and compliance | Confidentiality, patient data, and external-processing limits |
| Assumptions and missing | Items inferred or awaiting confirmation |

Standard mode requires confirmation of the card before drafting the content specification. Fast mode may continue directly from a complete minimum brief to drafting `ppt-content-spec.md`, but it must retain the card, disclose material assumptions, and stop for approval of the completed specification before any template or design work. Faithful mode requires confirmation of authoritative files and allowed edits before drafting the specification.

## Blocking conditions

Stop and ask for direction when:

- the audience outcome cannot be inferred;
- supplied sources materially conflict and no precedence is defined;
- a requested factual claim is unsupported and supplementation is not allowed;
- patient-identifiable or confidential material is unsafe for the planned processing route;
- a medical, legal, regulatory, or financial claim lacks an approved evidence boundary;
- a style-reference deck is being mistaken for a factual content source.
- an uploaded content deck is being treated as a template, style source, or visual-asset library without an explicit exception.

## Medical and confidential material

- Ask whether cases are real, simulated, or teaching reconstructions.
- Require de-identification before external processing.
- Separate case facts, teaching additions, guideline evidence, and clinical inference.
- Confirm whether local policies or institutional protocols override general references.
- Do not upload confidential or patient-identifiable content to external search or generation services.
