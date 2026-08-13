# Template and asset-pack policy

Apply this file to the PPTX branch only. For HTML delivery, follow `html-mode.md` and use a separate web-native theme/component catalog. Do not mix PPTX masters or fixed source-slide geometry into HTML production.

## Contents

1. Architecture and template-source boundary
2. Whole-template selection and recommendation procedure
3. Template cards, brand priority, and internal slide mapping
4. Asset-pack boundaries and failure behavior

## Architecture

HiPPT uses two separately maintained components:

- Core skill: workflow, policies, catalogs, scripts, and QA logic.
- Managed asset pack: template PPTX files, previews, icons, approved brand assets, approved fonts, licenses, and manifests.

Do not hard-code a user-specific path as a production dependency. Prefer the `HIPPT_ASSET_PACK_ROOT` environment variable declared through `assets/config.json`. A development catalog may point to a temporary source directory, but the production asset pack must have a stable location and a versioned manifest.

## Template source boundary

- Build the default candidate set only from verified whole templates in the HiPPT managed asset pack.
- Treat an uploaded PPT/PPTX as a content-only source. Never add it to the template catalog or reuse its master, theme, layouts, palette, fonts, backgrounds, decorative geometry, embedded media, or transitions.
- Map separately supplied, approved company or customer brand rules onto a selected HiPPT template; do not infer brand rules from the content deck's appearance.
- Allow a non-HiPPT brand template or the uploaded deck's original template only when the user explicitly requests it. Record the override, rationale, scope, and compatibility risks, and show a sample before full production.
- If no HiPPT template is suitable, stop and report the gap. Do not silently fall back to the uploaded content deck.

## Whole-template selection

- Treat each template PPTX or explicitly grouped template set as one candidate.
- Exclude uploaded content decks from the candidate set even when they contain usable-looking masters or layouts.
- Do not ask the user to select individual source slide numbers.
- Treat large logic-diagram or component decks as reusable layout libraries when they do not provide a coherent end-to-end narrative template.
- Treat icon decks as asset libraries, not template candidates.

## Recommendation procedure

Rank candidates using:

- audience and presentation job;
- scenario: presales, product, report, lecture, medical reasoning, or deck transformation;
- tone and trust requirements;
- brand compatibility;
- content density and target length;
- data, chart, process, comparison, screenshot, and image needs;
- language, typography, and aspect-ratio compatibility;
- availability of suitable cover, section, content, complex, and closing layouts.

Return three strong recommendations by default. Expand to at most six when the library contains materially different viable directions or the user requests more choices.

## Template card

Each user-selectable template card should contain:

- template name;
- cover preview;
- two to four representative page previews;
- color and style tags;
- suitable scenarios;
- density and chart capability;
- known font or compatibility risks;
- one concise reason for recommendation.

When the interface supports clickable choices, use them. Otherwise present the same candidates compactly and ask for one selection.

## Brand priority

Apply this order:

1. explicit company or customer brand requirements;
2. explicit user direction for the current deck;
3. selected template's established visual system;
4. HiPPT defaults.

When a brand pack is supplied:

- use approved logo files and safe-area rules;
- map brand colors to the template palette;
- map approved brand fonts through the typography policy;
- retain the template's grid, hierarchy, spacing, geometry, and signature composition where possible;
- show a sample when brand adaptation materially changes the selected HiPPT template.

Do not infer permission to recolor a customer logo, create an unofficial logo variant, or use an unapproved brand asset.

## Internal slide mapping

After the user selects a whole template, HiPPT selects source slides or layouts automatically according to the approved `ppt-content-spec.md`.

Before building, create an internal layout-diversity map with: output slide number, content job, selected source slide or layout identifier, body silhouette, and any reuse reason.

- Match content job before visual similarity.
- Prefer layouts that fit without shrinking type below the selected typography profile.
- Treat a template's original small text as a layout defect to correct, not a style token to preserve. Shorten, split, or remap the slide before reducing type.
- Preserve the template's palette, geometry, and visual rhythm while allowing font family, weight, line spacing, and text-box density to change for readability.
- Reuse the selected HiPPT template slide's composition rather than rebuilding a generic approximation. Here, `source slide` means a slide from the selected managed template, never a slide from the uploaded content deck.
- Do not force content into every placeholder.
- Treat one unique source layout per non-series body slide as the default target when compatible layouts are available.
- Reuse an exact source layout only for genuinely similar content, an intentional series, step-through, controlled comparison, recurring case pattern, or data update; record the reason in the layout-diversity map.
- When the selected template lacks enough suitable unique layouts, derive a new body variant from its grid, geometry, components, and signature elements instead of switching to an unrelated whole template.
- Prioritize content fit, evidence clarity, projection readability, and accessibility over novelty. Record why a repeated layout was safer than a forced variation.
- Vary slide silhouettes while preserving a coherent whole-template system.
- Use the visual read and deck-specific dials from `design-taste.md` to control how far layouts may depart from the template baseline.
- Use equal cards or columns only for genuinely equivalent items. Do not convert every list, process, comparison, or claim into the same three-card composition.
- Use containers only when they encode grouping, comparison, state, or hierarchy; prefer spacing, alignment, scale, and a restrained divider when a box adds no meaning.
- Keep managed template source files and uploaded content decks unchanged; build from imported or cloned copies of the selected HiPPT template only.

## Asset-pack boundaries

The managed asset pack should contain:

```text
hippt-assets/
├── manifest.json
├── templates/
├── components/
├── previews/
├── icons/
├── brand-packs/
├── fonts/
│   └── licenses/
└── catalogs/
    ├── templates.json
    ├── icons.json
    └── fonts.json
```

- Keep large binary assets out of the core skill and normal source-control history.
- Store logic-diagram and page-component libraries under `components/`; they may support slide mapping but must not appear as whole-template candidates.
- Record each asset's identifier, source path, version, checksum, usage scope, and licensing status in the manifest.
- Never overwrite the original user-provided template library during cataloging or production.
- Do not distribute templates, fonts, logos, or images beyond their permitted scope.

## Failure behavior

If the configured asset pack is missing, outdated, or inconsistent:

- stop before template recommendation;
- report the missing manifest or asset identifier;
- offer to configure, repair, or reinstall the asset pack;
- never silently fall back to an unrelated generic template or the uploaded content deck's original template.
