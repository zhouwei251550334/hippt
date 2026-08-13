# Per-page generative PPTX branch

## Contents

1. Activation and invariant
2. Required deliverables
3. Page-generation specification
4. Three-page sample gate
5. Full-deck generation and image-based PPTX
6. Element decomposition
7. Editable PPTX reconstruction
8. Cross-file verification
9. Delivery and blocking conditions

## 1. Activation and invariant

Enter this branch only after the user explicitly selects direct per-page image generation and confirms `ppt-content-spec.md`. Use the host's available image-generation capability, such as Image2; do not assume a fixed tool name.

Treat the image model as a visual-composition tool, not a source of facts, data, medical evidence, product capability, customer results, or approved wording. Apply `content-policy.md`, `visual-policy.md`, `typography.md`, `design-taste.md`, and `qa.md` throughout this branch.

Use this mandatory sequence:

1. define the page-generation specification;
2. generate and approve a three-page sample;
3. generate every text-free page visual;
4. produce the image-based PPTX;
5. decompose every non-text visual element into an independent PNG;
6. reconstruct the editable PPTX;
7. verify and deliver both PPTX files.

Do not skip element decomposition or editable reconstruction merely because the image-based PPTX looks complete. Do not add page numbers at any stage or in either final file.

## 2. Required deliverables

Deliver both files by default:

- `[deck-name]-image.pptx`: the fixed-layout visual-fidelity copy. Each slide contains exactly one complete full-page image. On-slide text is intentionally not editable.
- `[deck-name]-editable.pptx`: the working copy reconstructed from independent transparent PNG visual elements plus editable text, data, charts, tables, citations, logos, and speaker notes.

Both files must use the same slide size, count, order, approved content, and overall visual design. Clearly explain their different editing behavior in the handoff. Neither file may contain page numbers.

## 3. Page-generation specification

Create `ppt-page-generation-spec.md` from the approved `ppt-content-spec.md`. For every slide, record:

- narrative job and primary claim;
- visual metaphor, scene, or explanatory composition;
- focal subject, framing, lighting, perspective, palette, and texture;
- full-slide 16:9 dimensions and intended resolution;
- text-safe zones and required editable overlays;
- planned separable visual elements;
- real evidence, approved screenshots, or editable data objects that must not be generated;
- prohibited elements and privacy boundary;
- prompt reference and generation record.

Define one coherent deck-wide visual system before generating pages. Require text-free model output: no titles, body copy, numerals, charts, tables, citations, logos, QR codes, UI labels, watermarks, or page numbers.

Reject a page visual with invented evidence, fake interfaces, pseudo-logos, clinical or anatomical errors, unsafe identifiers, accidental text, poor resolution, unreadable overlay zones, or elements that cannot be separated reliably.

## 4. Three-page sample gate

Generate:

1. the cover;
2. one representative content page;
3. one complex process, data, comparison, or clinical-reasoning page.

First inspect the text-free page visuals. Then add temporary editable text and approved data overlays so the user can judge the intended complete slides. Review composition, typography, contrast, density, consistency, evidence boundaries, and element separability.

Obtain explicit approval before full-batch generation. Apply the approved direction to the remaining slides; do not silently change the visual system later.

## 5. Full-deck generation and image-based PPTX

Generate or regenerate a text-free full-page visual for every approved slide. Preserve these files as the references for element decomposition.

For each slide, add the approved text, citations, logos, data, charts, tables, and other controlled overlays. Render the complete slide at high resolution. Use these complete renders only for `[deck-name]-image.pptx`.

Create `[deck-name]-image.pptx` with exactly one complete page render placed edge to edge on each slide. Do not stretch, alter the crop, add another visible object, or recompress unnecessarily. Preserve required speaker notes as native notes. Do not add page numbers.

Never decompose the complete render containing text. Decompose the corresponding text-free page visual instead.

## 6. Element decomposition

Identify every discrete non-text visual element, including photographs, illustrations, icons, decorative shapes, lines, textures, shadows, glows, foreground objects, and other visible effects.

- Export one element per PNG; never merge independently visible or movable elements.
- Preserve the approved appearance and original aspect ratio.
- Use alpha transparency and a tight crop with no added white, colored, or opaque matte.
- Recreate simple solid or gradient backgrounds as native PPT fills. Keep a complex environmental background as one explicitly identified background PNG only when it contains no separable foreground elements.
- Prefer deterministic masking, segmentation, or extraction. Use generative repair for occluded edges only when it does not restyle, move, resize, redraw, merge, or invent content.
- Reject PNGs with clipped effects, halos, neighboring remnants, stray pixels, text, inadequate resolution, or altered proportions.

Create `ppt-element-manifest.json`. For every PNG, record at minimum:

- slide identifier and element identifier;
- source reference and asset reference;
- z-order;
- normalized x/y position and width/height;
- rotation, opacity, and crop bounds;
- original aspect ratio and checksum.

When the host supports inline image return, output every PNG directly as an image. If one response cannot hold all elements, continue in ordered batches until every slide is complete. A folder, ZIP archive, contact sheet, or file listing alone is not completion.

If exact element separation cannot be verified, regenerate the page with a more separable composition or use layer-first asset generation. Do not claim success based on approximate restyling.

## 7. Editable PPTX reconstruction

Create `[deck-name]-editable.pptx` with the approved slide size and order.

- Insert every manifest PNG as an independent image object.
- Restore its recorded position, dimensions, rotation, opacity, crop, and z-order.
- Preserve aspect ratio; do not stretch, merge, flatten, or substitute elements.
- Recreate titles, body copy, labels, citations, logos, data, charts, tables, diagrams, and other evidence-bearing content as editable native PPT objects.
- Keep speaker notes editable and consistent with `ppt-content-spec.md`.
- Do not place the text-free full-page visual or the complete image-based render behind or over the reconstructed slide.
- Do not add page numbers through the master, layouts, footer fields, text boxes, or generated pixels.

The user must be able to select, move, resize, replace, and reorder every PNG element and directly edit every text object.

## 8. Cross-file verification

Render every slide in both PPTX files and compare them page by page.

Verify:

- identical slide count, order, dimensions, and approved content;
- matching visual hierarchy, relative positions, scale, crop, rotation, opacity, and z-order;
- readable editable-text placement in the editable copy;
- exactly one edge-to-edge page image per slide in the image-based copy;
- no flattened complete page render in the editable copy;
- no page number in either file;
- no missing, duplicated, merged, or non-selectable manifest element;
- successful reopen or reparse of both files when the runtime permits.

Correct the element manifest or reconstruction instead of flattening the editable slide to conceal differences.

## 9. Delivery and blocking conditions

Deliver:

```text
[deck-name]-image.pptx
[deck-name]-editable.pptx
[deck-name]-editable-preview.pdf
ppt-content-spec.md
ppt-page-generation-spec.md
ppt-element-manifest.json
QA-report.md
```

Return the individual PNG elements inline in ordered batches when supported. Retain text-free page visuals, complete page renders, comparison renders, and test logs as working evidence rather than default user-facing files.

Mark the branch `BLOCKED` when either PPTX is missing, page correspondence fails, the editable file retains a flattened page render, any required element is merged or non-selectable, element decomposition is unverified, confidential data was processed without authorization, generated material is used as evidence, or either file contains a page number.
