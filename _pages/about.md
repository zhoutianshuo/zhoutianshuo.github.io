---
layout: about
title: about
permalink: /
subtitle: Machine Learning at Uber · Ph.D. in Computer Science, Oregon State University

profile:
  align: right
  image: prof_pic.jpg
  image_circular: true # crops the image to make it circular

selected_papers: false # selected papers are rendered inline below, to keep them above talks and service
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items

latest_posts:
  enabled: false
---

<!-- profile photo at 2/3 of the theme default (30% desktop, 100% mobile) -->
<style>
  .profile.float-right {
    width: 66.67%;
    float: none;
    margin: 0 auto 1rem;
  }
  @media (min-width: 576px) {
    .profile.float-right {
      width: 20%;
      float: right;
      margin: 0 0 1rem 1rem;
    }
  }
</style>

I completed my Ph.D. in Computer Science at Oregon State University in January 2026, advised by [Prof. Liang Huang](https://web.engr.oregonstate.edu/~huanlian/).
My research focused on AI for science: I developed efficient algorithms and generative models for biological sequence generation, drawing on methods from natural language processing.
Currently, I work on machine learning for marketplace forecasting at Uber.

## research interests

- AI for Science (Computational Biology)
- Natural Language Processing
- Web Search

## [selected publications]({{ '/publications/' | relative_url }})

See the [publications page]({{ '/publications/' | relative_url }}) or [Google Scholar](https://scholar.google.com/citations?user=RF1_oQoAAAAJ&hl=en) for the full list.

<div class="publications">
  {% bibliography --group_by none --query @*[selected=true]* %}
</div>

## recent talks

- _ISMB 2026_ (Proceedings Talk), July 2026
- _Eternacon 2025_ (Invited Talk), July 2025
- _RECOMB 2025_ (Proceedings Talk), April 2025
- _Eternacon 2024_ (Invited Talk), July 2024
- _RECOMB 2024_ (Proceedings Talk), May 2024
- _ISMB 2023_ (Proceedings Talk), July 2023

## academic service

- **Reviewer**: ACL 2026, _Nature Communications_ (2024), _Bioinformatics_ (2025), ACM BCB (2025, 2026), _Computational and Structural Biotechnology Journal_ (2026)
- **Co-Reviewer**: ISMB (2023, 2024, 2025), RECOMB (2026)

## tools

- [Lunar Calendar](https://web.engr.oregonstate.edu/~zhoutian/lunar-calendar/index.html) — Chinese lunar / Gregorian calendar converter
- [The Shannon Game](https://web.engr.oregonstate.edu/~zhoutian/shannon-game/index.html) — an interactive recreation of Shannon's 1951 letter-guessing experiment estimating the entropy of English
