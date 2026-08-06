# Platform compatibility

## Portability contract

The `SKILL.md`, workflow, references, asset-pack schema, and Node.js catalog scripts are platform-neutral. Host tools are not. Never assume that a runtime has Codex-specific skill names, Claude-specific commands, WorkBuddy UI features, Microsoft PowerPoint, LibreOffice, network access, or an image generator.

## Capability check

Before promising a PPTX, PDF, or HTML deliverable, identify:

1. the current host application and operating system;
2. available document and PPTX readers;
3. available PPTX editing or slide-generation tools;
4. available HTML/web build tools and dependency runtime;
5. a PPTX renderer or real browser capable of checking every page in the selected format;
6. browser automation, interaction testing, and accessibility-inspection availability for HTML;
7. web and image-search availability;
8. image-generation availability;
9. Node.js and any required presentation libraries;
10. filesystem access to the HiPPT asset pack.

Prefer capability detection over product-name branching. Product versions change, and the same product may expose different tools in desktop, CLI, enterprise, or managed environments.

## Capability mapping

| Need | Preferred route | Fallback | Release consequence if unavailable |
|---|---|---|---|
| Read PPTX | Host-native presentation or document skill | Parse OOXML with an available library | Mark unrecoverable content and notes |
| Edit PPTX | Host-native slide editor | Code-based OOXML or presentation library | Deliver only the approved `ppt-content-spec.md` if no safe editor exists |
| Render slides | Host renderer | PowerPoint, LibreOffice, or macOS Quick Look where suitable | No PASS without full-deck visual review |
| Build HTML | Host-native site/web capability | Standards-based HTML/CSS/JS project with pinned dependencies | Deliver only approved content and interaction specifications if no safe build route exists |
| Test HTML | Real browser plus automation or inspection | Authorized human browser review with disclosed gaps | No PASS without required page, interaction, console, lifecycle, and fallback checks |
| Search visuals | Host web/image search | Approved local asset library | Disclose reduced sourcing coverage |
| Generate visuals | Host image generator | Editable diagrams, icons, or licensed local assets | Do not insert placeholders that imply evidence |
| Inspect fonts | Host font tools or OS utilities | Use documented substitutions | Block if substitution breaks hierarchy or readability |

## Host notes

### Codex

- Load `presentations` when available for PPTX work.
- Use the host's web-building and real-browser inspection capabilities for HTML work; use a publishing capability only when the user authorizes deployment.
- Use the host web/image search and image-generation tools under the sourcing policy.
- Treat `@oai/artifact-tool` scripts as an optional Codex adapter, not a portable dependency.

### Claude Code

- Invoke the skill with `/hippt` or allow automatic matching.
- Use available filesystem, shell, Office, LibreOffice, or presentation-library tools.
- Do not introduce Claude-only frontmatter or dynamic command syntax into the shared core unless maintained as a separate adapter.

### WorkBuddy and CodeBuddy

- Prefer the application's SkillHub, Skill management, or import interface when available.
- Use `.codebuddy/skills/hippt/` only for products whose documentation specifies that project path.
- Do not assume every WorkBuddy edition exposes the same local directory, slash-command behavior, network tools, or PPT renderer.

### Other Agent Skills hosts

- Keep the whole skill directory together and preserve relative paths.
- Ignore `agents/openai.yaml` when the host does not support it.
- Use a local `assets/config.local.json` when the desktop host does not inherit `HIPPT_ASSET_PACK_ROOT`.

## Degraded operation

Continue with the highest-verifiable layer only:

- content-only: requirement card, source map, outline, evidence map, and `ppt-content-spec.md`;
- design-ready: format-specific template/theme recommendation, layout or interaction specification, typography profile, visual plan, and page copy;
- file draft: generated PPTX without complete rendering/reopen checks, or HTML build without complete browser/interaction checks;
- verified delivery: editable PPTX or deployable HTML plus the applicable structural, rendering, interaction, content, font, source, privacy, fallback, and delivery checks.

Label the result honestly. A file draft is not a verified delivery.
