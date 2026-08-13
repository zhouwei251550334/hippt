# Visual sourcing and generation policy

## Contents

1. Priority order and visual plan
2. Real evidence and image search
3. AI-generated imagery and per-page generative PPTX
4. Medical and privacy safeguards
5. Charts, diagrams, icons, and asset records

## Priority order

Use visual sources in this order:

1. real product screenshots, charts, documents, photographs, and business materials supplied or approved by the user;
2. approved company asset library;
3. authoritative official product, organization, government, university, hospital, or publication assets discovered on the web;
4. clearly licensed stock, public-domain, or Creative Commons assets found through image search;
5. other legally usable image-search results with retained source and usage-rights information;
6. semantically compatible imagery already present in the selected template;
7. AI-generated imagery for bespoke concepts, scenes, metaphors, or non-evidentiary illustration when search is insufficient;
8. icons and simple editable diagrams when they explain the point more clearly than a picture.

Do not use AI generation merely to decorate every slide. Choose the visual form that best explains the slide's primary claim.

For ordinary non-confidential visuals, web search is the default when the user has not prohibited network use. Treat image generation as a fallback or deliberate art-direction choice, not the automatic first step.

## Visual plan

For each page in the approved `ppt-content-spec.md`, identify:

- the communication job of the visual;
- preferred visual type;
- required source or data;
- whether it must be real, editable, cited, de-identified, or approved;
- aspect ratio and approximate crop;
- fallback if the preferred asset cannot be obtained.

Stop gathering assets once the approved storyline has sufficient evidence and visual coverage. Avoid accumulating irrelevant image libraries.

## Real product and company evidence

- Prefer real product screenshots over invented interface mockups.
- Preserve the actual product state, labels, limitations, and visible dates unless the user approves an illustrative redesign.
- Clearly label a concept design, prototype, or planned capability; never present it as a released feature.
- Do not fabricate customer logos, testimonials, deployment counts, outcomes, certifications, or case-study evidence.
- Do not recolor or distort third-party logos without permission.

## Image search

- Use image search by default for publicly searchable, non-confidential subjects unless the user opts out of network use or external processing.
- Search for the required composition rather than only the topic: include orientation, aspect ratio, subject placement, environment, and style when useful.
- Prefer official and primary sources for real products, organizations, people, places, publications, medical teaching material, and events.
- Prefer public-domain, Creative Commons, or clearly licensed stock sources for generic scenes, objects, textures, backgrounds, and decorative patterns.
- Open the source page, verify that the image actually belongs to the stated source, and obtain the original or full-resolution file. Do not use search thumbnails, watermarked previews, or hot-linked assets.
- Check that the source resolution supports the intended crop. Prefer at least twice the pixel dimensions of the final image frame when practical; use at least 1920×1080 for a full-slide 16:9 raster visual.
- Record source URL, direct asset URL when appropriate, owner or publisher, page title, retrieval date, and known usage terms.
- Do not assume that an image appearing in search results is licensed for commercial reuse.
- If usage rights are unclear, request approval, replace it with a licensed alternative, or use it only as a non-delivered visual reference.
- Do not place confidential company names, unreleased product details, patient details, customer data, or internal project terms into a public search query. Generalize the query or use approved local assets instead.
- Normally stop after two focused query rounds once a suitable, sufficiently large, and defensibly usable asset is found. Escalate to image generation or a different visual form instead of searching indefinitely.

## AI-generated imagery

Use AI generation after the web-search route when:

- the slide needs a bespoke composition or exact subject placement that search results do not provide;
- the concept is abstract, metaphorical, futuristic, or intentionally illustrative;
- available real images have unsuitable licensing, privacy, resolution, or branding;
- a generic real photograph could misleadingly imply a specific customer, patient, product, or event;
- the user explicitly requests generated imagery.

AI imagery is suitable for:

- abstract concepts and metaphors;
- generic, non-identifiable business or teaching scenes;
- controlled backgrounds and atmospheres;
- simplified non-evidentiary illustrations;
- de-identified conceptual workflows when no real screenshot is appropriate.

AI imagery is not acceptable as evidence of:

- product capability or a released interface;
- customer deployment or customer outcome;
- clinical finding, pathology, treatment effect, or medical-device performance;
- regulatory approval, certification, publication, or official endorsement;
- real people, institutions, or events unless explicitly and truthfully labeled as illustration.

Generated full-slide visuals must not contain baked-in titles, body copy, logos, source labels, or page numbers. Add the required content later as editable PPT layers; in the per-page generative PPTX route, do not add page numbers at all.

## Per-page generative PPTX design

When the user explicitly selects the per-page generative PPTX route, an image-generation model such as Image2 may create the visual composition for each page. This is an alternative design execution route, not an exemption from the approved `ppt-content-spec.md`, evidence, privacy, licensing, accessibility, or editability requirements.

- Create and retain `ppt-page-generation-spec.md` before generation. It must map each approved page to a visual job, composition, editable-overlay safe zones, planned separable visual elements, prohibited elements, sensitive-information boundary, and prompt reference.
- Treat every model-generated full-page output as a text-free visual reference for sample approval, full-deck generation, and later decomposition. It is not itself the complete presentation page. Use a separately rendered complete page image only in the image-based PPTX; never use a flattened full-page render in the editable PPTX.
- Do not ask the model to render textual content, numbers, charts, tables, citations, logos, QR codes, UI labels, watermarks, or page numbers. For this route, do not add page numbers to the final deck either, including as editable PPT layers.
- Use the page's approved narrative and visual plan to direct the composition, but do not represent a generated scene, interface, chart, person, institution, clinical image, outcome, or event as real evidence. Replace factual or evidence-bearing elements with approved screenshots, real editable charts, verified sources, or clearly labeled illustrations.
- Generate at a full-slide 16:9 resolution suitable for the target delivery setting. Preserve uncluttered, high-contrast areas for editable PPT overlays; regenerate an image that forces unreadable copy or obscures required evidence.
- Inspect every output before use. Reject or regenerate images with accidental or garbled text, pseudo-logos, false numerical detail, fake interfaces, watermarks, visual artifacts, unsafe identifiers, clinical or anatomical errors, misleading real-world implications, or inadequate resolution.
- Preserve the accepted image file and generation record: model or service, model/version when available, date, prompt reference, controls or seed when available, output identifier, local path, checksum, privacy status, and usage-rights status.
- Do not put confidential company details, unreleased product information, patient data, customer information, or other sensitive data into prompts sent to an external generation service without explicit authorization and an appropriate privacy basis.

### Branch execution

Read and follow `generative-pptx.md` for the mandatory sample gate, dual PPTX output contract, element decomposition, manifest, editable reconstruction, direct PNG batching, cross-file comparison, and blocking conditions. This file remains authoritative for visual admissibility, evidence boundaries, privacy, source records, and generated-asset quality.

## Medical and privacy safeguards

- Treat patient information, medical images, identifiers, screenshots, and clinical records as sensitive.
- Check for names, faces, dates, hospital numbers, QR codes, barcodes, addresses, phone numbers, and other direct or indirect identifiers.
- Do not upload sensitive material to external image or generation services without explicit authorization and an appropriate privacy basis.
- Prefer user-supplied de-identified images, authoritative teaching images, or clearly labeled schematic illustrations.
- Do not use generated clinical imagery in a way that implies diagnostic accuracy or authentic patient evidence.
- Prefer health authority, university, hospital, professional-society, journal, or other authoritative teaching sources for anatomy, pathology, procedures, devices, and clinical findings, subject to their usage terms.
- Treat searched stock photography of clinicians or patients as illustrative only. Do not use it to prove a diagnosis, treatment effect, device performance, or real case outcome.

## Charts, diagrams, and icons

- Use editable charts when the underlying data and chart type support the slide claim.
- Preserve units, denominators, periods, axes, baselines, and source labels.
- Do not manipulate scale or crop to exaggerate differences.
- Prefer the managed icon library for consistent line weight and style.
- Use diagrams only when relationships or sequences are materially clearer than prose.
- Avoid decorative process arrows or card grids that do not encode real logic.

## Asset record

Record every externally sourced or generated visual with:

- asset identifier;
- slide usage;
- source type;
- source URL or generation prompt reference;
- direct asset URL when appropriate;
- creator or owner when known;
- usage-rights status;
- privacy or de-identification status;
- local asset path and checksum when retained.

If a material asset lacks a defensible source, license status, or privacy status, mark it blocked and do not include it in an externally delivered deck.
