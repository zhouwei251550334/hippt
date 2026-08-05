# Quality assurance and delivery

## Release rule

A generated file is not a verified presentation merely because it exists or a build script exits successfully. Do not declare completion until the content, fonts, layout, rendering, editability, privacy, and delivery package have passed the applicable checks below.

After every meaningful PPT change, rebuild or save the PPTX, rerun structural checks, and render every slide again.

## 1. Content and narrative QA

- The requirement card is complete enough for the selected operating mode.
- Supplied files have explicit roles and a documented source-of-truth hierarchy.
- Every uploaded PPT/PPTX is classified as content-only unless an explicit source-template or visual-asset exception is recorded.
- Material source conflicts are resolved or disclosed; style references are not used as factual evidence.
- The approved `ppt-content-spec.md` exists, records its version and approval status, and is represented in the deck without unapproved material changes.
- The approved communication job, section outline, slide titles, on-slide content, evidence status, and suggested speaker notes are represented.
- Every slide has one narrative job and one primary claim.
- Titles state a useful takeaway and do not read like production notes.
- The opening establishes the purpose or question; the close resolves it with an action, synthesis, decision, or application.
- Repetition, filler, unsupported claims, and out-of-scope material have been removed.
- Formulaic AI phrasing, vague attribution, exaggerated significance, promotional filler, meta-chat, forced contrasts, and generic positive conclusions have been removed or intentionally retained with a reason.
- Slide titles state the actual finding, decision, tension, or audience takeaway instead of manufacturing a slogan.
- On-canvas copy uses concrete subjects and actions; speaker notes sound natural when read aloud without becoming casual, invented, or overexplained.
- Sentence and slide rhythm varies where useful, but content is not forced into threes, false ranges, or ornamental parallelism.
- The language pass has not altered facts, figures, evidence status, uncertainty, source attribution, medical boundaries, product status, or approved wording.
- `scripts/audit-language.mjs` findings have been reviewed as editorial warnings rather than accepted as automatic rewrite instructions.
- Material changes after content approval are listed for the user.
- Timing and slide count fit the delivery setting.

## 2. Evidence and compliance QA

- Medical, regulatory, policy, and external market claims meet `content-policy.md`.
- Evidence status is not overstated.
- Short source labels and full references are consistent.
- Company-internal figures preserve period, units, denominator, and user-provided status.
- Product concepts and planned capabilities are not presented as released facts.
- Confidential, patient, and personal data have been reviewed before external processing or delivery.
- Images, logos, fonts, and other third-party assets have a recorded usage status.
- Every searched image resolves to its source page, uses the original/full-resolution file rather than a search thumbnail, and has recorded ownership and usage-rights status.

## 3. Template and brand QA

- The selected template identifier resolves to a verified whole template in the HiPPT managed asset pack, or an explicit user-approved exception is documented.
- Uploaded content decks were excluded from the template candidate set.
- No master, layout, theme, palette, font choice, background, decorative geometry, transition, or embedded media was inherited from a content-only source deck.
- Any reused source-deck image, screenshot, logo, chart, or brand element has a specific user-approved reclassification and has passed evidence, privacy, licensing, and quality checks.
- The selected whole template remains recognizable.
- Required company or customer brand rules have been applied.
- Palette, grid, hierarchy, spacing, geometry, and recurring slide chrome are coherent.
- No slide silently falls back to an unrelated generic layout.
- Icon style, chart style, image treatment, and decorative elements are consistent.
- A one-line visual read and the three deck-specific design dials are recorded and match the audience, setting, trust level, brand, and selected template.
- Palette, accent, shape, typography, icon or diagram, and image-treatment locks are consistent; any deliberate exception has a communicative reason.
- The deck does not rely on generic AI-design defaults such as repeated equal-card rows, random gradients, decorative pills or dots, ornamental section numbers, fake interface chrome, or invented precision.
- Equal columns, cards, steps, labels, and status markers represent real semantic equivalence or state rather than filling template placeholders.
- Slide silhouettes vary with content job without losing the selected template's recognizable visual system.
- Consecutive slides do not repeat an identical body composition more than twice unless they form an intentional series or comparison.
- Every major visual move supports hierarchy, explanation, evidence, navigation, or emphasis; decorative complexity with no communication job has been removed.
- Essential information remains understandable without color alone, and foreground contrast remains suitable for the delivery setting.
- Source templates and original user files remain unchanged.

## 4. Typography QA

- The delivery setting has an explicit typography profile: projection, meeting, or compact.
- Cover title, slide title, key message, body, labels, and sources follow a documented family-and-weight role map.
- All required families and weights are installed or intentionally substituted.
- Theme, master, layouts, slide content, charts, and notes do not contain unexpected font families.
- No designed one-line title or banner wraps unexpectedly.
- No text is clipped, hidden, compressed, or reduced below the approved floor.
- Chinese, Latin, numerals, punctuation, and symbols render correctly.
- Line spacing, paragraph spacing, indentation, and bullet levels are consistent.
- A substitution comparison has been reviewed when font replacement materially changed the template.
- Final layout JSON has passed `scripts/audit-typography.mjs` for the selected profile.
- Any text below the profile floor is limited to sources, footnotes, page markers, or an explicitly logged exception. Template-original small type is not an exception.

## 5. Layout and visual QA

- Run automated overflow and out-of-bounds checks where available.
- Render every slide, not only representative pages.
- Inspect a full-deck montage for style drift, repetition, abrupt density changes, and inconsistent margins.
- Inspect the cover, section pages, dense text pages, charts, tables, processes, screenshots, medical diagrams, and closing page at full size.
- Check alignment, cropping, aspect ratio, image resolution, contrast, and projection readability.
- Check searched assets for watermarks, accidental logos, misleading context, duplicate use, compression artifacts, and crops that change meaning.
- Verify that page numbers, titles, labels, and citations are separate editable layers rather than baked into generated imagery.
- Confirm that AI-generated imagery is clearly non-evidentiary where that distinction matters.

## 6. Technical and editability QA

- The PPTX can be reparsed or reopened without corruption when the environment permits.
- Slide count, order, dimensions, masters, layouts, notes, and media relationships are intact.
- Where technically verifiable, masters, layouts, and theme relationships originate from the selected HiPPT template rather than the content-only source deck.
- Titles, body text, page numbers, citations, and speaker notes are editable.
- Charts and diagrams remain editable when practical; rasterized exceptions are disclosed.
- No external linked asset is required unless the dependency is intentional and documented.
- Verify behavior after font installation, template import, and PDF export.
- If the runtime cannot render every slide, do not issue PASS. Request a human visual check or move the file to a runtime with rendering support, and record the missing verification explicitly.

## 7. Preview PDF QA

Generate the preview PDF only from the final checked PPTX.

- Page count and order match the PPTX.
- Fonts, transparency, gradients, images, and charts render consistently.
- No page is blank, cropped, duplicated, or missing.
- The PDF is a viewing artifact; the PPTX remains the editable source of truth.

## Default delivery package

Deliver:

```text
[deck-name]/
├── [deck-name].pptx
├── [deck-name]-preview.pdf
├── ppt-content-spec.md
└── QA-report.md
```

Add only when requested or materially useful:

- speaker script;
- standalone bibliography or source registry;
- editable chart data;
- approved external asset package;
- handoff notes for another designer or presenter.

Do not include unlicensed font files, confidential raw source material, temporary render files, or unrelated working assets in the delivery package.

## QA report

Keep the user-facing report concise and include:

- task and selected operating mode;
- input route, source-of-truth files, and material assumptions;
- selected template and brand adaptation;
- template source identifier and any source-template or embedded-asset exception;
- page count and output files;
- content and evidence status;
- font audit and substitutions;
- automated checks performed;
- selected typography profile, role map, and minimum-size audit result;
- visual review performed;
- editability exceptions;
- privacy or licensing status;
- unresolved risks and recommended next action.

Retain detailed render outputs, test logs, and montage images as working evidence even when they are not part of the user-facing package.

## Release decision

Use one of these statuses:

- PASS: required checks passed and no unresolved issue blocks delivery.
- PASS WITH DISCLOSURE: usable delivery with clearly disclosed, non-blocking limitations.
- BLOCKED: missing source, licensing, privacy, corruption, font, evidence, or rendering issue prevents responsible delivery.

Never convert a BLOCKED deck to PASS merely because the deadline is near.

Treat unavailable PPTX rendering or inability to reopen the final file as BLOCKED until an authorized human or another capable runtime completes those checks.

Treat an unapproved below-floor body size, missing title/body hierarchy, or unresolved font substitution as BLOCKED.

Treat any language edit that changes a material claim, evidence status, medical boundary, product status, or user-approved conclusion without approval as BLOCKED.

Treat reuse of an uploaded content deck's template, visual system, or embedded media without an explicit recorded exception as BLOCKED.
