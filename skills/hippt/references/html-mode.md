# HTML interactive presentation mode

## Contents

1. Activation and invariant
2. HTML interaction specification
3. Theme and asset boundary
4. Runtime and library policy
5. Presentation, review, edit, and draw states
6. Build workflow
7. Content preservation
8. Performance and accessibility
9. Privacy, security, and offline behavior
10. QA and delivery

## 1. Activation and invariant

Use this branch only after the user selects HTML delivery and explicitly approves `ppt-content-spec.md`.

Treat HTML and PPTX as two rendering formats for the same approved presentation content. Do not create a weaker HTML content-review path. Do not inspect themes, choose interaction libraries, build components, or produce a sample before content approval.

For explicit dual delivery, share one `ppt-content-spec.md`. Build PPTX and HTML independently after approval; do not require pixel-identical pages.

## 2. HTML interaction specification

After content approval, create `html-interaction-spec.md`. Treat it as a design-stage mapping, not a second content source.

For every page, record:

| Field | Requirement |
|---|---|
| Page and content source | Page number plus the corresponding `ppt-content-spec.md` page |
| Presentation job | What the web treatment helps the audience understand or do |
| Theme layout | Web-native layout or derived composition identifier |
| Interaction | None, reveal, filter, tooltip, timeline, 3D, physics, map, animation, or custom |
| Audience action | Exact click, hover, drag, scroll, key, or parameter action |
| Audience-facing copy | Exact labels, tooltips, popovers, instructions, and accessibility text mapped to approved content |
| Runtime | Native HTML/CSS/SVG/Canvas or an approved library |
| Static fallback | What appears when motion, WebGL, network, or interaction is unavailable |
| Performance lifecycle | Load, enter, pause, exit, and dispose behavior |
| Evidence and privacy | Source identifier, evidence role, data sensitivity, and external-service boundary |
| Open risks | Browser, device, licensing, performance, or content issues |

If any interaction needs a new substantive claim, number, interpretation, or commitment, update `ppt-content-spec.md` and obtain renewed approval before implementing it.

## 3. Theme and asset boundary

- Use a web-native HTML theme and component system. Do not use a PPTX master, theme, source-slide geometry, fixed text-box coordinates, or slide screenshot as the executable HTML template.
- If a PPTX template is explicitly used as a design reference, extract only approved design tokens such as palette, typography roles, spacing rhythm, logo rules, radii, line language, and signature motifs. Rebuild all layouts responsively in HTML.
- Prefer verified themes and components from a separate HTML catalog. If none exists, build a deck-specific theme after content approval rather than silently reusing the PPTX template library.
- Keep recurring navigation, title zones, brand marks, spacing, and visual locks coherent while varying non-series page layouts.
- Apply the same layout-diversity target as PPTX: use a distinct compatible layout or derived composition for every non-series page; document intentional reuse.

Recommended managed asset-pack structure:

```text
hippt-assets/
└── html/
    ├── themes/
    ├── layouts/
    ├── components/
    ├── runtimes/
    ├── editor/
    ├── fallbacks/
    └── catalogs/
        └── html-themes.json
```

Do not put large 3D models, videos, map tiles, animation source files, fonts, or generated deliverables in the public skill repository. Keep them in the managed asset pack or an approved object store with manifest, checksum, version, rights status, and usage scope.

## 4. Runtime and library policy

Use native HTML/CSS/SVG before a heavy runtime when it satisfies the communication job. Pin dependency versions in a lockfile and record both software and content-asset licenses.

| Library | Appropriate use | Boundary |
|---|---|---|
| Three.js | WebGL/WebGPU 3D models, spatial explanation, medical or product concepts | MIT runtime; model, texture, HDRI, and font assets have separate rights; provide static fallback |
| Matter.js | 2D rigid-body physics, drag, collision, gravity, or physical metaphor | MIT runtime; use only when physics explains content rather than decorating it |
| Apache ECharts | Interactive charts, timelines, linked data views, filters, and drill-down | Apache-2.0; preserve definitions, units, denominators, periods, sources, and accessible data alternatives |
| Spine | 2D skeletal animation and characters | Spine is 2D, not a 3D resource library; official runtimes and exported assets have Spine-specific license requirements |
| Rive | 2D vector animation, state machines, controls, and explainer interactions | Official runtimes are MIT; community and Marketplace files carry item-specific terms, so verify every file and attribution requirement separately |
| Mapbox | Hosted interactive maps and geospatial storytelling | Commercial service with token and usage billing; do not describe it as fully open source; verify account, pricing, attribution, and data boundaries |
| MapLibre GL JS | Open-source map rendering when compatible tile and style sources are available | BSD-style open-source runtime; tile, style, glyph, and data sources still need licensing and hosting review |
| Tweakpane | Live design or demonstration parameters | MIT runtime; keep the panel hidden in presentation mode unless live parameter control is part of the approved audience experience |

Official references:

- Three.js license: <https://threejs.org/license/>
- Matter.js: <https://github.com/liabru/matter-js>
- Apache ECharts: <https://github.com/apache/echarts>
- Spine: <https://us.esotericsoftware.com/>
- Rive runtimes: <https://rive.app/docs/runtimes/getting-started>
- Rive Marketplace: <https://rive.app/docs/community/marketplace-overview>
- Mapbox pricing: <https://docs.mapbox.com/mapbox-gl-js/guides/pricing/>
- MapLibre GL JS: <https://maplibre.org/projects/gl-js/>
- Tweakpane: <https://tweakpane.github.io/docs/>

## 5. Presentation, review, edit, and draw states

Keep these states explicit and mutually understandable:

- Presentation: show only navigation, approved audience controls, full-screen behavior, and speaker features. Hide comments, selection handles, parameter inspectors, and drawing tools.
- Review: allow precise element selection, anchored comments, and review-status tracking. Bind comments to stable page and element identifiers, not fragile screen coordinates alone.
- Edit: allow approved text, position, size, rotation, layer, theme token, chart, animation, and runtime-parameter changes. Preserve undo/redo and a restore-default action when edit mode is delivered.
- Draw: allow pen, highlighter, arrow, shape, and eraser tools. Save strokes as separate vector or structured annotation data and hide them in presentation mode unless explicitly included.

Do not treat reviewer comments, temporary drawings, or Tweakpane values as approved presentation content until the user explicitly accepts them.

## 6. Build workflow

1. Confirm `ppt-content-spec.md`.
2. Create and review `html-interaction-spec.md`.
3. Select or build a web-native theme; record design tokens and brand rules.
4. Map every page to a responsive layout and interaction, with static fallback.
5. Build a three-page sample: cover, representative content page, and the most complex interaction page.
6. Confirm theme fit, interaction usefulness, content fidelity, performance, accessibility, and fallback behavior.
7. Build the full presentation using a maintained HTML presentation shell such as Reveal.js or an equivalent host-supported framework; do not hand-roll navigation unless the brief requires capabilities the shell cannot provide.
8. Extract all audience-facing strings and compare them with the approved content contract.
9. Run browser, viewport, keyboard, reduced-motion, offline/network, and static-export QA.

Use interaction only when it improves explanation, evidence inspection, comparison, navigation, or audience control. Do not animate every page by default.

## 7. Content preservation

- Preserve page order, claims, data, evidence status, source relationships, uncertainty, and speaker-note meaning from `ppt-content-spec.md`.
- Include visible text, hidden text, tooltips, popovers, map labels, chart labels, legends, control labels, animation-step text, modal copy, accessibility labels, and non-linear branches in the final content extraction.
- Do not imply causality, magnitude, certainty, clinical validity, or product capability through motion or interaction when the approved evidence does not support it.
- Preserve source labels next to material claims where needed; keep full references available in notes, a reference panel, or an appendix.
- When a user interaction filters data, keep the active definition, denominator, period, unit, and filter state visible.

## 8. Performance and accessibility

- Initialize heavy runtimes only when their page becomes active. Pause or dispose animation loops, physics engines, media, observers, and event listeners when leaving the page.
- Use one primary heavy runtime per page by default. Add more only after measured testing shows the combination remains stable.
- Lazy-load large models, textures, maps, videos, and animation files. Provide loading, timeout, error, and static-fallback states.
- Support keyboard navigation, visible focus, logical reading order, sufficient contrast, and understandable controls without color alone.
- Honor `prefers-reduced-motion`; provide a motion-reduced or static path without losing essential meaning.
- Avoid autoplay audio. Caption meaningful audio/video and expose transcript or equivalent text when required.
- Keep essential content usable at common presentation viewports and browser zoom; prevent controls from covering slide content.

## 9. Privacy, security, and offline behavior

- Do not send patient-identifiable, confidential hospital, customer, internal product, or precise sensitive-location data to external map, analytics, search, animation, or generation services without explicit approval and an approved processing route.
- Never place secrets, private API keys, service credentials, or unrestricted tokens in client-side HTML. Scope and restrict any public browser token.
- Disclose network dependencies, external domains, analytics, cookies, map billing, and account requirements before delivery.
- When offline delivery is required, bundle permitted dependencies and assets locally, remove avoidable external calls, and provide a tested launch method. Do not assume `file://` supports module loading, model fetches, maps, or all browser security behaviors.
- Sanitize user-provided HTML, Markdown, comments, and external data before rendering. Do not allow unsafe script injection through edit or review modes.

## 10. QA and delivery

Verify at minimum:

- the approved content contract and all audience-facing strings;
- browser console, failed network requests, broken assets, and unhandled states;
- current stable Chrome, Edge, and Safari where available, or disclose missing coverage;
- 1920×1080, 1366×768, and 1280×720 presentation viewports plus browser zoom where relevant;
- keyboard navigation, focus order, reduced motion, contrast, and static fallback;
- page enter/exit lifecycle and absence of background animation or physics leaks;
- offline behavior or hosted deployment behavior according to the brief;
- print/PDF or screenshot fallback, with clear disclosure that interaction is staticized;
- Comment/Edit/Draw persistence, permissions, undo/redo, and mode separation when those states are included;
- license, attribution, token, privacy, and third-party-service records.

Default HTML delivery package:

```text
[presentation-name]/
├── dist/                     # deployable HTML build
├── source/                   # editable source and lockfile
├── ppt-content-spec.md       # approved shared content contract
├── html-interaction-spec.md  # format-specific design mapping
├── [presentation-name]-static.pdf
└── QA-report.md
```

Provide a hosted link only when the user requests or authorizes deployment. Do not claim PASS when required browsers, interactions, content parity, network/offline behavior, privacy, licensing, or static fallback remain unverified.
