---
name: hippt
description: "Create, redesign, migrate, and quality-check content-reviewed PPTX or interactive HTML presentations from a spoken brief, uploaded source files, or both, across Agent Skills-compatible runtimes. Use for 售前方案、产品介绍、公司汇报、医学逻辑、讲课培训、互动数据演示、三维或地图演示，以及现有 PPT/PPTX 的忠实内容迁移、结构优化、重新设计或模板迁移。"
---

# HiPPT

Use HiPPT to turn source material into a content-reviewed PPTX or interactive HTML presentation while preserving factual boundaries, editability, accessibility, and visual quality. Treat both delivery formats as style and interaction renderings of one approved content contract. Keep the core workflow portable across Codex, Claude Code, WorkBuddy/CodeBuddy, and other Agent Skills-compatible runtimes.

## Runtime capability adaptation

- Read [references/platform-compatibility.md](references/platform-compatibility.md) at the first presentation task in a runtime, when the host changes, or when an expected capability is unavailable.
- Detect the host's available PPTX, web-building, browser-rendering, web-search, image-generation, document-reading, and code-execution capabilities before promising a deliverable.
- Use the host's native presentation capability for every PPT/PPTX reading, creation, editing, rendering, or verification task. In Codex, load `presentations` when available; in another runtime, use its equivalent instead of treating the Codex skill name as mandatory.
- Use the host's web-development and real-browser inspection capabilities for HTML presentation creation, rendering, interaction testing, accessibility checks, and verification.
- Use the host's web or image-search capability by default for generic, non-confidential visuals that can be found publicly, unless the user prohibits network use or external processing. If unavailable, use approved local assets or disclose the limitation.
- Use the host's image-generation capability only when the visual requires a bespoke composition, suitable searchable assets are unavailable or unusable, or the user explicitly requests generated imagery. Do not assume the tool is named `imagegen`.
- If the runtime cannot create or verify the selected delivery format, continue only with the deliverables it can verify, such as the requirement card, `ppt-content-spec.md`, copy, or asset plan. Do not claim a finished or fully checked presentation.
- Retain source, ownership, usage-rights, and retrieval records for every externally sourced image.

## Operating rules

1. At the beginning, explain the practical difference between PPTX and HTML delivery and ask the user to choose unless the request already makes the format explicit. Record dual delivery only when explicitly requested.
2. Then briefly present Standard, Fast, and Faithful operating modes and ask the user to choose unless the request already makes the mode explicit.
3. Before outlining, template or theme selection, or interaction design, pass the human content-input gate: accept uploaded files, a spoken/written brief, or both; create a requirement card and source map; ask only for missing information that changes the result.
4. Before recommending or inspecting any PPTX template, HTML theme, or interaction pattern, create a durable Markdown content specification named `ppt-content-spec.md`. Cover every proposed slide with a title, on-slide content, suggested speaker notes, and evidence/source status according to `references/content-spec.md`.
5. Require explicit user confirmation of `ppt-content-spec.md` in every delivery format and operating mode. Do not select a template or theme, build a sample, source design visuals, design interactions, or create PPTX/HTML output before that confirmation.
6. Default to Standard mode: confirm the requirement card and source map, then prepare and confirm the full Markdown content specification.
7. Use Fast mode only when the user explicitly requests speed. Fast mode may accelerate analysis and produce the complete Markdown specification in one pass, but it never waives the content-confirmation gate.
8. Use Faithful mode when the user asks to keep source content unchanged. Faithfulness applies to content, sequence, data, and conclusions, not to the uploaded deck's visual template; represent the locked content faithfully in the Markdown specification before design.
9. Treat every uploaded PPT/PPTX as content-only input by default. Extract text, notes, table text, recoverable chart data or labels, and citations; do not reuse its master, layouts, theme, palette, fonts, backgrounds, decorative geometry, embedded media, or transitions unless the user explicitly reclassifies a specific item.
10. After content approval, keep the existing PPTX template workflow unchanged for PPTX delivery. For HTML delivery, follow `references/html-mode.md`; do not use a PPTX master or fixed slide geometry as an executable HTML template.
11. Generate a three-page sample after content approval and format-specific design selection unless the user explicitly waives the sample gate.
12. Keep titles, body copy, page numbers, charts where practical, and speaker notes editable. In HTML, also keep audience-facing interaction copy and state parameters inspectable.
13. Never invent facts, customer results, medical evidence, product screenshots, company capabilities, tooltip claims, or interaction outcomes to fill a design.
14. Do not install fonts, download restricted assets, add paid services, expose tokens, or change user-level system state without explicit approval.
15. Select a typography profile before page mapping. Projection readability outranks template or theme fidelity.
16. After facts and evidence status are locked, run a context-aware language pass. Remove formulaic AI phrasing without changing meaning, certainty, attribution, approved wording, or the presenter's authentic voice.
17. Before composing pages, declare a one-line visual read and infer presentation-specific layout variance, visual density, and visual energy. Use these as constraints, not as permission to override brand, evidence, accessibility, or the selected visual system.
18. Within the selected PPTX template or HTML theme, maximize page-to-page layout diversity. Prefer a different source layout or derived body composition for every non-series page; reuse an exact layout only for genuinely similar content, an intentional series, a controlled comparison, or another documented communication reason.

## Workflow

Read and follow [references/workflow.md](references/workflow.md) for every task.

Before PPTX template selection or font inspection, read `assets/config.json`. Resolve the environment variable named by `asset_pack_root_env` first; if it is unset and `assets/config.local.json` exists, use its non-empty `asset_pack_root`; otherwise use the non-empty `asset_pack_root` from `assets/config.json`. Resolve relative paths against the config file directory, then verify the asset pack's `manifest.json`. If the asset pack is unavailable or fails validation, report the problem instead of silently using another template source. For HTML, use only a separately verified HTML theme/component catalog or a deck-specific web theme built after content approval.

Load the additional reference only when its stage is reached:

- Human content intake and requirement confirmation: `references/intake.md`
- Content and evidence rules: `references/content-policy.md`
- Mandatory Markdown page specification and approval gate: `references/content-spec.md`
- HTML theme, interaction, authoring-state, runtime, and delivery rules: `references/html-mode.md`
- Natural Chinese, anti-formulaic editing, and scenario-specific voice: `references/content-style.md`
- Visual direction, anti-template discipline, redesign audit, and aesthetic QA: `references/design-taste.md`
- Template selection and asset-pack rules: `references/template-policy.md`
- Typography and font installation: `references/typography.md`
- Visual sourcing and image generation: `references/visual-policy.md`
- Rendering, overflow, and delivery checks: `references/qa.md`
