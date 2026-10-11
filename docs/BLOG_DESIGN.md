# Blog post design

The typography of **blog posts only**. Other pages keep the theme's Roboto and purple/cyan accent.

## Spec

| Element             | Setting                                                                                       |
| ------------------- | --------------------------------------------------------------------------------------------- |
| Body text           | Inter Light (300), 1.1rem = 17.6px, line height 1.47 = 25.9px                                 |
| Bold (`strong`/`b`) | Inter 400                                                                                     |
| Italic              | Inter Light Italic (300)                                                                      |
| Post title          | Inter 550, letter spacing −0.02em, 40px (theme size)                                          |
| Section titles (h2) | Inter 550, −0.02em, 1.5rem = 24px; 3rem above, 1.25rem below                                  |
| Subsections (h3/h4) | Inter 490, −0.01em; h3 1.2rem = 19.2px; 2.25rem / 1rem around h3, 1.75rem / 0.75rem around h4 |
| Tables              | cells and headers 0.85em = 15px, tabular numbers; headers 550                                 |
| Math                | MathJax 3 (CHTML, Computer Modern), capped at 110% of the text = 19.4px                       |
| Inline code         | system monospace (ui-monospace / Menlo), 0.8em, gray chip, normal text color                  |
| Code blocks         | system monospace 14px, line height 1.6; background #f6f8fa, 1px #e5e7eb border, 6px radius    |
| Links               | #0969da (dark mode #58a6ff), underlined on hover                                              |
| Column              | 90% of the site width on screens ≥ 768px, left-aligned with the navbar; full width on phones  |
| Dark mode           | code background #161b22, border #30363d; `-webkit-font-smoothing: antialiased`                |
| Text color          | theme default (#000 on white)                                                                 |

## Why

- **Inter at 17.6px / 1.47.** This is the body text of [bishopbook.com](https://www.bishopbook.com/), measured in Chrome.
- **Light (300) body.** Regular (400) looked heavy. ExtraLight (200) looked faint, and it made the math look bold by comparison.
- **Bold at 400.** At 700, bold looked black next to a Light body. If the body weight changes, move bold with it, about one step above the body.
- **Inter headings at 550 and 490.** Helvetica next to Inter looked almost, but not quite, the same. The usual 700 and 600 overpowered the Light body.
- **Math capped at 110%.** MathJax scales math to match the surrounding x-height. Inter's x-height is tall, so math came out at 123% and looked heavy. The cap needs `!important` because MathJax sets the scale as an inline style.
- **Tables at 0.85em.** The theme sets table cells to 1rem, which is nearly body size.

## Where it lives

- **`assets/css/main.scss`**, in the "Blog posts" section at the end.
  - Rules are scoped to `article.post-content` and `.post:has(> article.post-content)`. Only blog posts render `article.post-content`.
  - The fonts are in the `$post-body`, `$post-heading` (equal to `$post-body`) and `$post-mono` variables.
- **`_config.yml`**, at `third_party_libraries.google_fonts.url.fonts`.
  - It uses Google Fonts' **css2** API, with Inter as a variable range: `family=Inter:ital,wght@0,300..700;1,300..700`.
  - The range is what makes in-between weights like 490 and 550 work. The older `css?family=` API serves fixed weights only, and 550 would silently snap to 600.
  - Weights outside 300–700 clamp to the edge of the range.
- **The font itself.** Google Fonts serves Inter 4.001 with the text design only: no Display optical size and no stylistic sets.

## History

- Fonts tried, in order:
  1. Roboto Light (the theme default)
  2. Source Serif 4 with JetBrains Mono
  3. Inter at 16px
  4. Times (Tinos fallback) at 20px / 1.4 with Helvetica Bold headings, matching Bishop's _Deep Learning_ PDF
  5. Inter at bishopbook.com's size (current)
- Body weight tried: 400, then 200, then 300.
- Heading weights tried: 700/600, then 600/500, then 550 with subsections at 450, 470 and 490.

## Ideas not applied

- **Thinner strokes in light mode.** Add `-webkit-font-smoothing: antialiased` and soften the text color to #1f2328. bishopbook.com's text looks thinner for these reasons (antialiased white text on navy), not because of its weight.
- **Inter from [rsms.me](https://rsms.me/inter/) instead of Google Fonts.** It's version 4.1, and InterVariable includes the Display optical size for headings. It also has stylistic sets, such as cv05 (lowercase l with a tail) and ss02 (slashed zero).
- **Lighter math.** Cap it at 105%, or give it a slightly lighter color. A different MathJax font would need changes in the `al_math` gem.
- **Smaller touches.** Change the blockquote bar from the theme accent to blue or gray. Narrow the column to bishopbook.com's 720px.
