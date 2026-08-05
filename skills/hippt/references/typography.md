# Typography and font policy

## Selection priority

Use this order:

1. mandatory company or customer brand typography;
2. a typography profile suited to the delivery setting;
3. the selected template's font system only when it passes design, weight, language, and readability checks;
4. a compatible installed family with a complete weight range;
5. an approved redistributable fallback from `hippt-assets`;
6. a system fallback only after warning the user and reviewing a rendered sample.

Do not preserve a template font merely because it is present. A template family or size that looks generic, lacks usable weights, substitutes incorrectly, or fails the selected profile must be replaced consistently.

## Typography profiles

Choose one profile before slide mapping. Values are target ranges; the lower bound is a release floor.

| Role | Projection | Meeting | Compact |
|---|---:|---:|---:|
| Cover title | 60–72 pt | 52–64 pt | 48–56 pt |
| Slide title | 38–44 pt | 34–40 pt | 32–36 pt |
| Key message or section heading | 32–40 pt | 28–34 pt | 26–30 pt |
| Card or callout heading | 24–28 pt | 22–26 pt | 20–24 pt |
| Body | 20–24 pt | 18–22 pt | 16–18 pt |
| Diagram, table, and axis label | 18–20 pt | 16–18 pt | 14–16 pt |
| Source, footnote, and page marker | 10–12 pt | 9–11 pt | 9–10 pt |

Use `projection` by default for teaching, competition, training, and medical presentations. Use `meeting` for presales, product, and internal business decks. Use `compact` only for appendices, handouts, or dense reference pages that the user has approved.

Never shrink key content below the profile floor. Shorten copy, split the slide, convert details to speaker notes, or select another layout. Sources and page markers are the only routine small-text exceptions; record any other exception with a reason.

## Design hierarchy

Create design through deliberate role contrast rather than decorative font mixing.

- Use one Chinese family with a complete weight range by default; use at most two families in one deck.
- Apply Heavy or Bold to cover titles, Bold or Semibold to slide titles, Medium to card headings and numerical emphasis, and Regular to body text.
- Do not use Light for projected body text. Do not synthesize faux bold or faux italic.
- Maintain at least one clear weight step or a 1.4× size step between adjacent hierarchy levels.
- Keep body paragraphs regular-weight and high-contrast; reserve bold for claims, labels, and short emphasis.
- Keep Chinese body tracking neutral. Use only restrained tracking on short titles; never stretch glyphs to fill a box.
- Use 0.95–1.10 line spacing for large titles and 1.20–1.40 for body text. Add paragraph spacing instead of blank lines.
- Keep titles to one or two intentional lines. Never allow a designed one-line banner to wrap unexpectedly.

For internal-use decks, when the managed Alibaba PuHuiTi family is permitted and available, use its actual weight set rather than one generic face: Heavy for cover, Bold for slide titles, Medium for headings and data, Regular for body. Treat Light as a non-projection accent only. Do not distribute the font files beyond the asset pack's documented usage scope.

## Template font audit

Before building the sample:

- inspect theme, master, layout, and slide-level font declarations;
- inspect East Asian, Latin, complex-script, and symbol fonts separately;
- identify actual families, PostScript names, weights, styles, and embedded-font records;
- detect duplicate versions and incomplete weight families;
- check installed fonts by internal font metadata, not filename alone;
- report substitution already present in the source deck;
- render representative Chinese, Latin, numerals, punctuation, and symbols;
- compare the template's resolved body sizes with the selected typography profile.

Report each family as Ready, Installable, Substitution required, or Blocked. Include the selected typography profile and the role-to-family/weight map.

## Installation and redistribution

Never install silently.

1. Show the family, weights, file source, licensing status, checksum, and installation scope.
2. Request explicit approval.
3. Prefer user-level installation on macOS; do not modify system font directories without separate authorization.
4. Stop on duplicate-version conflicts instead of overwriting.
5. Verify that the operating system recognizes the installed family and weights.
6. Ask the user to reopen PowerPoint when required.
7. Render again and inspect wrapping, overflow, hierarchy, and spacing.
8. Record the installation or substitution decision in the delivery QA summary.

A font may enter `hippt-assets/fonts/redistributable/` only when an authoritative license permits bundling. Store the complete license and record family, version, source, checksum, license identifier, and redistribution status. “Free for commercial use” alone is not redistribution evidence.

Use Source Han Sans CN / 思源黑体 as the default Simplified Chinese fallback only after acquiring it from Adobe's official distribution and retaining the SIL Open Font License 1.1 notice. Do not rename or modify files in conflict with reserved-name conditions.

## Substitution procedure

If the template font cannot be used:

1. explain the incompatibility;
2. propose the closest approved replacement by tone, width, weight range, and Chinese/Latin compatibility;
3. show cover, typical content, and dense-layout comparisons;
4. obtain approval when the change materially affects the template;
5. replace consistently across theme, master, layouts, slides, charts, and notes where practical;
6. rerun the font audit, typography audit, overflow check, and full render.
