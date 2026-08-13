# HiPPT workflow

## Contents

1. Delivery format and operating mode
2. Human content intake and operating mode
3. Transformation type and universal content gate
4. Delivery-format and PPTX design branches
5. Template or per-page generative execution
6. Typography, sample, full build, and delivery QA

## 1. Select the expected delivery format

Unless the request already makes the format explicit, begin with this concise choice before the operating-mode choice:

> 请选择最终交付格式。无论选择哪种格式，HiPPT 都会先执行相同的内容审核流程，确认每页标题、页面内容、数据、演讲稿和证据来源；内容确认后才进入样式设计。<br>
> **PPTX**：适合讲课、比赛、正式汇报和文件交付，可在 PowerPoint/WPS 中编辑，兼容性较高，复杂互动能力有限。<br>
> **HTML**：适合产品演示、数据展示和在线传播，支持动态图表、三维、地图和实时互动，但需要浏览器运行，交付和测试更复杂。

Use a structured choice when the interface supports it. Record dual PPTX+HTML delivery only when the user explicitly requests both. Format selection records the expected deliverable; it does not authorize template, theme, visual, or interaction design before content approval.

Infer and proceed when the user already says PPT/PPTX/PowerPoint/WPS or HTML/web/interactive presentation. If the user delegates the choice, recommend PPTX for lecture, competition, formal reporting, offline file handoff, or routine editing; recommend HTML for interactive product demonstration, exploratory data, 3D, maps, browser sharing, or live parameters.

## 2. Start with a concise operating-mode choice

Unless the user's request already makes the mode explicit, begin with this concise choice:

> 开始前请选择制作模式：<br>
> **标准模式（推荐）**：先确认逐页内容说明，再选模板制作。<br>
> **快速模式**：材料清晰时直接形成完整内容说明，确认后再选模板制作。<br>
> **忠实迁移**：不改变原始内容，先形成逐页内容说明，确认后再迁移设计。

If a structured user-choice UI is available, use it. Otherwise ask the same question in concise plain language. Do not add a long workflow explanation at this stage.

Infer and proceed when the request is already explicit:

- “直接做”“尽快做” -> Fast mode, but still require confirmation of the Markdown content specification before design;
- “只美化”“内容不动”“不要改文字” -> Faithful mode;
- no explicit mode -> ask; if the user delegates the choice, use Standard mode.

## 3. Collect human content input and identify the task

Read and follow `intake.md` before outlining, template selection, or slide production.

Accept three input routes:

- uploaded files as the main source;
- a spoken or written brief;
- uploaded files plus supplemental instructions.

If the route is unclear, ask the user to choose one. If files or a sufficiently clear brief are already present, infer the route and do not ask redundantly.

Inventory every supplied file by role: source of truth, supporting reference, style reference, data appendix, or visual asset. Read the actual content; do not infer claims from filenames alone. Record source precedence and ask which source wins when material conflicts cannot be resolved from explicit user instructions.

When the supplied file is PPT/PPTX, apply the content-only boundary in `intake.md` before extraction. The source deck is not a template candidate, style reference, or visual-asset library by default.

Create a concise requirement card covering the expected delivery format, communication job, audience, setting, duration, target length, source boundary, permission to supplement, transformation freedom, must-include and must-exclude content, brand/template or HTML-theme constraints, confidentiality, medical constraints, assumptions, and missing information.

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

## 4. Apply the operating mode

### Standard mode — default

Use when the user has not explicitly requested immediate production.

1. Confirm the requirement card and source map.
2. Analyze source material.
3. Produce the proposed narrative, section outline, and complete `ppt-content-spec.md` defined in `content-spec.md`.
4. Mark verified facts, user-provided claims, inferences, missing information, and excluded content.
5. Obtain explicit user confirmation of the Markdown content specification.
6. Only then branch by delivery format and proceed to design.
7. After the format-specific visual system is selected, search the web first for ordinary non-confidential visual needs; use image generation only when search cannot satisfy the approved visual plan.

### Fast mode — explicit opt-in

Use only when the user clearly asks for speed or direct progress.

- Infer non-critical details and continue.
- Require enough input to identify the topic, audience, setting or duration, and intended audience outcome; otherwise ask before building.
- Do not waive evidence, medical-safety, font-license, or final-QA gates.
- Produce the complete `ppt-content-spec.md` in one pass when the brief is sufficient.
- Stop after delivering the Markdown file and request confirmation. A request such as “不用确认大纲” accelerates drafting but does not waive this gate unless the user has already approved the exact page-level content in the current task.
- Do not inspect or recommend PPTX templates or HTML themes, build the three-page sample, search design visuals, design interactions, or create PPTX/HTML output before approval.

### Faithful mode — content locked, design remapped

Use when the user asks for beautification without changing content.

- Preserve the original claims, sequence, data, and conclusion.
- Confirm the authoritative content files and distinguish them from style-only or background references.
- Convert the authoritative content into `ppt-content-spec.md`, including a suggested talk track for each slide without changing the locked meaning.
- Obtain explicit confirmation of the Markdown specification before selecting a replacement PPTX template or HTML theme.
- Correct only clear typos or formatting errors unless broader editing is approved.
- For PPTX, use a new whole template from the HiPPT managed asset pack by default, or use the per-page generative route when the user explicitly selects it. For HTML, rebuild inside a web-native theme. Do not preserve the uploaded deck's visual template by implication.
- Record every material content change for user review.

## 5. Select the transformation type

For an existing deck, identify one of these separately from the operating mode:

- Faithful content migration: content and sequence stay fixed; rebuild them in the selected delivery format.
- Structural optimization: reorganize sections or slides while preserving source facts; confirm the change map first.
- PPTX template migration: map approved content into a selected whole template while retaining factual and brand boundaries.
- Per-page generative PPTX design: use an image-generation model such as Image2 to create the visual composition of each approved page, then assemble the final PPTX with editable content layers. This is an explicit alternative to a managed whole template, not permission to rasterize the approved content.
- HTML presentation rebuild: map approved content into a web-native theme and interaction system without inheriting PPTX masters or fixed geometry.

For a content-only source deck, inspect its visual system only to identify and prevent accidental carryover. Do not use it as the redesign baseline or preserve its visual cues. For PPTX, apply the redesign audit in `design-taste.md` to the selected HiPPT template or an explicitly approved source-template exception. For HTML, follow the theme boundary in `html-mode.md`.

## 6. Pass the universal content gate

Before template selection, define:

- the confirmed requirement card and source-of-truth hierarchy;
- opening and closing logic;
- cumulative narrative arc;
- one narrative job and one primary claim per slide;
- takeaway-style slide titles;
- evidence required for each major claim;
- speaker-note material that should not appear on the canvas;
- content that must remain excluded.

Create a durable Markdown file named `ppt-content-spec.md` using `content-spec.md`. The file must cover every planned slide and must include, at minimum:

- slide number and title;
- audience-facing on-slide content;
- suggested speaker notes or talk track;
- evidence/source status and unresolved questions.

Apply this gate to Standard, Fast, and Faithful modes and to PPTX, HTML, or explicit dual delivery. Deliver the Markdown file to the user and stop for explicit confirmation. Do not access template or theme candidates, recommend a visual system, build a sample, select fonts, source design visuals, design interactions, or create PPTX/HTML output before approval.

Use the page-level content specification defined in `content-policy.md`.

After approval, treat the confirmed Markdown file as the design-stage content contract. If claims, page order, scope, or speaker-note meaning changes materially, update the file, add a visible change note, and request confirmation again before continuing.

After the facts, evidence status, and source hierarchy are locked, read and apply `content-style.md` separately to the three output layers: slide titles, on-canvas body copy, and speaker notes. Do not apply a generic prose rewrite to all three layers.

Run the language pass in this order:

1. preserve the approved meaning, numbers, uncertainty, attribution, and scope;
2. replace vague, promotional, or formulaic wording with concrete subject-action-result language;
3. remove filler, meta-chat, forced slogans, and generic conclusions;
4. read titles and notes aloud for natural rhythm;
5. compare the revised claim against its source before design approval.

In Faithful mode, treat this language pass as advisory unless the user explicitly allows wording changes.

## 7. Branch by delivery format only after approval

- PPTX: select a design execution route below: managed whole-template PPTX (default) or per-page generative PPTX design (only when the user explicitly requests it).
- HTML: read and follow `html-mode.md`; do not continue into the PPTX template workflow.
- Explicit dual delivery: build two independent presentation renderings from the same approved `ppt-content-spec.md`. Do not require pixel-identical pages. If either rendering needs a substantive content change, update the shared Markdown contract and obtain renewed confirmation before changing either output.

## 8. PPTX only: select the design execution route

Enter this stage only after the user explicitly confirms `ppt-content-spec.md`.

Offer the user these two PPTX design routes. Recommend the managed whole-template route unless the user has explicitly selected per-page generative design.

1. **Managed whole-template PPTX (default):** map approved content to an audited HiPPT template. This is preferred when a stable brand system, conventional visual consistency, or maximum native editability matters most.
2. **Per-page generative PPTX design:** use an image-generation model such as Image2 to create the visual composition for every approved page. Use only when the user explicitly requests this route or explicitly approves it after the trade-offs are explained: faster bespoke visual direction and greater page variety, but every generated visual requires extra factual, artifact, privacy, and editability review.

Both routes must read `design-taste.md`, state a one-line visual read, and infer `LAYOUT_VARIANCE`, `VISUAL_DENSITY`, and `VISUAL_ENERGY` from the audience, setting, content, trust requirements, and brand. Do not ask the user to tune these values unless two materially different visual directions remain plausible.

## 9. PPTX only: managed whole-template route

Enter this stage only after the user selects the managed whole-template route.

1. Read the managed asset-pack catalog.
2. Build the candidate set exclusively from verified whole templates in the HiPPT managed asset pack; exclude uploaded content decks.
3. Rank three to six whole templates using audience, task, tone, content density, chart needs, and brand constraints.
4. Show a clickable template card for each candidate using the cover, representative pages, tags, and selection rationale.
5. Let the user select the template itself, not source slide numbers.
6. After selection, automatically map the approved content-specification pages to suitable layouts within that template.
7. Build the internal layout-diversity map defined in `template-policy.md`. Prefer a distinct source layout or derived body composition for every non-series slide and document every exact reuse.

Treat icon decks as an asset library, never as template candidates.

## 10. PPTX only: per-page generative design route

Enter this stage only after the user selects the per-page generative route. It is a deliberate art-direction workflow, not a shortcut around the content, evidence, privacy, or editability gates.

Read and follow `generative-pptx.md` as the authoritative execution contract for this branch. At minimum:

1. create `ppt-page-generation-spec.md` and a coherent deck-wide visual system;
2. generate text-free 16:9 page visuals with safe editable-overlay zones and separable elements;
3. approve the three-page sample before full-batch generation;
4. deliver both the image-based and editable PPTX files after element decomposition, reconstruction, and cross-file verification.

## 11. PPTX only: establish typography, visual assets, and design constraints

- Select the typography profile before mapping content to layouts:
  - `projection` for lectures, competitions, training, medical reasoning, and auditorium delivery;
  - `meeting` for presales, product introductions, internal reporting, and conference-room delivery;
  - `compact` only for appendices, handouts, or explicitly approved dense reference pages.
- For the managed-template route, extract fonts used by the selected HiPPT template and any separately approved brand pack. For the per-page generative route, select installed or licensed fonts for the editable PPT overlay system; do not ask the image model to render typography. Do not treat fonts from a content-only source deck as design candidates.
- Check installed families and weights.
- Build an explicit role map for cover title, slide title, section heading, body, labels, data emphasis, and sources. Do not apply one undifferentiated family/weight to every text box.
- Reject or remap template layouts or generated compositions that require type below the selected profile's floor. Template or image fidelity never justifies unreadable projected text.
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
- Use image generation only when a bespoke composition is materially useful, a safe and licensed search result is unavailable, privacy makes real imagery unsuitable, the user explicitly requests generated imagery, or the user has selected the per-page generative route.
- Begin approved image search while template text and layout editing proceeds when the available tools permit concurrent work; do not block a code-editing fast path on unnecessary asset generation. The user-selected per-page generative route is a deliberate exception to the normal search-first default.

## 12. PPTX only: build the three-slide sample

Create:

1. a cover;
2. a representative content slide;
3. a complex slide such as a process, data, comparison, or clinical-reasoning page.

For the managed-template route, review template fit. For the per-page generative route, execute the three-page sample gate in `generative-pptx.md`. In both routes, review type, density, visual direction, contrast, factual boundary, element separability, and editability. Revise until the direction is explicitly approved.

In the managed-template route, use a suitable searched or explicitly approved existing asset for the cover when one is readily available. Do not delay the sample for AI generation merely to replace a searchable generic photograph or pattern. In the per-page generative route, do not add page numbers to the sample, whether as generated pixels or editable PPT layers.

## 13. PPTX only: build the full deck and the generative image-based copy

### Managed whole-template route

- Clone or import the selected HiPPT managed template rather than recreating its visual language from scratch.
- Rebuild source-deck content inside the selected template. Do not import the source deck's master, layouts, theme, decorative media, or slide geometry.
- Preserve masters, layouts, geometry, palette, spacing, and signature decorative elements.
- Keep important text and slide numbering as editable PPT layers.
- Put timing scaffolds and talk tracks in speaker notes unless the audience needs to see them.
- Use generated full-slide visuals without baked-in text, logos, or page numbers.
- Preserve the template's signature system while varying slide silhouettes according to content job. Do not repeat an exact layout on adjacent non-series slides, and avoid repeating one generic card layout throughout the deck.
- Reuse layouts freely only when the pages are intentionally the same content class or series and repetition improves comparison, learning, or navigation.

### Per-page generative route

After explicit sample approval, execute the full-deck generation and image-based PPTX stage in `generative-pptx.md`. Preserve the text-free page visuals for decomposition, render the approved complete pages for `[deck-name]-image.pptx`, and do not add page numbers.

Apply the palette, accent, shape, typography, icon, image-treatment, and overlay-safe-zone locks defined in `design-taste.md` and, for the per-page generative route, the page-generation specification.

## 14. Per-page generative PPTX only: decompose every page into independent PNG elements

Execute the element-decomposition stage in `generative-pptx.md`. Require one transparent PNG per separable non-text visual element, record exact placement in `ppt-element-manifest.json`, and return the PNGs directly in ordered batches when supported. Do not claim success when faithful separation cannot be verified.

## 15. Per-page generative PPTX only: reconstruct the editable PPTX

Execute the editable-reconstruction stage in `generative-pptx.md`. Build `[deck-name]-editable.pptx` from the element manifest and independent PNG objects, add native editable text and evidence-bearing objects, and compare every rendered page with `[deck-name]-image.pptx`. Never flatten the editable copy or add page numbers.

## 16. PPTX only: verify and deliver

After every meaningful change:

1. run structural and overflow checks;
2. render every slide;
3. inspect a montage and representative pages at full size;
4. verify fonts and unexpected line wrapping;
5. export final layout JSON and run `scripts/audit-typography.mjs --layout-dir <dir> --profile <projection|meeting|compact>`;
6. export or inspect slide text and speaker notes, then run `node scripts/audit-language.mjs --input <text-or-inspect-file>` as an advisory review;
7. for the per-page generative route, verify every text-free visual reference against its page-generation specification, every complete page render against the approved full-page design, every PNG against the element manifest, and every reconstructed slide against the corresponding image-based slide;
8. confirm that `[deck-name]-image.pptx` contains exactly one complete full-slide image per slide, while `[deck-name]-editable.pptx` contains no flattened full-page render and all text and PNG visual elements are independently editable or selectable as specified;
9. confirm that both per-page generative PPTX files have matching slide count, order, dimensions, approved content, and page-level visual hierarchy, and that neither file contains page numbers;
10. verify evidence, citations, source labels, medical boundaries, and the meaning-preservation gate;
11. reopen or reparse both final PPTX files when possible;
12. deliver both PPTX files with a concise QA summary and any unresolved risks.
