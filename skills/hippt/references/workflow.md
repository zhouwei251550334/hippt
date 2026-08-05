# HiPPT workflow

## 1. Start with a concise mode choice

Unless the user's request already makes the mode explicit, begin with this concise choice:

> 开始前请选择制作模式：<br>
> **标准模式（推荐）**：先确认大纲和逐页故事板，再选模板制作。<br>
> **快速模式**：材料清晰时直接制作三页样稿，确认后完成整套。<br>
> **忠实迁移**：不改变原始文字内容，仍从HiPPT资源库选择新模板制作。

If a structured user-choice UI is available, use it. Otherwise ask the same question in concise plain language. Do not add a long workflow explanation at this stage.

Infer and proceed when the request is already explicit:

- “直接做”“不用确认大纲” -> Fast mode;
- “只美化”“内容不动”“不要改文字” -> Faithful mode;
- no explicit mode -> ask; if the user delegates the choice, use Standard mode.

## 2. Collect human content input and identify the task

Read and follow `intake.md` before outlining, template selection, or slide production.

Accept three input routes:

- uploaded files as the main source;
- a spoken or written brief;
- uploaded files plus supplemental instructions.

If the route is unclear, ask the user to choose one. If files or a sufficiently clear brief are already present, infer the route and do not ask redundantly.

Inventory every supplied file by role: source of truth, supporting reference, style reference, data appendix, or visual asset. Read the actual content; do not infer claims from filenames alone. Record source precedence and ask which source wins when material conflicts cannot be resolved from explicit user instructions.

When the supplied file is PPT/PPTX, apply the content-only boundary in `intake.md` before extraction. The source deck is not a template candidate, style reference, or visual-asset library by default.

Create a concise requirement card covering the communication job, audience, setting, duration, target length, source boundary, permission to supplement, transformation freedom, must-include and must-exclude content, brand/template constraints, confidentiality, medical constraints, assumptions, and missing information.

Infer as much as possible from the user's request and supplied files. Ask only for missing information that would materially change the result, normally no more than three questions at a time.

Capture:

- audience;
- presentation job: educate, persuade, sell, report, recommend, or enable a decision;
- audience outcome;
- delivery setting and duration;
- target length;
- source files and factual boundaries;
- confidentiality, medical, brand, and compliance constraints;
- whether this is a new deck or an existing-deck transformation.

Express the communication job in one sentence:

> By the end, [audience] should [outcome] because [central takeaway].

Do not proceed beyond this gate when the audience outcome is unknown, source files materially conflict, patient or confidential data is unsafe to process, or a high-stakes claim lacks an approved source boundary.

## 3. Apply the operating mode

### Standard mode — default

Use when the user has not explicitly requested immediate production.

1. Confirm the requirement card and source map.
2. Analyze source material.
3. Produce the proposed narrative, section outline, and page-level storyboard.
4. Mark verified facts, user-provided claims, inferences, missing information, and excluded content.
5. Obtain user confirmation.
6. Only then recommend whole templates and proceed to design.
7. After template selection, search the web first for ordinary non-confidential visual needs; use image generation only when search cannot satisfy the approved visual plan.

### Fast mode — explicit opt-in

Use only when the user clearly says to make the deck directly or skip intermediate confirmation.

- Infer non-critical details and continue.
- Require enough input to identify the topic, audience, setting or duration, and intended audience outcome; otherwise ask before building.
- Do not waive evidence, medical-safety, font-license, or final-QA gates.
- Record the requirement card and report material assumptions with the first sample or final delivery.
- Prefer user assets, template assets, and web-searchable visuals. Do not wait for AI image generation unless the user explicitly requests it or no usable alternative exists.

### Faithful mode — content locked, design remapped

Use when the user asks for beautification without changing content.

- Preserve the original claims, sequence, data, and conclusion.
- Confirm the authoritative content files and distinguish them from style-only or background references.
- Correct only clear typos or formatting errors unless broader editing is approved.
- Select a new whole template from the HiPPT managed asset pack; do not preserve the uploaded deck's visual template by implication.
- Record every material content change for user review.

## 4. Select the transformation type

For an existing deck, identify one of these separately from the operating mode:

- Faithful content migration: content and sequence stay fixed; rebuild them in a selected HiPPT managed template.
- Structural optimization: reorganize sections or slides while preserving source facts; confirm the change map first.
- Template migration: map approved content into a selected whole template while retaining factual and brand boundaries.

For a content-only source deck, inspect its visual system only to identify and prevent accidental carryover. Do not use it as the redesign baseline or preserve its visual cues. Apply the redesign audit in `design-taste.md` to the selected HiPPT template, or to an explicitly approved source-template exception.

## 5. Pass the content gate

Before template selection, define:

- the confirmed requirement card and source-of-truth hierarchy;
- opening and closing logic;
- cumulative narrative arc;
- one narrative job and one primary claim per slide;
- takeaway-style slide titles;
- evidence required for each major claim;
- speaker-note material that should not appear on the canvas;
- content that must remain excluded.

Standard mode requires explicit user confirmation of the requirement card, outline, and storyboard. Fast mode may proceed without a separate confirmation turn only when the minimum brief is complete and all material assumptions are recorded. Faithful mode requires confirmation of the authoritative content source and allowed change boundary.

Use the page-level content specification defined in `content-policy.md`.

After the facts, evidence status, and source hierarchy are locked, read and apply `content-style.md` separately to the three output layers: slide titles, on-canvas body copy, and speaker notes. Do not apply a generic prose rewrite to all three layers.

Run the language pass in this order:

1. preserve the approved meaning, numbers, uncertainty, attribution, and scope;
2. replace vague, promotional, or formulaic wording with concrete subject-action-result language;
3. remove filler, meta-chat, forced slogans, and generic conclusions;
4. read titles and notes aloud for natural rhythm;
5. compare the revised claim against its source before design approval.

In Faithful mode, treat this language pass as advisory unless the user explicitly allows wording changes.

## 6. Recommend and select a whole template

1. Read the managed asset-pack catalog.
2. Build the candidate set exclusively from verified whole templates in the HiPPT managed asset pack; exclude uploaded content decks.
3. Rank three to six whole templates using audience, task, tone, content density, chart needs, and brand constraints.
4. Show a clickable template card for each candidate using the cover, representative pages, tags, and selection rationale.
5. Let the user select the template itself, not source slide numbers.
6. After selection, automatically map storyboard pages to suitable layouts within that template.

Treat icon decks as an asset library, never as template candidates.

After the whole template is selected, read `design-taste.md` and state a one-line visual read. Infer `LAYOUT_VARIANCE`, `VISUAL_DENSITY`, and `VISUAL_ENERGY` from the audience, setting, content, trust requirements, brand, and selected template. Do not ask the user to tune these values unless two materially different visual directions remain plausible.

## 7. Audit fonts and visual assets

- Select the typography profile before mapping content to layouts:
  - `projection` for lectures, competitions, training, medical reasoning, and auditorium delivery;
  - `meeting` for presales, product introductions, internal reporting, and conference-room delivery;
  - `compact` only for appendices, handouts, or explicitly approved dense reference pages.
- Extract fonts used by the selected HiPPT template and any separately approved brand pack. Do not treat fonts from a content-only source deck as design candidates.
- Check installed families and weights.
- Build an explicit role map for cover title, slide title, section heading, body, labels, data emphasis, and sources. Do not apply one undifferentiated family/weight to every text box.
- Reject or remap layouts that require type below the selected profile's floor. Template fidelity never justifies unreadable projected text.
- Use bundled fonts only when redistribution rights are documented.
- Request approval before installing user-level fonts.
- Define image, screenshot, chart, icon, search, and generation needs.
- Exclude visuals embedded in a content-only source deck unless the user explicitly reclassifies a specific item for reuse.
- Prefer real product evidence and official assets over fabricated placeholders.
- For generic scenes, objects, places, textures, patterns, and non-confidential teaching visuals, use web image search before image generation unless the user says not to use the internet.
- Formulate search queries from the visual concept, aspect ratio, subject placement, and style. Do not include confidential customer, patient, product-roadmap, or internal-project details in search terms.
- Inspect the source page and obtain the full-resolution asset. Never build a delivered slide from a search-result thumbnail.
- Search with a bounded effort: normally try up to two well-formed query rounds per visual need and stop when a semantically suitable, sufficiently large, and legally usable asset is found.
- Prefer official or primary sources for real entities, products, people, institutions, medical teaching material, publications, and events. Prefer clearly licensed stock or public-domain sources for generic decorative photography.
- Use image generation only when a bespoke composition is materially useful, a safe and licensed search result is unavailable, privacy makes real imagery unsuitable, or the user explicitly requests generation.
- Begin approved image search while template text and layout editing proceeds when the available tools permit concurrent work; do not block a code-editing fast path on unnecessary asset generation.

## 8. Build the three-slide sample

Create:

1. a cover;
2. a representative content slide;
3. a complex slide such as a process, data, comparison, or clinical-reasoning page.

Review template fit, type, density, visual direction, and editability. Revise until the direction is approved.

Use a suitable searched or explicitly approved existing asset for the cover when one is readily available. Do not delay the sample for AI generation merely to replace a searchable generic photograph or pattern.

## 9. Build the full deck

- Clone or import the selected HiPPT managed template rather than recreating its visual language from scratch.
- Rebuild source-deck content inside the selected template. Do not import the source deck's master, layouts, theme, decorative media, or slide geometry.
- Preserve masters, layouts, geometry, palette, spacing, and signature decorative elements.
- Keep important text and slide numbering as editable PPT layers.
- Put timing scaffolds and talk tracks in speaker notes unless the audience needs to see them.
- Use generated full-slide visuals without baked-in text, logos, or page numbers.
- Preserve the template's signature system while varying slide silhouettes according to content job. Avoid repeating one generic card layout throughout the deck.
- Apply the palette, accent, shape, typography, icon, and image-treatment locks defined in `design-taste.md`.

## 10. Verify and deliver

After every meaningful change:

1. run structural and overflow checks;
2. render every slide;
3. inspect a montage and representative pages at full size;
4. verify fonts and unexpected line wrapping;
5. export final layout JSON and run `scripts/audit-typography.mjs --layout-dir <dir> --profile <projection|meeting|compact>`;
6. export or inspect slide text and speaker notes, then run `node scripts/audit-language.mjs --input <text-or-inspect-file>` as an advisory review;
7. verify evidence, citations, source labels, medical boundaries, and the meaning-preservation gate;
8. reopen or reparse the final PPTX when possible;
9. deliver the editable PPTX with a concise QA summary and any unresolved risks.
