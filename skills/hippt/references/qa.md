# Quality assurance and delivery

## Contents

1. Release rule
2. Content, evidence, visual-system, and typography QA
3. PPTX visual, technical, and preview-PDF QA
4. HTML interaction and delivery QA
5. Default delivery packages, QA report, and release decision

## Release rule

A generated file or web build is not a verified presentation merely because it exists or a build script exits successfully. Do not declare completion until the content, fonts, layout, rendering, editability or interaction, privacy, and delivery package have passed the applicable format-specific checks below.

After every meaningful PPTX change, rebuild or save the PPTX, rerun structural checks, and render every slide again. After every meaningful HTML change, rebuild the deployable output and rerun browser, interaction, content-extraction, and fallback checks.

For the per-page generative route, release requires two separately verified files: `[deck-name]-image.pptx` and `[deck-name]-editable.pptx`. Do not treat either file alone as complete delivery.

## 1. Content and narrative QA

- The requirement card is complete enough for the selected operating mode.
- Supplied files have explicit roles and a documented source-of-truth hierarchy.
- Every uploaded PPT/PPTX is classified as content-only unless an explicit source-template or visual-asset exception is recorded.
- Material source conflicts are resolved or disclosed; style references are not used as factual evidence.
- The approved `ppt-content-spec.md` exists, records its version and approval status, and is represented in the deck without unapproved material changes.
- The approved communication job, section outline, slide titles, on-slide content, evidence status, and suggested speaker notes are represented.
- For the per-page generative route, the image-based and editable PPTX files contain the same approved slide count, order, content, evidence labels, and speaker notes; any intentional difference is documented and approved.
- For HTML, visible text, tooltips, popovers, map and chart labels, controls, animation-step copy, accessibility text, and non-linear branches remain within the approved content boundary.
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
- Every accepted generated visual has a retained generation record, privacy review, usage-rights status, local path, and checksum as defined in `visual-policy.md`.

## 3. PPTX visual-system and brand QA

- The selected PPTX design execution route is recorded: managed whole template or per-page generative design.
- For the managed-template route, the selected template identifier resolves to a verified whole template in the HiPPT managed asset pack, or an explicit user-approved exception is documented.
- For the per-page generative route, `ppt-page-generation-spec.md` exists, maps every generated page to an approved content page, and records the visual system, overlay-safe zones, prohibited elements, and prompt references.
- For the per-page generative route, `ppt-element-manifest.json` exists and maps every accepted visual element to exactly one PNG with page identifier, z-order, normalized position, size, rotation, opacity, crop bounds, aspect ratio, asset reference, and checksum.
- Uploaded content decks were excluded from the template candidate set.
- No master, layout, theme, palette, font choice, background, decorative geometry, transition, or embedded media was inherited from a content-only source deck.
- Any reused source-deck image, screenshot, logo, chart, or brand element has a specific user-approved reclassification and has passed evidence, privacy, licensing, and quality checks.
- In the managed-template route, the selected whole template remains recognizable.
- In the per-page generative route, the visual system is coherent across pages without forcing identical composition or relying on generic AI-design defaults.
- Required company or customer brand rules have been applied.
- Palette, grid, hierarchy, spacing, geometry, and recurring slide chrome are coherent.
- No slide silently falls back to an unrelated generic layout.
- Icon style, chart style, image treatment, and decorative elements are consistent.
- A one-line visual read and the three deck-specific design dials are recorded and match the audience, setting, trust level, brand, and selected visual system.
- Palette, accent, shape, typography, icon or diagram, and image-treatment locks are consistent; any deliberate exception has a communicative reason.
- The deck does not rely on generic AI-design defaults such as repeated equal-card rows, random gradients, decorative pills or dots, ornamental section numbers, fake interface chrome, or invented precision.
- Equal columns, cards, steps, labels, and status markers represent real semantic equivalence or state rather than filling template placeholders.
- The layout-diversity map records each output slide's source layout, generated composition, or derived composition and explains every exact reuse.
- Slide silhouettes vary with content job without losing the selected template or generative direction's recognizable visual system.
- Every non-series body slide uses a distinct compatible source layout, generated composition, or derived composition where the selected visual system allows it.
- Adjacent non-series slides do not repeat an identical body composition. Any repeated layout forms a justified same-class series, comparison, case pattern, or data update.
- The deck does not switch among unrelated whole templates or unrelated generative visual systems page by page merely to increase apparent variety.
- Every major visual move supports hierarchy, explanation, evidence, navigation, or emphasis; decorative complexity with no communication job has been removed.
- Essential information remains understandable without color alone, and foreground contrast remains suitable for the delivery setting.
- Source templates and original user files remain unchanged.

## 4. PPTX typography QA

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

## 5. PPTX layout and visual QA

- Run automated overflow and out-of-bounds checks where available.
- Render every slide, not only representative pages.
- Inspect a full-deck montage for style drift, repetition, abrupt density changes, and inconsistent margins.
- Inspect the cover, section pages, dense text pages, charts, tables, processes, screenshots, medical diagrams, and closing page at full size.
- Check alignment, cropping, aspect ratio, image resolution, contrast, and projection readability.
- Check searched assets for watermarks, accidental logos, misleading context, duplicate use, compression artifacts, and crops that change meaning.
- Where page numbers are used, verify that they, titles, labels, and citations are separate editable layers rather than baked into generated imagery.
- For the per-page generative route, verify that every generated visual passes its `ppt-page-generation-spec.md` check; has no accidental or garbled text, numerals, pseudo-logo, watermark, QR code, fake interface, fabricated chart, unsafe identifier, or misleading evidence; and leaves approved editable overlays readable.
- For the per-page generative route, verify that no page number appears anywhere in the deck, whether as a generated pixel, a PPT text layer, a master/layout artifact, or a footer field.
- For the per-page generative route, inspect every decomposed PNG for alpha transparency, tight bounds, preserved aspect ratio and appearance, clean edges, intact shadows/effects, adequate resolution, and absence of text, neighboring elements, matte backgrounds, halos, and stray pixels.
- For the per-page generative route, verify that every independently visible or movable non-text visual element has its own PNG; no merged multi-element raster is accepted unless it is the explicitly documented complex background layer.
- For the per-page generative route, verify that every slide in `[deck-name]-image.pptx` contains exactly one edge-to-edge complete page image, with no unintended crop, stretch, extra visible object, or avoidable recompression.
- Compare each reconstructed editable page with the corresponding image-based page. Verify visual hierarchy, relative position, scale, crop, rotation, opacity, z-order, and editable-text placement; document any unavoidable non-blocking variance.
- Confirm that AI-generated imagery is clearly non-evidentiary where that distinction matters.

## 6. PPTX technical and editability QA

- The PPTX can be reparsed or reopened without corruption when the environment permits.
- Slide count, order, dimensions, masters, layouts, notes, and media relationships are intact.
- For the managed-template route, where technically verifiable, masters, layouts, and theme relationships originate from the selected HiPPT template rather than the content-only source deck.
- Titles, body text, citations, and speaker notes are editable; where page numbers are used, they are editable too.
- In `[deck-name]-image.pptx`, fixed non-editable on-slide content is intentional; the file can be reopened, each slide contains one complete page image, speaker notes remain editable when required, and no external linked image is needed.
- In `[deck-name]-editable.pptx`, titles, body text, citations, labels, data, and speaker notes are editable; page numbers are absent by design and must not be added.
- In `[deck-name]-editable.pptx`, every manifest PNG is present exactly once on the correct slide as an independently selectable image object, and its PPT position and layer order match the manifest.
- `[deck-name]-editable.pptx` contains no flattened text-free visual reference or complete page render. A simple native background fill or one explicitly documented complex background PNG is allowed.
- Charts and diagrams remain editable when practical; rasterized exceptions are disclosed.
- No external linked asset is required unless the dependency is intentional and documented.
- Verify behavior after font installation, template import, and PDF export.
- If the runtime cannot render every slide, do not issue PASS. Request a human visual check or move the file to a runtime with rendering support, and record the missing verification explicitly.

## 7. PPTX preview PDF QA

Generate the preview PDF only from the final checked PPTX.

For the per-page generative route, generate `[deck-name]-editable-preview.pdf` from the final checked editable PPTX after the image-based and editable files have passed cross-file comparison.

- Page count and order match the PPTX.
- Fonts, transparency, gradients, images, and charts render consistently.
- No page is blank, cropped, duplicated, or missing.
- The PDF is a viewing artifact; the PPTX remains the editable source of truth.

## 8. HTML interaction and delivery QA

For HTML delivery, read and apply the full verification checklist in `html-mode.md`. At minimum:

- The final extraction of all visible and hidden audience-facing strings matches the approved `ppt-content-spec.md`; any substantive addition has renewed approval.
- The approved `html-interaction-spec.md` maps every page, interaction, static fallback, runtime, source, privacy boundary, and open risk.
- The presentation uses a web-native theme and does not execute a PPTX master, fixed source-slide geometry, or page screenshot as its layout system.
- Browser console, network requests, assets, page enter/exit lifecycle, keyboard navigation, reduced motion, responsive viewports, static fallback, and print/PDF behavior have been checked.
- Comment, Edit, Draw, and live-parameter states are isolated from presentation mode and persist correctly when included.
- Dependencies are version-pinned; software licenses, content-asset rights, attribution, external services, tokens, data handling, and offline/hosted assumptions are documented.
- Heavy rendering, physics, media, maps, observers, and event listeners pause or dispose when their page is inactive.
- The delivery contains no secret or unrestricted client-side credential and no unapproved confidential or patient-identifiable external data flow.

## Default delivery package

For managed-template PPTX, deliver:

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

For per-page generative PPTX, deliver:

```text
[deck-name]/
├── [deck-name]-image.pptx
├── [deck-name]-editable.pptx
├── [deck-name]-editable-preview.pdf
├── ppt-content-spec.md
├── ppt-page-generation-spec.md
├── ppt-element-manifest.json
└── QA-report.md
```

When the host supports inline images, return all element PNGs directly in ordered batches; do not make a folder, ZIP, contact sheet, or file list the only way the user receives them. Retain the accepted text-free visual references and complete page renders as working evidence, but do not add them to the user-facing package unless requested.

For HTML, use the package defined in `html-mode.md`: deployable build, editable source and lockfile, shared content contract, HTML interaction specification, static PDF fallback, and QA report. Do not deploy or publish externally without user authorization.

## QA report

Keep the user-facing report concise and include:

- task and selected operating mode;
- selected delivery format and any explicit dual-delivery scope;
- selected PPTX design execution route and, for the per-page generative route, the generation-specification and asset-record status;
- for the per-page generative route, verification status for both `[deck-name]-image.pptx` and `[deck-name]-editable.pptx`, including cross-file slide count, order, dimensions, and rendered-page consistency;
- for the per-page generative route, decomposition completeness, manifest-to-PNG count, reconstruction fidelity, and any element-level editability exceptions;
- input route, source-of-truth files, and material assumptions;
- selected template, if applicable, and brand adaptation;
- template source identifier and any source-template or embedded-asset exception;
- layout-diversity result: unique layouts versus applicable slides, repeated layouts, and documented reuse reasons;
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

For the per-page generative route, treat any model-generated visual reference that contains baked-in text, logo, citation, data label, watermark, pseudo-interface, misleading evidence, or page number as BLOCKED until it is replaced or regenerated. Treat any page number in either final PPTX as BLOCKED. Also treat a missing image-based or editable PPTX, cross-file page mismatch, missing or incomplete element manifest, merged separable elements, opaque matte, materially altered or missing element, unverified reconstruction, non-selectable element, or flattened full-page render retained in the editable PPTX as BLOCKED.

For HTML, treat unapproved substantive interaction copy, missing browser or lifecycle verification, unsafe client-side credentials, unapproved external data flow, missing required attribution, or absent static fallback as BLOCKED.
