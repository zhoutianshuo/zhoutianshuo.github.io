# Blog post design

The typography of **blog posts only**. Other pages keep the theme's Roboto and purple/cyan accent.

## Spec

| Element             | Setting                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Body text           | Inter Light (300), 1.1rem = 17.6px, line height 1.45 = 25.5px; text optical size (optical sizing off)        |
| Bold (`strong`/`b`) | Inter 400                                                                                                    |
| Italic              | Inter Light Italic (300)                                                                                     |
| Post title          | Inter 550, 40px (theme size); Display optical size, no extra letter spacing                                  |
| Section titles (h2) | Inter 550, 1.5rem = 24px, automatic optical size; 3rem above, 1.25rem below                                  |
| Subsections (h3/h4) | Inter 490, automatic optical size; h3 1.2rem = 19.2px; 2.25rem / 1rem around h3, 1.75rem / 0.75rem around h4 |
| Tables              | cells and headers 0.85em = 15px, tabular numbers; headers 550                                                |
| Math                | MathJax 3 (CHTML, Computer Modern), capped at 110% of the text = 19.4px                                      |
| Inline code         | system monospace (ui-monospace / Menlo), 0.8em, gray chip, normal text color                                 |
| Code blocks         | system monospace 14px, line height 1.6; background #f6f8fa, 1px #e5e7eb border, 6px radius                   |
| Links               | #0969da (dark mode #58a6ff), underlined on hover                                                             |
| Column              | at most 720px (about 80 characters per line), left-aligned with the navbar; full width on narrower screens   |
| Dark mode           | code background #161b22, border #30363d; `-webkit-font-smoothing: antialiased`                               |
| Text color          | theme default (#000 on white)                                                                                |

## Why

- **Inter at 17.6px.** This is the body text size of [bishopbook.com](https://www.bishopbook.com/), measured in Chrome.
- **Line height 1.45 and a 720px column.** These follow [Butterick's body text rules](https://practicaltypography.com/summary-of-key-rules.html): line spacing 120–145% and 45–90 characters per line. The earlier 1.47 (bishopbook.com's) was just over the range, and the earlier 90%-wide column (810px) set a median of 91 and up to 103 characters per line. At 720px the median is 80, with a handful of lines up to about 94.
- **Light (300) body.** Regular (400) looked heavy. ExtraLight (200) looked faint, and it made the math look bold by comparison.
- **Bold at 400.** At 700, bold looked black next to a Light body. If the body weight changes, move bold with it, about one step above the body.
- **Inter headings at 550 and 490.** Helvetica next to Inter looked almost, but not quite, the same. The usual 700 and 600 overpowered the Light body.
- **Math capped at 110%.** MathJax scales math to match the surrounding x-height. Inter's x-height is tall, so math came out at 123% and looked heavy. The cap needs `!important` because MathJax sets the scale as an inline style.
- **Display optical size for headings, text for the body.** Inter's Display design is spaced tighter and drawn finer for large sizes, so the 40px title looks polished instead of loose. With automatic optical sizing, browsers pick the design from the font size: the title gets full Display (opsz 32), h2 about halfway, and h3 mostly text. The body turns optical sizing off to stay exactly on the text design, which is the one built for reading. The headings' manual −0.02em letter spacing was removed, because on top of the Display design's own tightness it crammed the title.
- **Tables at 0.85em.** The theme sets table cells to 1rem, which is nearly body size.

## Where it lives

- **`assets/css/main.scss`**, in the "Blog posts" section at the end.
  - Rules are scoped to `article.post-content` and `.post:has(> article.post-content)`. Only blog posts render `article.post-content`.
  - The fonts are in the `$post-body`, `$post-heading` (equal to `$post-body`) and `$post-mono` variables.
- **`_config.yml`**, at `third_party_libraries.google_fonts.url.fonts`.
  - It uses Google Fonts' **css2** API, with Inter as a variable font: `family=Inter:ital,opsz,wght@0,14..32,300..700;1,14..32,300..700`.
  - The weight range is what makes in-between weights like 490 and 550 work. The older `css?family=` API serves fixed weights only, and 550 would silently snap to 600.
  - The `opsz` range (14–32) is what provides the Display design. Without it, every size uses the text design.
  - Values outside these ranges clamp to the edge.
- **The font itself.** Google Fonts serves Inter 4.001 with no stylistic sets, and split into small per-script files (about 73 KB for Latin). Its optical-size axis runs from 14 (text) to 32 (Display).

## History

- Fonts tried, in order:
  1. Roboto Light (the theme default)
  2. Source Serif 4 with JetBrains Mono
  3. Inter at 16px
  4. Times (Tinos fallback) at 20px / 1.4 with Helvetica Bold headings, matching Bishop's _Deep Learning_ PDF
  5. Inter at bishopbook.com's size (current)
- Body weight tried: 400, then 200, then 300.
- Line height 1.47 and a 90%-wide column (810px), until both were brought within Butterick's limits.
- Heading weights tried: 700/600, then 600/500, then 550 with subsections at 450, 470 and 490.
- Headings used the text design with −0.02em / −0.01em letter spacing, before the Display optical size replaced the manual tightening.

## Ideas not applied

- **Thinner strokes in light mode.** Add `-webkit-font-smoothing: antialiased` and soften the text color to #1f2328. bishopbook.com's text looks thinner for these reasons (antialiased white text on navy), not because of its weight.
- **Stylistic sets from [rsms.me](https://rsms.me/inter/).** Only rsms.me's InterVariable has them, such as cv05 (lowercase l with a tail) and ss02 (slashed zero). Google Fonts strips them. The cost is one file of about 350 KB with every script, against Google's 73 KB Latin file.
- **Lighter math.** Cap it at 105%, or give it a slightly lighter color. A different MathJax font would need changes in the `al_math` gem.
- **Smaller touches.** Change the blockquote bar from the theme accent to blue or gray.
