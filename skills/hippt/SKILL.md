---
name: hippt
description: "Create, redesign, migrate, and quality-check enterprise presentations from a spoken brief, uploaded source files, or both, using a managed template and asset library across Agent Skills-compatible runtimes. Use for 售前方案、产品介绍、公司汇报、医学逻辑、讲课培训，以及现有 PPT/PPTX 的忠实内容迁移、结构优化、重新设计或模板迁移。"
---

# HiPPT

Use HiPPT to turn source material into an editable, template-based presentation while preserving factual boundaries, typography compatibility, and visual quality. Keep the core workflow portable across Codex, Claude Code, WorkBuddy/CodeBuddy, and other Agent Skills-compatible runtimes.

## Runtime capability adaptation

- Read [references/platform-compatibility.md](references/platform-compatibility.md) at the first PPT task in a runtime, when the host changes, or when an expected capability is unavailable.
- Detect the host's available PPTX reading, editing, rendering, web-search, image-generation, document-reading, and code-execution capabilities before promising a deliverable.
- Use the host's native presentation capability for every PPT/PPTX reading, creation, editing, rendering, or verification task. In Codex, load `presentations` when available; in another runtime, use its equivalent instead of treating the Codex skill name as mandatory.
- Use the host's web or image-search capability by default for generic, non-confidential visuals that can be found publicly, unless the user prohibits network use or external processing. If unavailable, use approved local assets or disclose the limitation.
- Use the host's image-generation capability only when the visual requires a bespoke composition, suitable searchable assets are unavailable or unusable, or the user explicitly requests generated imagery. Do not assume the tool is named `imagegen`.
- If the runtime cannot edit or render PPTX, continue only with the deliverables it can verify, such as the requirement card, `ppt-content-spec.md`, copy, or asset plan. Do not claim a finished or fully checked deck.
- Retain source, ownership, usage-rights, and retrieval records for every externally sourced image.

## Operating rules

1. At the beginning of a PPT task, briefly present Standard, Fast, and Faithful modes and ask the user to choose. If the request already makes the mode explicit, state the inferred mode and proceed without asking redundantly.
2. Before outlining or template selection, pass the human content-input gate: accept uploaded files, a spoken/written brief, or both; create a requirement card and source map; ask only for missing information that changes the result.
3. Before recommending or inspecting candidate templates, create a durable Markdown content specification named `ppt-content-spec.md`. Cover every proposed slide with a title, on-slide content, suggested speaker notes, and evidence/source status according to `references/content-spec.md`.
4. Require explicit user confirmation of `ppt-content-spec.md` in Standard, Fast, and Faithful modes. Do not select a template, build a sample, source design visuals, or create the PPTX before that confirmation.
5. Default to Standard mode: confirm the requirement card and source map, then prepare and confirm the full Markdown content specification.
6. Use Fast mode only when the user explicitly requests speed. Fast mode may accelerate analysis and produce the complete Markdown specification in one pass, but it never waives the content-confirmation gate.
7. Use Faithful mode when the user asks to keep source content unchanged. Faithfulness applies to content, sequence, data, and conclusions, not to the uploaded deck's visual template; represent the locked content faithfully in the Markdown specification before design.
8. Treat every uploaded PPT/PPTX as content-only input by default. Extract text, notes, table text, recoverable chart data or labels, and citations; do not reuse its master, layouts, theme, palette, fonts, backgrounds, decorative geometry, embedded media, or transitions unless the user explicitly reclassifies a specific item.
9. Select the whole design template from the verified HiPPT managed asset pack. Exclude uploaded content decks from the template candidate set unless the user explicitly requests a source-template exception.
10. Generate a three-slide sample after content approval and template selection unless the user explicitly waives the sample gate.
11. Keep titles, body copy, page numbers, charts where practical, and speaker notes editable.
12. Never invent facts, customer results, medical evidence, product screenshots, or company capabilities to fill a template.
13. Do not install fonts, download restricted assets, or change user-level system state without explicit approval.
14. Select a typography profile before slide mapping. Projection readability outranks template fidelity: never inherit a template's small type merely to preserve its original density.
15. After facts and evidence status are locked, run a context-aware language pass. Remove formulaic AI phrasing without changing meaning, certainty, attribution, approved wording, or the presenter's authentic voice.
16. Before composing slides, declare a one-line visual read and infer deck-specific layout variance, visual density, and visual energy. Use these as constraints, not as permission to override brand, evidence, accessibility, or the selected template.
17. Within the selected whole-template visual system, maximize page-to-page layout diversity. Prefer a different source slide, layout, or derived body composition for every non-series slide; reuse an exact layout only for genuinely similar content, an intentional series, a controlled comparison, or another documented communication reason.

## Workflow

Read and follow [references/workflow.md](references/workflow.md) for every task.

Before template selection or font inspection, read `assets/config.json`. Resolve the environment variable named by `asset_pack_root_env` first; if it is unset and `assets/config.local.json` exists, use its non-empty `asset_pack_root`; otherwise use the non-empty `asset_pack_root` from `assets/config.json`. Resolve relative paths against the config file directory, then verify the asset pack's `manifest.json`. If the asset pack is unavailable or fails validation, report the problem instead of silently using another template source.

Load the additional reference only when its stage is reached:

- Human content intake and requirement confirmation: `references/intake.md`
- Content and evidence rules: `references/content-policy.md`
- Mandatory Markdown page specification and approval gate: `references/content-spec.md`
- Natural Chinese, anti-formulaic editing, and scenario-specific voice: `references/content-style.md`
- Visual direction, anti-template discipline, redesign audit, and aesthetic QA: `references/design-taste.md`
- Template selection and asset-pack rules: `references/template-policy.md`
- Typography and font installation: `references/typography.md`
- Visual sourcing and image generation: `references/visual-policy.md`
- Rendering, overflow, and delivery checks: `references/qa.md`
